import React from "react";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ImageGallerySection } from "./sections/ImageGallerySection";
import { ImageTextSection } from "./sections/ImageTextSection";
import { ReasonsSection } from "./sections/ReasonsSection";
import { SidebarSection } from "./sections/SidebarSection";
import { SignupFormSection } from "./sections/SignupFormSection";

export const ProductLandingPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col bg-white overflow-hidden">
      <header className="absolute top-8 left-8 z-50">
        <a href="https://rapsodo.com/" className="block hover:opacity-80 transition-opacity" data-testid="header-logo-link">
          <img
            src="/figmaAssets/rapsodo-golf-logo-white.png"
            alt="Rapsodo Golf"
            className="h-12"
          />
        </a>
      </header>

      <main className="w-full relative flex flex-col items-center">
        <HeroSection />
        <ImageTextSection />

        <section className="flex items-start gap-[106px] pt-0 pb-36 px-28 w-full bg-genericblack">
          <div className="relative w-full max-w-[1216px] h-[684px] bg-[#323438]">
            <div className="absolute w-full h-full top-0 left-0 [background:url(/figmaAssets/image-10.png)_50%_50%_/_cover]" />
            <div className="absolute w-full h-full top-0 left-0 bg-[#323438]" />
            <button className="absolute top-[calc(50%_-_36px)] left-[calc(50%_-_36px)] w-[72px] h-[72px] bg-genericwhite rounded-[36px] flex items-center justify-center hover:scale-110 transition-transform">
              <img
                className="w-6 h-6"
                alt="Play"
                src="/figmaAssets/polygon-1.svg"
              />
            </button>
          </div>
        </section>

        <ReasonsSection />
        <SidebarSection />
        <FeaturesSection />
        <ImageGallerySection />
        <SignupFormSection />
        <FooterSection />
      </main>
    </div>
  );
};
