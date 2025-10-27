import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SignupFormSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center pt-0 pb-12 px-0 bg-genericblack">
      <img
        className="h-[141.87px] w-full max-w-[1216px]"
        alt="Vector"
        src="/figmaAssets/vector-4.svg"
      />

      <div className="flex flex-col w-full max-w-[1216px] items-center justify-center gap-2 pt-20 pb-12 px-[76px] bg-primary600-main">
        <div className="items-start gap-14 px-[104px] py-0 flex flex-col w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2 className="w-full mt-[-1.00px] font-heading-48-6xl-hero font-[number:var(--heading-48-6xl-hero-font-weight)] [font-style:var(--heading-48-6xl-hero-font-style)] text-genericwhite text-[length:var(--heading-48-6xl-hero-font-size)] tracking-[var(--heading-48-6xl-hero-letter-spacing)] leading-[var(--heading-48-6xl-hero-line-height)]">
              GET PREPARED TO TRANSFORM YOUR GAME.
            </h2>

            <p className="w-full font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] [font-style:var(--paragraph-18-lg-medium-font-style)]">
              Join the excitement and reserve your spot on the waitlist. Users
              who sign up will be the first to know when it drops and how you
              can purchase!
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex justify-between items-start p-2 w-full">
              <label
                htmlFor="email-input"
                className="w-fit mt-[-1.00px] font-heading-96-12xl-hero font-[number:var(--heading-96-12xl-hero-font-weight)] [font-style:var(--heading-96-12xl-hero-font-style)] text-genericwhite text-[length:var(--heading-96-12xl-hero-font-size)] tracking-[var(--heading-96-12xl-hero-letter-spacing)] leading-[var(--heading-96-12xl-hero-line-height)] whitespace-nowrap"
              >
                YOUR EMAIL
              </label>

              <div className="inline-flex items-start gap-2 pt-0 pb-2 px-0">
                <Button
                  type="submit"
                  className="w-16 h-16 bg-genericwhite hover:bg-genericwhite/90 rounded-[67.43px] p-0 flex items-center justify-center"
                  aria-label="Submit email"
                >
                  <ArrowRightIcon className="w-[23px] h-[23px] text-genericblack" />
                </Button>
              </div>
            </div>

            <Input
              id="email-input"
              type="email"
              className="sr-only"
              placeholder="Enter your email"
            />

            <img
              className="w-full h-px object-cover"
              alt="Line"
              src="/figmaAssets/line-41.svg"
            />
          </div>
        </div>
      </div>

      <img
        className="h-[159.6px] w-full max-w-[1216px]"
        alt="Vector"
        src="/figmaAssets/vector-5.svg"
      />
    </section>
  );
};
