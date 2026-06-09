'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

// Configure the custom legacy Sinhala font
const ccOldPress = localFont({
  src: '../public/fonts/cc_oldpress.ttf',
  variable: '--font-cc-oldpress',
});

// Slides data configuration (Contains only your 6 real image slides)
const slidesData = [
{ 
    img: '/slide1.png', 
    text: [
      '<ud idßhla" irula lñihla weo.;a; fmdä hd¨fjda fokafkl ',
      'mgka .;a; álla È. l;djla ',
      'r;=mdg ;re l;djla' // This is the line we will make bold!
    ], 
    position: 'right' 
  },
  { img: '/slide2.png', text: 'wmsg wms ke;=ju neß fydou hd¨fjda fj,d Ôúf;a fnod.;a; l;djla', position: 'left' },
  { img: '/slide3.png', text: 'r;a;rka mdg rcrg wyihs\n\ iS;,u iS;, inr.uq wyih\n\ wjqreÿ .dkla fydfrka wyf.k ysáh l;djla', position: 'right' },
  { img: '/slide4.png', text: 'lÿ¨ ysrlrka\n\ ySk fmdÈ neoka\n\ myq lrmq wjqreÿ .dklg miafia wms wfma fjk l;djla', position: 'left' },
  { img: '/slide5.png', text: 'le.,a, uy j,õg Th;a tkak', position: 'right' },
  { img: '/slide6.png', text: 'wdofrka u.=,a f.or tk Thd,d \n\ mq¨jkakï fï úÈhg weoka tkak', position: 'center' }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const isAnimating = useRef(false);
  
  // Total Steps Tracker: 
  // 1 (Hero) + 8 (Slides 1-4) + 2 (Date Layer) + 2 (Slide 5) + 2 (Slide 6) + 1 (Final Drive CTA Step) = 16 total steps (Indices 0 to 15)
  const totalSteps = 17;
const handleStepAdvance = (direction: 'next' | 'prev') => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    if (direction === 'next') {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setCurrentStep(0);
      }
    } else if (direction === 'prev') {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      } else {
        setCurrentStep(totalSteps - 1);
      }
    }

    // Shorter lock timing for pure text changes (Steps 14, 15, 16)
    const lockDuration = currentStep >= 13 ? 700 : 1400;

    setTimeout(() => {
      isAnimating.current = false;
    }, lockDuration);
  };

  // Wheel tracking with a strict threshold filter to prevent skipping steps
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Ignore tiny unintentional scroll nudges
      if (Math.abs(e.deltaY) < 25) return; 

      if (e.deltaY > 0) {
        handleStepAdvance('next');
      } else {
        handleStepAdvance('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStep]);

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

      {/* 2. CORE INTERACTIVE LAYER INTERFACE (HERO & TIMELINE DATE SECTION) */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* HERO CONTENT: Displays only when step is 0 */}
        <div className={`transition-all duration-1000 transform ${currentStep === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-20 scale-95 pointer-events-none'}`}>
          <h1 className="font-[family-name:var(--font-cc-oldpress)] text-6xl md:text-6xl mb-4 drop-shadow-sm animate-fade-in-up">
           r;= mdg ;rel;djlg
          </h1>
          <p className="font-[family-name:var(--font-cc-oldpress)] text-2xl md:text-4xl max-w-2xl leading-relaxed opacity-90 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Thd,j wdofrka msළිs.kakjd
          </p>
        </div>

        {/* FINAL EVENT TIMELINE DATE SECTION: Intercepts right on step 9 & 10 */}
        <div className={`absolute inset-0 z-30 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-all duration-1000 ${currentStep === 9 || currentStep === 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center gap-4 text-[#7A6229]">
            <h2 className="font-[family-name:var(--font-cc-oldpress)] text-5xl md:text-7xl drop-shadow-sm animate-fade-in-up">
              fmdfidka udfia
            </h2>
            <p className="font-[family-name:var(--font-cc-oldpress)] text-4xl md:text-6xl drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              24 fjk
            </p>
            <p className="font-[family-name:var(--font-cc-oldpress)] text-2xl md:text-4xl drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              nqood Wfoa 
            </p>
            <p className="font-[family-name:var(--font-cc-oldpress)] text-6xl md:text-8xl font-bold tracking-wide drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              10'40g
            </p>
          </div>
        </div>

        {/* HERO SCROLL DOWN TRIGGER */}
        {currentStep === 0 && (
          <div 
            onClick={() => handleStepAdvance('next')}
            className="absolute bottom-28 flex flex-col items-center gap-1 animate-bounce cursor-pointer active:scale-95 transition-transform z-40 pointer-events-auto"
          >
            <span className="text-xs tracking-wider opacity-80 font-medium">පහලට යන්න</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        )}
      </div>

      {/* 3. ADVANCED WATERCOLOR MASK REVEAL LAYER */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center">
        {slidesData.map((slide, index) => {
          let targetImageStep = 1 + (index * 2);
          
          if (index === 4) {
            targetImageStep = 11; // Slide 5 Image
          } else if (index === 5) {
            targetImageStep = 13; // Slide 6 Image
          }

          const isRevealed = currentStep === targetImageStep || currentStep === targetImageStep + 1;
          const isFinalSlides = index === 4 || index === 5;

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
                transform: isRevealed 
                  ? `scale(1) rotate(0deg) ${isFinalSlides ? 'translateY(50px)' : 'translateY(0px)'}` 
                  : 'scale(0.85) rotate(2deg)',
              }}
            />
          );
        })}
      </div>

{/* 4. TEXT CORNER OVERLAYS */}
<div className="absolute inset-0 pointer-events-none w-full h-full z-30">
  {slidesData.map((slide, index) => {
    let targetTextStep = 2 + (index * 2);
    
    if (index === 4) {
      targetTextStep = 12; // Slide 5 Text
    } else if (index === 5) {
      targetTextStep = 14; // Slide 6 Text
    }

    const isTextVisible = currentStep === targetTextStep; 
    const isCenteredSlide = index === 4 || index === 5;

    const alignmentClasses = index === 5
      ? 'top-[20%] left-1/2 -translate-x-1/2 text-center max-w-4xl w-full px-6 text-xl md:text-2xl'
      : index === 4
        ? 'top-[20%] left-1/2 -translate-x-1/2 text-center max-w-4xl w-full px-6 text-xl md:text-2xl'
        : slide.position === 'right'
          ? 'bottom-24 right-6 md:right-16 text-right max-w-xl'
          : 'bottom-24 left-6 md:left-16 text-left max-w-xl';

    return (
      <div
        key={index}
        className={`absolute z-30 font-[family-name:var(--font-cc-oldpress)] leading-relaxed drop-shadow-[0_4px_12px_rgba(240,239,224,1)] transition-all duration-700 ease-in-out select-none ${alignmentClasses} ${
          isCenteredSlide ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
        } ${
          isTextVisible 
            ? 'opacity-100 filter blur-0 pointer-events-auto translate-y-0' 
            : 'opacity-0 filter blur-sm pointer-events-none -translate-y-4'
        } whitespace-pre-line`}
      >
        {/* 🌟 NEW RENDER CHECK: Handles both array lists and standard line strings seamlessly */}
        {Array.isArray(slide.text) ? (
          slide.text.map((line, lineIndex) => (
            <span 
              key={lineIndex} 
              // If it's the 3rd line (index 2), make it bold! Otherwise keep it normal weight.
              className={`block ${lineIndex === 2 ? 'font-bold tracking-wide mt-2' : 'font-normal opacity-90'}`}
            >
              {line}
            </span>
          ))
        ) : (
          <span>{slide.text}</span>
        )}
      </div>
    );
  })}
</div>

      {/* 5. INDEPENDENT FINALE CTA SCREEN (Step 15: No background image, perfectly centered layout) */}
      <div className={`absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-all duration-1000 ease-in-out ${
        currentStep === 15 
          ? 'opacity-100 scale-100 filter blur-0 pointer-events-auto translate-y-0' 
          : 'opacity-0 scale-95 filter blur-sm pointer-events-none translate-y-4'
      }`}>
        <div className="max-w-3xl w-full flex flex-col items-center justify-center gap-8">
          {/* Main Invitation Text */}
          <p className="font-[family-name:var(--font-cc-oldpress)] text-3xl md:text-5xl leading-relaxed drop-shadow-[0_4px_12px_rgba(240,239,224,1)] text-[#7A6229] select-none">
            todg Thd,d .kak f*dfgdia úäfhdia fu;k mq¨jkakï od,d ;shkak
          </p>
          
          {/* Action Trigger Button right at the end of the text stack */}
          <Link
            href="https://drive.google.com/drive/folders/YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans px-10 py-4 bg-[#7A6229] text-[#F0EFE0] rounded-full text-base font-semibold tracking-wider shadow-md hover:bg-[#634f20] hover:scale-105 active:scale-98 transition-all duration-300 flex items-center gap-3 drop-shadow-sm group pointer-events-auto cursor-pointer"
          >
            <span>Google Drive එකට යන්න</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
             {/* 5.5 STANDALONE FINAL PARAGRAPH SCREEN (Step 16) */}
      <div 
        className={`absolute inset-0 z-40 w-full h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-in-out ${
          currentStep === 16 
            ? 'opacity-100 scale-100 filter blur-0 pointer-events-auto' 
            : 'opacity-0 scale-95 filter blur-sm pointer-events-none translate-y-4'
        }`}
      >
        <div className="max-w-3xl w-full">
          <p className="font-[family-name:var(--font-cc-oldpress)] text-xl md:text-2xl leading-relaxed drop-shadow-[0_4px_12px_rgba(240,239,224,1)] text-[#7A6229] select-none">
            Th,d yefudagu f.dvla ia;=;s <br/> fï jf.a wdrdOkdjla Thd,g;a ´ks kï ;reg l;d lrkak
          </p>
        </div>
      </div>

{/* 6. FLOATING BOTTOM NAVIGATION BAR */}
<nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#7A6229] text-[#F0EFE0] px-8 py-3 rounded-full shadow-lg flex items-center gap-8 backdrop-blur-sm bg-opacity-95">
  
  {/* 🏠 HOME BUTTON -> Jumps to Hero screen (Step 0) */}
  <button 
    onClick={() => setCurrentStep(0)} 
    className={`hover:scale-110 transition-all duration-200 ${currentStep === 0 ? 'text-[#F0EFE0] scale-110 font-bold' : 'opacity-60 hover:opacity-100'}`} 
    aria-label="Home"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.061l-.75-.751V19.25a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V14.25H11v5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12.84l-.75.75a.75.75 0 1 1-1.06-1.06l8.69-8.69Z" />
    </svg>
  </button>

{/* 📖 STORY / CLOCK BUTTON -> Now links directly to the DATE SECTION (Step 9) */}
  <button 
    onClick={() => setCurrentStep(9)} 
    className={`hover:scale-110 transition-all duration-200 ${currentStep === 9 || currentStep === 10 ? 'text-[#F0EFE0] scale-110' : 'opacity-60 hover:opacity-100'}`} 
    aria-label="Story"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
    </svg>
  </button>

{/* 📍 LOCATION BUTTON -> Now points directly to Slide 5 (Step 11) */}
  <button 
    onClick={() => setCurrentStep(11)} 
    className={`hover:scale-110 transition-all duration-200 ${currentStep === 11 || currentStep === 12 ? 'text-[#F0EFE0] scale-110' : 'opacity-60 hover:opacity-100'}`} 
    aria-label="Location"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742c1.005-.717 2.186-1.72 3.141-2.934C18.304 16.75 20 14.167 20 11.25c0-4.453-3.513-8-8-8s-8 3.547-8 8c0 2.917 1.696 5.51 3.259 7.472 1.002 1.258 2.221 2.296 3.258 3.01a17.064 17.064 0 0 0 1.282.619ZM12 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
    </svg>
  </button>

  {/* 📂 GALLERY / DRIVE CTA BUTTON -> Jumps directly to the Google Drive button page (Step 15) */}
  <button 
    onClick={() => setCurrentStep(15)} 
    className={`hover:scale-110 transition-all duration-200 ${currentStep === 15 || currentStep === 16 ? 'text-[#F0EFE0] scale-110' : 'opacity-60 hover:opacity-100'}`} 
    aria-label="Gallery"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
    </svg>
  </button>

</nav>
    </div>
  );
}