import React from 'react';

// Shared step header for every /form-new step — title, a small step badge,
// and a slim brand-colored progress bar instead of the old plain dashed
// underline. Also gives mobile users (who never see the right-hand
// dashboard preview) a visible sense of progress.
const StepHeader = ({ title, step, total = 4 }) => (
  <div className='flex flex-col gap-2.5 pb-3'>
    <div className='flex items-center justify-between gap-3'>
      <p className='lg:text-[30px] text-[21px] font-bold text-black leading-tight'>{title}</p>
      <span className='shrink-0 rounded-full bg-primary/10 text-primary text-[11px] font-bold px-3 py-1 whitespace-nowrap'>
        Step {step} of {total}
      </span>
    </div>

    <div className='w-full h-1.5 rounded-full bg-gray-100 overflow-hidden'>
      <div
        className='h-full rounded-full duration-500'
        style={{
          width: `${(step / total) * 100}%`,
          background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
        }}
      />
    </div>
  </div>
);

export default StepHeader;
