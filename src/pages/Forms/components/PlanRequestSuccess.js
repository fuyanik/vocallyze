import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import gV from '../../../gV';

// Shown after a plan is chosen on the pricing step. No payment is collected here,
// this simply captures the lead so the Vocallyze team can follow up by e-mail.
const PlanRequestSuccess = ({ planName, planValue }) => {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const mail = localStorage.getItem('mailAddress');

    setDoc(
      doc(db, 'VocallyzeLeads', `${mail ? mail : 'none'}`),
      {
        companyName: localStorage.getItem('companyName'),
        name: localStorage.getItem('name'),
        mail: mail,
        question: localStorage.getItem('question'),
        agentCount: localStorage.getItem('agentCount'),
        qaProcess: localStorage.getItem('qaProcess'),
        callVolume: gV.callVolume || 'none',
        chosenPlan: planName || 'none',
        chosenPlanValue: planValue ?? null,
        status: 'new',
        submittedAt: Timestamp.now().toDate(),
      },
      { merge: true },
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-5 px-8 py-12 text-center font-product'>
      <div
        className='flex h-16 w-16 items-center justify-center rounded-full'
        style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)' }}>
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='#fff' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M5 13l4.5 4.5L19 7' />
        </svg>
      </div>

      <p className='text-[26px] font-bold text-black'>Thank you!</p>

      <p className='text-[15px] text-gray-500 leading-[22px]'>
        We've received your request{planName ? ` for the ${planName} plan` : ''}. Our team will reach out to you by
        e-mail to walk you through your Vocallyze rollout and next steps.
      </p>

      <div className='flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 w-full lg:w-fit'>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='text-primary shrink-0' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <span className='text-[13px] text-primary font-semibold'>No payment is required today</span>
      </div>

      <p className='text-sm text-gray-400'>Redirecting you to the homepage in {count}s...</p>

      <button
        onClick={() => navigate('/')}
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
          boxShadow: '0 4px 14px rgba(1,103,140,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
        className='cursor-pointer text-white pl-6 pr-1.5 py-1.5 rounded-full text-sm font-bold hover:brightness-110 active:scale-[0.98] duration-300 flex items-center gap-2'>
        <span className='flex-1 text-center'>Return to homepage now</span>
        <span className='shrink-0 rounded-full bg-white/20 h-8 w-8 flex items-center justify-center' style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M3 11.5L12 4l9 7.5' />
            <path d='M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9' />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default PlanRequestSuccess;
