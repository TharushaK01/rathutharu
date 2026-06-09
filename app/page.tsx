'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

// Configure the custom legacy Sinhala font
const ccOldPress = localFont({
  src: '../public/fonts/cc_oldpress.ttf',
  variable: '--font-cc-oldpress',
});

// Slides data configuration
const slidesData = [
  { img: '/slide1.png', text: 'l;djg Thd,j rka mdgka yerfokak fjkiau f,dalhla', position: 'right' },
  { img: '/slide2.png', text: 'Thdf. r;=mdg ySkhg mshdm m;=rkakg wms ksrka;rfhkau', position: 'left' },
  { img: '/slide3.png', text: 'ksYapd, jgdmsgl mqrdu wefok rE rgd ujk wmQrqu fikaifyj', position: 'right' },
  { img: '/slide4.png', text: 'fujeks wmQrqu fudfyd;la wdorh lrk Thdg uf.au l;djla', position: 'left' }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const isAnimating = useRef(false);
  const totalSteps = 1 + (slidesData.length * 2); // 1 (Hero) + 8 interactive sub-timeline steps = 9

 const handleStepAdvance = (direction: 'next' | 'prev') => {
  if (isAnimating.current) return;
  isAnimating.current = true;

  if (direction === 'next') {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // CIRCLE LOOP: Reset smoothly back to the Hero Home section when stepping past the last slide
      setCurrentStep(0);
    }
  } else if (direction === 'prev') {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      // Go back to the end of the presentation if scrolling up from the top home screen
      setCurrentStep(totalSteps - 1);
    }
  }

  setTimeout(() => {
    isAnimating.current = false;
  }, 1400);
};

  // Wheel tracking
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 15) {
        handleStepAdvance('next');
      } else if (e.deltaY < -15) {
        handleStepAdvance('prev');
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStep]);

  // Touch tracking
  const touchStart = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const difference = touchStart.current - touchEnd;
      if (difference > 40) handleStepAdvance('next');
      else if (difference < -40) handleStepAdvance('prev');
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentStep]);

  return (
    <div className={`${ccOldPress.variable} relative w-screen h-screen overflow-hidden bg-[#F0EFE0] text-[#7A6229] font-sans select-none`}>
      
      {/* 1. PERSISTENT SPINNING BACKGROUND STARS */}
      <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute w-[200vw] h-[200vh] -top-[50vw] -left-[50vw] bg-center bg-repeat opacity-40"
          style={{
            backgroundImage: `url('/bg-stars.png')`,
            animation: 'spin 120s linear infinite',
            transformOrigin: 'center center',
          }}
        />
      </div>
      {/* 3. CORE INTERACTIVE LAYER INTERFACE */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* HERO CONTENT: Displays only when step is 0 */}
        <div className={`transition-all duration-1000 transform ${currentStep === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-20 scale-95 pointer-events-none'}`}>
          <h1 className="font-[family-name:var(--font-cc-oldpress)] text-6xl md:text-8xl mb-4 drop-shadow-sm animate-fade-in-up">
            r;= mdg ;re
          </h1>
          <p className="font-[family-name:var(--font-cc-oldpress)] text-2xl md:text-4xl max-w-2xl leading-relaxed opacity-90 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            l;djg Thd,j wdorfhka msළි.kakjd''æ
          </p>
        </div>



        {/* HERO SCROLL DOWN TRIGGER */}
        {currentStep === 0 && (
          <div 
            onClick={() => handleStepAdvance('next')}
            className="absolute bottom-28 flex flex-col items-center gap-1 animate-bounce cursor-pointer active:scale-95 transition-transform"
          >
            <span className="text-xs tracking-wider opacity-80 font-medium">පහලට යන්න</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        )}
      </div>

{/* 2. ADVANCED WATERCOLOR MASK REVEAL LAYER */}
<div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center">
  {slidesData.map((slide, index) => {
    const targetImageStep = 1 + (index * 2);
    
    // UPDATED: The image is visible during its entry step AND stays visible 
    // while its matching text is being displayed on the next step.
    // It disappears the millisecond the user advances to the next image slide step!
    const isRevealed = currentStep === targetImageStep || currentStep === targetImageStep + 1;

    return (
      <div
        key={index}
        className="absolute w-[90%] md:w-[75%] h-[70%] bg-cover bg-center transition-all duration-[1400ms] ease-out"
        style={{
          backgroundImage: `url('${slide.img}')`,
          WebkitMaskImage: "url('/ink-splat-mask.png')",
          WebkitMaskSize: isRevealed ? '220% 220%' : '0% 0%',
          WebkitMaskPosition: 'center center',
          WebkitMaskRepeat: 'no-repeat',
          opacity: isRevealed ? 1 : 0,
          // Shrinks back down elegantly when exiting to match a fluid slideshow circle
          transform: isRevealed ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(2deg)',
        }}
      />
    );
  })}
</div>

      {/* 3. TEXT & UI OVERLAYS */}
{/* CORNER FLUID FLOATING TEXTS (No Box Backgrounds, Alternates Bottom Left & Right Corners) */}
<div className="absolute inset-0 pointer-events-none w-full h-full z-30"> {/* Added z-30 here */}
  {slidesData.map((slide, index) => {
    const targetTextStep = 2 + (index * 2);
    const isTextVisible = currentStep === targetTextStep; 
    
    // Build absolute layout hooks depending on data position property
    const cornerClasses = slide.position === 'right'
      ? 'bottom-24 right-6 md:right-16 text-right'
      : 'bottom-24 left-6 md:left-16 text-left';

    return (
      <p
        key={index}
        // ADDED: z-30 directly into the class list below to force it in front of the z-10 images
        className={`absolute z-30 font-[family-name:var(--font-cc-oldpress)] text-2xl md:text-4xl max-w-xl leading-relaxed drop-shadow-[0_4px_12px_rgba(240,239,224,1)] transition-all duration-700 ease-in-out select-none ${cornerClasses} ${
          isTextVisible 
            ? 'opacity-100 translate-y-0 filter blur-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 filter blur-sm pointer-events-none'
        }`}
      >
        {slide.text}
      </p>
    );
  })}
</div>
      {/* 4. FLOATING BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#7A6229] text-[#F0EFE0] px-8 py-3 rounded-full shadow-lg flex items-center gap-8 backdrop-blur-sm bg-opacity-95">
        <button onClick={() => setCurrentStep(0)} className="hover:scale-110 transition-transform duration-200" aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.061l-.75-.751V19.25a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V14.25H11v5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12.84l-.75.75a.75.75 0 1 1-1.06-1.06l8.69-8.69Z" /></svg>
        </button>
        <button onClick={() => setCurrentStep(1)} className="hover:scale-110 transition-transform duration-200" aria-label="Location"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742c1.005-.717 2.186-1.72 3.141-2.934C18.304 16.75 20 14.167 20 11.25c0-4.453-3.513-8-8-8s-8 3.547-8 8c0 2.917 1.696 5.51 3.259 7.472 1.002 1.258 2.221 2.296 3.258 3.01a17.064 17.064 0 0 0 1.282.619ZM12 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg></button>
        <button onClick={() => setCurrentStep(3)} className="hover:scale-110 transition-transform duration-200" aria-label="Timeline"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg></button>
        <button onClick={() => setCurrentStep(5)} className="hover:scale-110 transition-transform duration-200" aria-label="Gallery"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" /></svg></button>
      </nav>
    </div>
  );
}