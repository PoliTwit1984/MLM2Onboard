import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ImageGallerySection } from "./sections/ImageGallerySection";
import { ImageTextSection } from "./sections/ImageTextSection";
import { NavigationSection } from "./sections/NavigationSection";
import { ReasonsSection } from "./sections/ReasonsSection";
import { SidebarSection } from "./sections/SidebarSection";
import { SignupFormSection } from "./sections/SignupFormSection";

const secondaryNavItems = [
  { label: "PRODUCTS", hasDropdown: true },
  { label: "LEARNING CENTER", hasDropdown: false },
  { label: "COMMUNITY", hasDropdown: true },
  { label: "SUPPORT", hasDropdown: false },
];

export const ProductLandingPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col bg-white overflow-hidden">
      <NavigationSection />

      <nav className="w-full h-12 relative flex flex-col items-start">
        <div className="flex w-full h-12 items-center justify-between pl-28 pr-0 py-0 bg-genericblack border-b [border-bottom-style:solid] border-[#5c616b]">
          <div className="relative w-[100px] h-[27.04px] overflow-hidden">
            <div className="absolute top-0 left-0 w-7 h-7">
              <div className="absolute w-[86.36%] h-full top-0 left-0">
                <img
                  className="w-2 h-[27px] absolute top-px left-0"
                  alt="Measurement lines"
                  src="/figmaAssets/measurement-lines.svg"
                />
                <img
                  className="absolute w-[63.11%] h-[96.19%] top-0 left-[35.26%]"
                  alt="R"
                  src="/figmaAssets/r.svg"
                />
              </div>
              <img
                className="absolute w-[15.66%] h-[15.86%] top-0 left-[84.34%]"
                alt="Path"
                src="/figmaAssets/path-1650-2.svg"
              />
            </div>
            <img
              className="absolute top-[7px] left-[31px] w-[68px] h-4"
              alt="Golf"
              src="/figmaAssets/golf.svg"
            />
          </div>

          <div className="inline-flex items-start justify-center self-stretch">
            {secondaryNavItems.map((item, index) => (
              <div
                key={index}
                className={`inline-flex items-center gap-2 px-6 py-3.5 self-stretch border-r [border-right-style:solid] border-l [border-left-style:solid] border-[#5c616b] ${
                  index === 0 ? "ml-[-1px]" : ""
                } ${index === secondaryNavItems.length - 1 ? "mr-[-1px]" : ""}`}
              >
                <div className="inline-flex items-center gap-2 pt-0 pb-1 px-0 mt-[-2px]">
                  <div className="w-fit mt-[-1px] font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-genericwhite text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] whitespace-nowrap [font-style:var(--label-14-sm-semibold-font-style)]">
                    {item.label}
                  </div>
                </div>
                {item.hasDropdown && <ChevronDownIcon className="w-5 h-5" />}
              </div>
            ))}

            <div className="mr-[-1px] inline-flex items-center gap-2 px-6 py-3.5 self-stretch border-r [border-right-style:solid] border-l [border-left-style:solid] border-[#5c616b]">
              <img
                className="w-6 h-6 mt-[-2px]"
                alt="Media icon unfilled"
                src="/figmaAssets/media---icon-unfilled-user.svg"
              />
              <div className="inline-flex items-center gap-2 pt-0 pb-1 px-0 mt-[-2px]">
                <div className="w-fit mt-[-1px] font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-genericwhite text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] whitespace-nowrap [font-style:var(--label-14-sm-semibold-font-style)]">
                  USER PORTAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full relative flex flex-col items-center">
        <HeroSection />
        <ImageTextSection />

        <section className="flex items-start gap-[106px] pt-0 pb-36 px-28 w-full bg-genericblack">
          <div className="relative w-full max-w-[1216px] h-[684px] bg-[#323438]">
            <div className="absolute w-full h-full top-0 left-0 [background:url(/figmaAssets/image-10.png)_50%_50%_/_cover]" />
            <div className="absolute w-full h-full top-0 left-0 bg-[#323438]" />
            <button className="absolute top-[calc(50%_-_36px)] left-[calc(50%_-_36px)] w-[72px] h-[72px] bg-genericwhite rounded-[36px] flex items-center justify-center">
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
