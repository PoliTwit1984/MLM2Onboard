import React from "react";

export const ProductShowcase = (): JSX.Element => {
  return (
    <section className="w-full bg-genericblack py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] mb-4">
            MEET YOUR MLM2PRO
          </h2>
          <p className="font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)] opacity-80 max-w-3xl mx-auto">
            Dual-camera + radar launch monitor that tracks ball flight and club data, works indoors and outdoors, and unlocks simulation, combines, and training experiences.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
          <img
            src="/figmaAssets/mlm2pro-device.png"
            alt="MLM2PRO Launch Monitor on Tripod"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary600-main rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] text-genericwhite text-[length:var(--heading-28-3xl-hero-font-size)] mb-2">
              15 METRICS
            </h3>
            <p className="font-paragraph-16-base-medium text-genericwhite opacity-70">
              Track everything from ball speed to spin axis with precision radar and camera technology
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary600-main rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] text-genericwhite text-[length:var(--heading-28-3xl-hero-font-size)] mb-2">
              DUAL CAMERAS
            </h3>
            <p className="font-paragraph-16-base-medium text-genericwhite opacity-70">
              Swing and impact vision capture every moment of your shot for detailed analysis
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary600-main rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] text-genericwhite text-[length:var(--heading-28-3xl-hero-font-size)] mb-2">
              30K+ COURSES
            </h3>
            <p className="font-paragraph-16-base-medium text-genericwhite opacity-70">
              Play virtual rounds on world-renowned courses from your practice space
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
