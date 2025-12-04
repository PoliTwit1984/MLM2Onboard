import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackSectionView } from "@/lib/mixpanel";

const HERO_STATS = [
  { label: "Guided Topics", value: "40+" },
  { label: "Key Setup Tips", value: "5" },
  { label: "Ball & Club Metrics Explained", value: "15" },
];

export const HeroSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Track section view
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasTrackedView.current) {
            hasTrackedView.current = true;
            trackSectionView('hero', 'Hero Section');
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-full min-h-screen bg-genericblack flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-7xl w-full z-10">
        {/* Content area */}
        <div className="flex flex-col w-full max-w-3xl items-center gap-6 sm:gap-8 relative">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-xs tracking-[0.3em] text-white/60 uppercase">
              MLM2PRO Onboarding
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-genericwhite text-center leading-tight italic font-heading-96-12xl-hero">
              Your Quest To More Golf Starts Here
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-center max-w-2xl text-white/90">
              Unlock the full potential of your MLM2PRO. Learn how to set up, practice smarter,
              and turn your swing data into real improvement with guided lessons, videos, and pro tips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-black border border-white/10 rounded-lg px-6 py-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-white mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xl">
            <Button asChild className="w-full sm:w-auto h-12 px-8 bg-primary600-main hover:bg-primary-500 text-white font-semibold text-sm uppercase tracking-wide">
              <a href="#troubleshooting">Explore Starter Guide</a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto h-12 px-8 border border-white/20 bg-white text-genericblack hover:bg-white/90 hover:text-genericblack"
            >
              <a href="#quiz">Help Us Improve Your MLM2PRO Experience</a>
            </Button>
          </div>
        </div>

        {/* Device Image - Lazy loaded with WebP optimization */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-center">
          <picture>
            <source
              srcSet="/figmaAssets/mlm2pro-device.webp"
              type="image/webp"
            />
            <img
              src="/figmaAssets/mlm2pro-device.png"
              alt="MLM2PRO Launch Monitor device"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
