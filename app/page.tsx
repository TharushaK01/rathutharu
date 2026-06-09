import Link from 'next/link';
import localFont from 'next/font/local';

// 1. Configure the custom legacy Sinhala font
const ccOldPress = localFont({
  src: '../public/fonts/cc_oldpress.ttf', // Adjust path based on your folder structure
  variable: '--font-cc-oldpress',
});

export default function Home() {
  return (
    // We inject the font variable class at the root level of this page
    <div className={`${ccOldPress.variable} relative min-h-screen bg-[#F0EFE0] text-[#7A6229] overflow-hidden font-sans`}>

      {/* 2. Animated Rotating Background Stars */}
      <div className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[200vw] h-[200vh] -top-[50vw] -left-[50vw] bg-center bg-repeat opacity-40"
          style={{
            backgroundImage: `url('/bg-stars.png')`,
            // Forcing the rotation via a standard inline Webkit/CSS string
            animation: 'spin 120s linear infinite',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Hero Content Wrapper */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pb-32">

        {/* 3. Heading (Using the legacy font mapping) */}
        {/* Note: Paste the exact keyboard layout string required by your legacy font to output "රතු පාට තරු" */}
        {/* 3. Heading */}
        <h1 className="font-[family-name:var(--font-cc-oldpress)] text-6xl md:text-8xl mb-4 drop-shadow-sm select-none opacity-0 animate-fade-in-up">
          r;= mdg ;re
        </h1>

        {/* 4. Sub Heading */}
        <p
          className="font-[family-name:var(--font-cc-oldpress)] text-2xl md:text-4xl max-w-2xl leading-relaxed select-none opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }} // Delays paragraph by 300ms for a staggered look
        >
          l;djg Thd,j wdorfhka msළි.kakjd''æ
        </p>

        {/* 5. Animated Scroll Down Indicator */}
        <div className="absolute bottom-28 flex flex-col items-center gap-1 animate-bounce cursor-pointer">
          <span className="text-xs tracking-wider opacity-80 font-medium">පහලට යන්න</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </main>

      {/* 6. Sticky Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#7A6229] text-[#F0EFE0] px-8 py-3 rounded-full shadow-lg flex items-center gap-8 backdrop-blur-sm bg-opacity-95">
        <Link href="#home" className="hover:scale-110 transition-transform duration-200" aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.061l-.75-.751V19.25a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1-.75-.75V14.25H11v5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12.84l-.75.75a.75.75 0 1 1-1.06-1.06l8.69-8.69Z" />
          </svg>
        </Link>
        <Link href="#location" className="hover:scale-110 transition-transform duration-200" aria-label="Location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742c1.005-.717 2.186-1.72 3.141-2.934C18.304 16.75 20 14.167 20 11.25c0-4.453-3.513-8-8-8s-8 3.547-8 8c0 2.917 1.696 5.51 3.259 7.472 1.002 1.258 2.221 2.296 3.258 3.01a17.064 17.064 0 0 0 1.282.619ZM12 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
          </svg>
        </Link>
        <Link href="#timeline" className="hover:scale-110 transition-transform duration-200" aria-label="Timeline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
        </Link>
        <Link href="#gallery" className="hover:scale-110 transition-transform duration-200" aria-label="Gallery">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
          </svg>
        </Link>
      </nav>

    </div>
  );
}