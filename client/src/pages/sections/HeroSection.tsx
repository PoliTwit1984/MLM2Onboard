import React from "react";
import { Button } from "@/components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[700px] bg-genericblack">
      <div className="absolute w-full h-full top-0 left-0 opacity-70">
        <div className="w-full h-full relative bg-[#323438]">
          <div
            className="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/figmaAssets/image-10.png)" }}
          />

          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#323438]">
            <img
              className="h-[120px] w-[120px]"
              alt="Media icon filled"
              src="/figmaAssets/media---icon-filled-photograph.svg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[588px] items-start gap-6 absolute left-28 bottom-20">
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="font-heading-96-12xl-hero font-[number:var(--heading-96-12xl-hero-font-weight)] [font-style:var(--heading-96-12xl-hero-font-style)] text-genericwhite text-[length:var(--heading-96-12xl-hero-font-size)] tracking-[var(--heading-96-12xl-hero-letter-spacing)] leading-[var(--heading-96-12xl-hero-line-height)]">
            A NEW ERA OF LAUNCH MONITORS HAS ARRIVED.
          </h1>
        </div>

        <div className="flex flex-wrap items-start gap-4 pt-3 w-full">
          <Button className="h-auto bg-primary600-main hover:bg-primary-500 rounded-lg px-4 py-2.5">
            <span className="font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] [font-style:var(--label-14-sm-semibold-font-style)]">
              JOIN THE WAITLIST
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
