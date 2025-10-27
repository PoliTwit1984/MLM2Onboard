import React from "react";
import { Button } from "@/components/ui/button";

export const ImageTextSection = (): JSX.Element => {
  return (
    <section className="flex w-full items-center gap-[139px] pt-[72px] pb-36 px-[113px] bg-genericblack">
      <div className="w-[590px] h-[552px] bg-[#323438] flex-shrink-0" />

      <div className="flex flex-col max-w-[484px] items-start gap-6">
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)]">
            UNLOCK THE POWER OF PRECISION.
          </h1>

          <p className="font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] [font-style:var(--paragraph-16-base-medium-font-style)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="pt-3">
          <Button
            variant="outline"
            className="h-auto px-5 py-[13px] rounded-lg border-white text-genericwhite hover:bg-white hover:text-genericblack font-label-16-base-semibold font-[number:var(--label-16-base-semibold-font-weight)] text-[length:var(--label-16-base-semibold-font-size)] tracking-[var(--label-16-base-semibold-letter-spacing)] leading-[var(--label-16-base-semibold-line-height)] [font-style:var(--label-16-base-semibold-font-style)]"
          >
            GET SIGNED UP
          </Button>
        </div>
      </div>
    </section>
  );
};
