import React, { useEffect } from 'react';

// Centered modal on desktop, slide-up bottom sheet on mobile — mirrors the
// waitlist modal pattern used elsewhere on the site, so this feels native
// to the rest of Vocallyze instead of the old always-bottom-sheet popup.
const ResponsivePopup = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open) return undefined;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-end lg:items-center justify-center duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
      <div
        onClick={onClose}
        className='absolute inset-0 bg-black/50 backdrop-blur-[2px]'
      />

      <div
        className={`relative w-full lg:w-[440px] lg:rounded-3xl rounded-t-3xl bg-white shadow-2xl duration-500 ease-out max-h-[92vh] overflow-y-auto ${
          open ? 'translate-y-0 lg:scale-100 lg:opacity-100' : 'translate-y-full lg:translate-y-0 lg:scale-95 lg:opacity-0'
        }`}>
        <div className='flex justify-center pt-2.5 lg:hidden'>
          <div className='h-1 w-10 rounded-full bg-gray-200' />
        </div>

        <button
          onClick={onClose}
          className='absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 duration-200'
          aria-label='Close'>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round'>
            <path d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        {/* Only mount contents while open, so effects inside (e.g. lead capture)
            always run with fresh, up-to-date props instead of stale values
            captured before the popup was ever opened. */}
        {open && children}
      </div>
    </div>
  );
};

export default ResponsivePopup;
