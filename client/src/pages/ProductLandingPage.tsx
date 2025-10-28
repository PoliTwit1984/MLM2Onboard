import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { MetricsSection } from "./sections/MetricsSection";
import { QuizSection } from "./sections/QuizSection";
import { TroubleshootingHub } from "./sections/TroubleshootingHub";
import { CommunityCarousel } from "./sections/CommunityCarousel";
import { SignupFormSection } from "./sections/SignupFormSection";

export const ProductLandingPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col bg-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-genericblack h-20 flex items-center px-8">
        <a href="https://rapsodo.com/" className="block hover:opacity-80 transition-opacity" data-testid="header-logo-link">
          <img
            src="/figmaAssets/rapsodo-golf-logo-white.png"
            alt="Rapsodo Golf"
            className="h-12"
          />
        </a>
      </header>

      <main className="w-full relative flex flex-col items-center pt-20">
        <HeroSection />
        <MetricsSection />
        <QuizSection />
        <TroubleshootingHub />
        <SignupFormSection />
        <CommunityCarousel />
      </main>
    </div>
  );
};
