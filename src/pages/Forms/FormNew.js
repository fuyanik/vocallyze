import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../homeComponents/1.Navbar/navbar';
import vocallyzeLogo from '../../assets/images/logos.png';
import { setGlobalState, useGlobalState } from '../../hookState';
import Popup from '../Popup/popup';
import { Card, CardHeader, StatCard, Icon, ProgressBar } from '../../admino/panel/primitives';
import { Donut, BarChart } from '../../admino/panel/charts';
import { C } from '../../admino/panel/tokens';
import StepHeader from './components/StepHeader';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import gV from '../../gV';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Timestamp } from 'firebase/firestore';

import Insurance from './components/Insurance';
import AvailableRadiologists from './components/availableRadiologists';
import emailjs from 'emailjs-com';
import SampleReports from '../DropdownPages/SampleReports/SampleReports';
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import Login from '../Auth/login';
import { Link, Navigate } from 'react-router-dom';
import NavbarGen from '../../homeComponents/NavbarGen/NavbarGen.jsx';
import lottie from 'lottie-web';


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 12px)',
    right: 'calc(50% + 12px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#01678c',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#01678c',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 3,
  },
}));



const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#01678c',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#01678c',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


const steps = ['', '', '', '', ];



const qaProcessOptions = [
  "We don't — no formal QA yet",
  'Manual spot-checks',
  'Another QA/monitoring tool',
  'Not sure yet',
];


export default function FormNew() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Ekran boyutu değiştiğinde tetiklenecek fonksiyon
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px, mobil ve web ayırımı için örnek bir genişliktir
    };

    // Ekran boyutu değişikliklerini dinleme
    window.addEventListener('resize', handleResize);

    // Component unmount olduğunda event listener'ı temizle
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logo = useRef(null)
  const logo2 = useRef(null)
  const logo3 = useRef(null)



//lottie anims
useEffect(() => {
 
  lottie.loadAnimation({
   container: logo.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim7.json')
 })
  lottie.loadAnimation({
   container: logo2.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim9.json')
 })
  lottie.loadAnimation({
   container: logo3.current,
   renderer: 'svg',
   loop: true,
   autoplay: true,
   animationData: require('./assets/anim11.json')
 })



 return () => { lottie.destroy() }
},[])



  // Local storage'a veri eklemek için bir fonksiyon
  const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  window.scrollTo(0, 0);
  
  const auth = getAuth();
  const user = auth.currentUser;

  const [isOpenPaymentPopup, setIsOpenPaymentPopup] = useState(false);

  const [activeStep] = useGlobalState('activeStep');
   const [isDropdownSet] = useGlobalState("isDropdownSet")
   const [callVolume] = useGlobalState('callVolume');

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [agentCount, setAgentCount] = useState('');
  const [qaProcess, setQaProcess] = useState('');

  const [isCameForm, setIsCameForm] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

 

  useEffect(() => {
    
    
    setName(localStorage.getItem("name"))
    setCompanyName(localStorage.getItem("companyName"))
    setQuestion(localStorage.getItem("question"))
    setMail(localStorage.getItem("mailAddress"))
    setAgentCount(localStorage.getItem("agentCount") || '')
    setQaProcess(localStorage.getItem("qaProcess") || '')
  
  }, []);

  /*
 //Create random password
  useEffect(() => {
    //Create random password
    //...
    if (!user) {
      gV.password = Math.random().toString(36).slice(-10);
      addToLocalStorage('pass', gV.password); // Local storage'a veriyi ekler
      setIsCameForm(true);
    }
  }, []);
*/
  {
    /* Start Step Contents */
  }
  const contactInputStyle =
    'w-[96%] lg:w-[70%] h-[6vh] lg:pt-2 px-4 py-2 flex items-center justify-center border border-border rounded-2xl duration-300 outline-none  focus:border-primary focus:ring-2 focus:ring-primary/15  bg-white ';

  {
    /* Contact Detail */
  }
  const ContactDetail = (
    <section className='w-[92vw] lg:w-full  animate-fadeIn flex flex-col h-[58%] pt-0 px-2 text-pri'>
      <header className='flex flex-col gap-2'>
        <StepHeader title='Contact Details' step={activeStep + 1} />

        <p className='text-[16px] leading-[22px] mt-0  text-priTrans'>
          {' '}
          We have saved everything you shared so far, and our team will review it as soon as possible. To keep you posted and set up your rollout, we'll need your e-mail address.
        </p>
      </header>

      {/* Name */}
      <div className=' hidden flex-col gap-1 mt-2'>
        <p className='text-lg text-pri font-bold mt-4'> What is your name?</p>

        <input
          value={name || user?.displayName}
          onChange={(e) => {
            setName(e.target.value);
            addToLocalStorage('name', e.target.value); 
          }}
          type='text'
          className={contactInputStyle}
          placeholder='Type your name here.'
        />
      </div>

      {/* Mail */}
      <div className='flex flex-col gap-1'>
  <p className='text-lg text-pri font-bold mt-4'>E-Mail Address</p>
  <input
    
    value={mail || localStorage.getItem("mailAddress") }
    onChange={(e) => {
      const lowerCaseEmail = e.target.value.toLowerCase(); // Küçük harfe çevir
      setMail(lowerCaseEmail);
      gV.MailAddres = lowerCaseEmail;
      addToLocalStorage('mailAddress', lowerCaseEmail); // Local storage'a veriyi ekler
    }}
    type='email'
    className={contactInputStyle}
    placeholder='Type your email address here.'
  />
</div>

      {/* Phone */}
      <div className=' hidden flex-col gap-1  '>
        <p className='text-lg text-pri font-bold mt-4 '> Password</p>
        <input
          value={phone || user?.providerData[0].phoneNumber}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type='phone'
          className={contactInputStyle}
          placeholder='Type your phone number here.'
        />
      </div>

      <div className='flex items-center gap-3 py-3 px-4 w-full lg:w-[70%] rounded-2xl border border-primary/20 bg-primary/5 iphone7:mt-3 mt-10'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M7 11V8a5 5 0 0110 0v3M6 11h12v9H6v-9z' />
          </svg>
        </span>
        <div className='flex flex-col'>
          <p className='font-bold text-sm text-black'>Your data is encrypted and securely stored</p>
          <p className='text-xs text-priTrans'>We don't send spam or share your information with third parties.</p>
        </div>
      </div>
    </section>
  );

  {
    /* History Symptoms */
  }
  const HistorySymptoms = (
    <section className='w-[92vw] lg:w-full animate-fadeIn flex flex-col h-[58%]  pt-0 px-2 text-pri'>
      <div className='flex flex-col gap-2'>
        <StepHeader title='About Your Business' step={activeStep + 1} />

        <div className='flex lg:flex-row flex-col gap-2 lg:gap-3'>
          <div className='flex flex-col gap-1 lg:w-1/2'>
            <p className='text-lg text-black font-bold mt-1'>Full name</p>
            <input
              value={name || localStorage.getItem("name")}
              onChange={(e) => {
                setName(e.target.value);
                addToLocalStorage('name', e.target.value); 
              }}
              type='text'
              className={contactInputStyle + ' lg:!w-full'}
              placeholder='First and last'
            />
          </div>

          <div className='flex flex-col gap-1 lg:w-1/2'>
            <p className='text-lg text-black font-bold mt-1'>Company name</p>
            <input
              value={companyName || localStorage.getItem("companyName")}
              onChange={(e) => {
                setCompanyName(e.target.value);
                addToLocalStorage('companyName', e.target.value); 
              }}
              type='text'
              className={contactInputStyle + ' lg:!w-full'}
              placeholder='Your company'
            />
          </div>
        </div>
         
         <p className='text-lg text-black font-bold lg:mt-4 mt-2'> Tell us about your call center — call volume, current QA process, and what you'd like Vocallyze to help with.</p>
       

        <textarea
          value={question || localStorage.getItem("question") }
          onChange={(e) => {
            setQuestion(e.target.value);
            addToLocalStorage('question', e.target.value); 
          }}
          type='text'
          className='w-[96%] lg:w-full   bg-slate-100 mt-1 lg:h-[35vh] shadow-md iphone7:h-[30vh] h-[34vh] p-4  rounded-2xl duration-300 outline-none   focus:ring-1 focus:ring-secondTrans '
          placeholder='Every detail helps us prepare your rollout.'
        />
      </div>
    </section>
  );

  {
    /* Medical Images */
  }
  const MedicalImages = (
    <section className='w-[92vw] lg:w-full animate-fadeIn   flex flex-col h-[58%] pt-0 px-2'>
      <header className='flex flex-col gap-2'>
        <StepHeader title='Call Center Setup' step={activeStep + 1} />

        <p className='text-[16px] hidden leading-[22px] mt-2  text-priTrans'>
          {' '}
          We respect your privacy. Your contact details will not be shared with anyone.
        </p>
      </header>

      {/* Do You Have Call Recordings */}
      <div className='flex flex-col gap-5 '>

        {/* How many agents */}
        <div className='flex flex-col gap-1'>
          <p className='text-lg text-pri font-bold mt-4'>How many agents does your call center have?</p>
          <input
            value={agentCount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setAgentCount(value);
              addToLocalStorage('agentCount', value);
              gV.agentCount = value;
            }}
            type='text'
            inputMode='numeric'
            className={contactInputStyle}
            placeholder='e.g. 25'
          />
        </div>

        {/* Current QA process */}
        <div className='flex flex-col gap-2'>
          <p className='text-[17px] text-pri font-bold mt-4 lg:w-[70%] w-[96%]'>
            How do you currently review call quality?
          </p>

          <div className='flex flex-wrap gap-2'>
            {qaProcessOptions.map((option) => {
              const isSelected = qaProcess === option;
              return (
                <div
                  key={option}
                  onClick={() => {
                    setQaProcess(option);
                    addToLocalStorage('qaProcess', option);
                    gV.qaProcess = option;
                    setGlobalState('qaProcess', option);
                  }}
                  style={
                    isSelected
                      ? { background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)' }
                      : undefined
                  }
                  className={`cursor-pointer px-4 py-2 rounded-full border text-sm duration-200 ${
                    isSelected ? 'text-white border-transparent font-semibold' : 'bg-white border-border text-pri hover:border-primary/50'
                  }`}>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  //Close popup page
  //...
  function onDismiss2() {
    setIsPopupOpen2(false);
  }

  //Sing up user
  //...
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, mail, gV.password).then((userCredential) => {
        // Signed in
        console.log('SIGN UP SUCCESS');

        const user = userCredential.user;

        var templateParams = {
          user_name: name,
          user_email: mail,
          password: gV.password,
        };
        //send email

        user && emailjs.send('service_i7knjsi', 'template_oazumi8', templateParams, 'xBTh1qYqTM9n5L1_P');
      });
      updateProfile(auth.currentUser, { displayName: name });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setGlobalState('isLoginPopup', true);
        console.log('SIGN UP ERROR');
        return;
      }
      if (error.code === 'auth/invalid-email') {
        console.log('SIGN UP ERROR');
        return;
      }
    }
  
  };

  const [isLoginPopup] = useGlobalState('isLoginPopup');

  useEffect(() => {
    setGlobalState('isLoginPopup', false);
  }, []);

  useEffect(() => {
    const currentStep = user?.accessToken ? 1 : 0;
    //setGlobalState('activeStep', currentStep);
    setGlobalState('isLoginPopup', false);
  }, [user?.accessToken]);

  useEffect(() => {
   
    setDoc(
      doc(db, 'VocallyzeLeadsPartial', `${localStorage.getItem("mailAddress") ? localStorage.getItem("mailAddress") : "none"}`),
      {
        formStep: activeStep,
        createDay: new Date().getDate(),
        createMonth: new Date().getMonth(),
        createYear: new Date().getFullYear(),
        companyName: companyName,
        name: name,
        mail: mail,
        question: question,
        qaProcess: qaProcess,
        agentCount: agentCount,
        callVolume: gV.callVolume,
        createdAt: Timestamp.now().toDate(),
      },
      { merge: true },
    );
    
  }, [activeStep]);

  // Estimated monthly call volume from team size, and the capacity band
  // implied by the chosen call-volume tier — purely illustrative numbers
  // used to make the step 2/3 dashboard preview feel tied to real inputs.
  const estCalls = agentCount ? Number(agentCount) * 120 : 0;
  const volumeCapacity = {
    'Up to 1,000 calls / month': 1000,
    '1,000 - 5,000 calls / month': 5000,
    '5,000 - 20,000 calls / month': 20000,
    '20,000+ calls / month': 25000,
  }[callVolume] || Math.max(estCalls * 1.4, 1000);

  return (
    <> 
 

      {/* Sample Repors Popup */}
      <Popup
        close={true}
        open={isPopupOpen2}
        onDismiss={onDismiss2}
        contents={
         
            <SampleReports isOutside={true} isPopup={true} />
         
        }
      />

     
      <div className={`w-screen h-screen overflow-hidden   ${isDropdownSet && "lg:bg-black/20 bg-normal" } ${isPopupOpen && "lg:blur-lg blur-none"} duration-700 lg:flex lg:flex-row flex flex-col items-center  font-product `}>

      
        
        <div className='lg:w-1/2  lg:px-10   relative w-screen h-full  flex flex-col items-center lg:justify-center justify-start  '>
         
         {/* Web Logo */}
         <div className='absolute lg:flex hidden justify-between items-center w-full    top-2 pl-10 pr-2'  > 
            <Link to={"/"}>  <img className=' lg:flex hidden   w-52 top-2 left-10' src={vocallyzeLogo} alt='vocallyze logo'/> </Link> 
        
          
     
          </div>
       
       
          {/* Mobile Logo & Steooer */}
         <div className='flex lg:hidden w-full px-5 justify-between items-center  '>
           <Link to={"/"}>  <img className='  iphone7:w-32 w-40 ' src={vocallyzeLogo} alt='vocallyze logo'/> </Link> 
      
            {/*  Sample Reports */}
           <div  onClick={() => {   setIsPopupOpen2(!isPopupOpen2); }}   className='w-fit hidden  duration-500 bg-black text-white   items-center gap-5  relative border border-black px-4 py-1 rounded-full text-sm'>
          
            <p className='duration-500'>   {isPopupOpen2 ? 'Close' : 'Sample Report'}   </p>
          
            <img
              className={`h-5 ${isPopupOpen2 ? 'rotate-180' : 'rotate0'}  duration-500 `}
              width='20'
              height='5'
              src='https://img.icons8.com/ios/50/ffffff/expand-arrow--v1.png'
              alt='expand-arrow--v1'
            />
           </div>

        {/*  Stepper */}
        {true && (
          <Stack sx={gV.mq.matches ? { width: '65%' } : { width: '85%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {steps.map((label, idx) => (
                <Step key={idx}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        )}

         </div>
        
        <div className='lg:hidden flex iphone7:mt-0 mt-2'></div>
     
        {activeStep == 0 && HistorySymptoms}
        {activeStep == 1 && ContactDetail}
        {activeStep == 2 && MedicalImages}
        {activeStep == 3 && <Insurance />}
        {activeStep == 999 && <AvailableRadiologists />}
       
        
         </div>
       

       
       
        {/*  Right Second Opinion Report Area */}
        <div className='lg:flex lg:flex-col  py-16 hidden w-1/2 h-full  bg-slate-50 -z-10 '>
         
          
          <div className='flex w-[100%]  h-[94%] shadow-lg ml-16 border rounded-xl overflow-hidden'>

             <div className='w-[25%] relative h-full bg-white border-r border-border flex flex-col justify-between'> 

               <div className='flex flex-col w-full'>

                 <div className='flex items-center gap-2.5 px-4 py-4 border-b border-border'>
                   <span
                     className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg'
                     style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)' }}>
                     <Icon name='headphones' size={15} color='#fff' strokeWidth={2} />
                   </span>
                   <span className='min-w-0'>
                     <span className='block truncate text-[11px] font-bold leading-tight text-black'>{companyName || 'Your Company'}</span>
                     <span className='block text-[9px] leading-tight text-gray-400'>Vocallyze workspace</span>
                   </span>
                 </div>

                 <nav className='px-2.5 py-3'>
                   <p className='mb-1 px-2 text-[8.5px] font-bold uppercase tracking-[0.14em] text-gray-400'>Audit</p>
                   <div
                     className='mb-[2px] flex items-center gap-2 rounded-[10px] px-2 py-[6px] text-white'
                     style={{ background: 'var(--color-primary)' }}>
                     <Icon name='shield' size={13} strokeWidth={2} />
                     <span className='text-[11px] font-semibold'>Compliance</span>
                   </div>
                   <div className='mb-[2px] flex items-center gap-2 rounded-[10px] px-2 py-[6px] text-gray-400'>
                     <Icon name='phone' size={13} strokeWidth={1.6} />
                     <span className='text-[11px] font-medium'>Calls</span>
                   </div>
                   <div className='mb-[2px] flex items-center gap-2 rounded-[10px] px-2 py-[6px] text-gray-400'>
                     <Icon name='users' size={13} strokeWidth={1.6} />
                     <span className='text-[11px] font-medium'>Agents</span>
                   </div>
                   <div className='mb-[2px] flex items-center gap-2 rounded-[10px] px-2 py-[6px] text-gray-400'>
                     <Icon name='bot' size={13} strokeWidth={1.6} />
                     <span className='text-[11px] font-medium'>Voice AI</span>
                   </div>
                 </nav>

               </div>
                
               <div className='w-full border-t border-border flex items-center gap-2 px-3 py-3'>

                 <div className='w-7 h-7 shrink-0 bg-primary/10 text-primary rounded-full items-center justify-center flex text-[11px] font-bold'>
                 {name ? name.charAt(0).toUpperCase() : <Icon name='user' size={12} />} 
                </div> 

                <span className='min-w-0 flex-1'>
                  <span className='block truncate text-[9.5px] font-semibold text-black'>{name || 'Your name'}</span>
                  <span className='block truncate text-[8.5px] text-gray-400'>{companyName || 'Preparing workspace'}</span>
                </span>

                <Icon name='logOut' size={12} color='#9CA3AF' />
            
               </div>
           
             </div>


             <div className='w-[75%] h-full  flex flex-col'> 

               <div className='h-[10%] w-full border-b border-border flex items-center justify-between px-5 shrink-0'>
                 <p className='text-[12px] font-semibold text-gray-400'>Audit <span className='text-black'>/ Compliance</span></p>

                 <div className='flex gap-2'> 
                   <p className='bg-primary/10 rounded-full px-3 py-[3px] text-primary text-[11px] items-center justify-center flex font-semibold'>Call Audit</p> 
                   <p className='bg-primary/10 rounded-full px-3 py-[3px] text-primary text-[11px] items-center justify-center flex font-semibold'>{agentCount ? `${agentCount} agents` : 'Voice AI'}</p> 
                  </div> 
                
               </div>

               <div className='w-full h-full bg-white flex flex-col gap-5 p-8 overflow-y-auto'> 

                 <div className={` w-full flex gap-3 items-center   `}> 
                      
                    {/* rounded profile */}
                    <div className='flex w-10 h-10 bg-primary/10 text-primary rounded-full items-center justify-center'> 
                     <Icon name='user' size={18} />
                    </div>
                   
                   {/* name */}
                   <div className='flex flex-col items-start justify-start '>
                   { name == "" ?  <div className='h-4 w-[50%] rounded-full bg-gray-200 animate-fadeIn'> </div> :
                    <p className=' text-[20px] font-bold]'> {name}</p>
                    
                  }
                       { companyName ? <p className=' text-[12px] text-gray-500'> {companyName}</p> : null }
                       <p className=' text-[12px] text-black'> {mail}</p>
                    </div>

                 </div>

                 {/* Setup progress — always visible, fills in as the form is completed */}
                 <div className='w-full'>
                    <div className='flex items-center justify-between mb-1.5'>
                       <p className='text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-400'>Rollout setup progress</p>
                       <p className='text-[11px] font-semibold text-primary'>{Math.round(((activeStep + 1) / 4) * 100)}%</p>
                    </div>
                    <ProgressBar value={((activeStep + 1) / 4) * 100} color={C.blue} height={6} />
                 </div>

                 {/* Step 0-1 — business summary card */}
                 { activeStep < 2 && (
                   <Card className='animate-fadeIn'>
                     <CardHeader title='About your business' subtitle={question ? undefined : 'Fill in step 1 to preview'} />
                     { question ? (
                       <p className='text-[12.5px] leading-relaxed text-gray-600'>{question}</p>
                     ) : (
                       <div className='flex flex-col gap-2'>
                         <div className='h-3 w-[85%] rounded-full bg-gray-100'> </div>
                         <div className='h-3 w-[60%] rounded-full bg-gray-100'> </div>
                       </div>
                     )}
                   </Card>
                 )}

                 {/* Step 2 — call center snapshot, appears once agent count is entered */}
                 { activeStep >= 2 && (
                   <div className='grid grid-cols-2 gap-2.5 animate-fadeIn'>
                      <StatCard
                        label='Team size'
                        value={agentCount || '—'}
                        unit={agentCount ? 'agents' : undefined}
                        icon='users'
                        tone='blue'
                      />
                      <StatCard
                        label='Est. monthly calls'
                        value={agentCount ? (Number(agentCount) * 120).toLocaleString('en-US') : '—'}
                        icon='phone'
                        tone='teal'
                        hint={agentCount ? '100% audited' : undefined}
                      />
                   </div>
                 )}

                 {/* Step 3 — audit coverage donut + volume vs. capacity, once call volume is chosen */}
                 { activeStep >= 3 && callVolume && callVolume !== 'none' && (
                   <>
                     <Card className='animate-fadeIn'>
                       <CardHeader title='Coverage estimate' subtitle={callVolume} />
                       <div className='flex items-center gap-5'>
                         <Donut
                           size={96}
                           thickness={13}
                           segments={[{ label: 'Audited', value: 100, color: C.blue }]}
                           center={
                             <>
                               <p className='text-[17px] font-semibold leading-none text-black'>100%</p>
                               <span className='mt-0.5 text-[9px] text-gray-400'>audited</span>
                             </>
                           }
                         />
                         <div className='flex flex-col gap-1.5 text-[12px] text-gray-500'>
                           <p><span className='font-semibold text-black'>Every</span> recorded call reviewed</p>
                           <p>No sampling gaps, no blind spots</p>
                           <p>First report ready within days</p>
                         </div>
                       </div>
                     </Card>

                     <Card className='animate-fadeIn'>
                       <CardHeader title='Your volume vs. tier capacity' subtitle={agentCount ? `${agentCount} agents · est. ${estCalls.toLocaleString('en-US')} calls / mo` : undefined} />
                       <BarChart
                         w={280}
                         h={120}
                         bars={[
                           { label: 'Your estimate', value: estCalls, color: C.blue },
                           { label: 'Tier capacity', value: volumeCapacity, color: C.teal, opacity: 0.55 },
                         ]}
                       />
                     </Card>
                   </>
                 )}

               </div>
               

             </div>
           </div> 
           
        
           <div className={` ${activeStep == 1 ? "hidden" : "hidden"} w-[80%]`} ref={logo} > </div>
           <div className={` ${activeStep == 2 ? "hidden" : "hidden"} w-[80%]`} ref={logo2} > </div>
           <div className={` ${activeStep == 3 ? "hidden" : "hidden"} w-[70%]`} ref={logo3} > </div>
         
        
         
        
         </div>


        {/* Bottom Buttons */}
        <div
          className={`absolute ${
            isPopupOpen && 'hidden'
          } w-screen  lg:w-1/2 lg:px-10 px-0  ${isDropdownSet ? "hidden" : "flex"} lg:bottom-10 bottom-3   gap-3 lg:justify-end justify-center  items-center font-product animate-fadeIn`}>
          {/* Back Button */}
          {activeStep != 0 && (
      
        <button
              onClick={() => {
                setGlobalState('activeStep', activeStep - 1);
              }}
              className={`w-11 h-11  z-20 l  animate-leftToRight rounded-full bg-white border border-border hover:border-primary/50 duration-300 flex items-center justify-center  text-primary`}
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
              {' '}
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M15 18l-6-6 6-6' />
              </svg>
            </button>
          )}

      



          {/* Next Button */}
          <button
            onClick={() => {

              if(activeStep != 3 ) {
                  if( activeStep == 0) {
                    localStorage.getItem("name") !== null && localStorage.getItem("name") !== "" && setGlobalState('activeStep', activeStep + 1);
                  }

                  if( activeStep == 1) {
                    const email = localStorage.getItem("mailAddress");
                    const isValidEmail = email !== null && email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                    isValidEmail && setGlobalState('activeStep', activeStep + 1);
                  }

                  if( activeStep == 2) {
                    setGlobalState('activeStep', activeStep + 1);
                  }

              }

              /* Step 3 just reveals the pricing plans, no payment is collected here */
              !gV.mq.matches && activeStep == 3 && setGlobalState("isDropdownSet", true);
            }}
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
              boxShadow: '0 4px 14px rgba(1,103,140,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
            className={` ${
              activeStep == 0 ? 'lg:w-[44%] w-[90%]  ' : 'lg:w-[46%] w-[70%] '
            } 
            
            z-20 hover:brightness-110 active:scale-[0.98]  duration-300 font-bold self-end float-right flex items-center gap-2 justify-between  pl-5 pr-1.5 py-[6px] rounded-3xl text-white`}>
          
             <span className='flex-1 text-center'>
             {activeStep == 0 && 'Continue'} {activeStep == 1 && 'Continue to Call Setup '}{' '}
            {activeStep == 2 && 'Continue to Call Volume'} {activeStep == 3 && 'See My Plan'} {activeStep == 4 && ''}
             </span>

             <span
               className='shrink-0 rounded-full bg-white/20 h-9 w-9 flex items-center justify-center'
               style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)' }}>
               <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round'>
                 <path d='M9 6l6 6-6 6' />
               </svg>
             </span>
          </button>
        </div>
     
     
     
      </div>
    </>
  );
}
