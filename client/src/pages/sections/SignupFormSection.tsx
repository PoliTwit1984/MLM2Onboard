import React from "react";
import { CheckCircle2, Wifi, Target, Activity, Eye, Wrench } from "lucide-react";

const checklistItems = [
  {
    id: 1,
    icon: Wifi,
    title: "Power Up & Update",
    tip: "Plug in the charger, power on, and connect to your preferred network. Visit the Device Info page to update firmware before your first session."
  },
  {
    id: 2,
    icon: Target,
    title: "Dial In Your Alignment",
    tip: "Mark the ball and MLM2PRO placement for consistency. Remember — the device can't measure what it can't see!"
  },
  {
    id: 3,
    icon: Activity,
    title: "Get Comfortable in Your Setup",
    tip: "Indoor or net practice takes time to adjust. Swing naturally — \"Indoor Swing Syndrome\" is common but fixable with repetition."
  },
  {
    id: 4,
    icon: Eye,
    title: "Review with Impact Vision",
    tip: "Use Impact Vision during or after your session to fine-tune setup and contact consistency."
  },
  {
    id: 5,
    icon: Wrench,
    title: "Make Adjustments and Improve",
    tip: "Every setup is unique. Experiment with distance, lighting, or mat height. If you need help, reach out to our support team right in the app."
  }
];

export const SignupFormSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center pt-0 pb-12 px-0 bg-genericblack">
      <img
        className="h-[70px] md:h-[141.87px] w-full max-w-[1216px]"
        alt="Vector"
        src="/figmaAssets/vector-4.svg"
      />

      <div className="flex flex-col w-full max-w-[1216px] items-center justify-center gap-2 pt-10 md:pt-20 pb-8 md:pb-12 px-4 md:px-12 lg:px-[76px] bg-primary600-main">
        <div className="items-start gap-6 md:gap-10 px-0 md:px-8 lg:px-[104px] py-0 flex flex-col w-full">
          <div className="flex flex-col items-start gap-3 w-full">
            <h2 className="w-full mt-[-1.00px] font-heading-48-6xl-hero font-[number:var(--heading-48-6xl-hero-font-weight)] text-[length:var(--heading-48-6xl-hero-font-size)] tracking-[var(--heading-48-6xl-hero-letter-spacing)] leading-[var(--heading-48-6xl-hero-line-height)] [font-style:var(--heading-48-6xl-hero-font-style)] text-genericwhite">
              TEE TIME CHECKLIST: YOUR PATH TO A PERFECT SETUP
            </h2>

            <p className="w-full font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] [font-style:var(--paragraph-18-lg-medium-font-style)] text-genericwhite opacity-90">
              Your 5 step guide to getting the most out of your MLM2PRO — built for every skill level.
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full">
            {checklistItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-genericwhite/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-genericwhite" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading-20-xl-hero font-[number:var(--heading-20-xl-hero-font-weight)] text-[length:var(--heading-20-xl-hero-font-size)] tracking-[var(--heading-20-xl-hero-letter-spacing)] leading-[var(--heading-20-xl-hero-line-height)] [font-style:var(--heading-20-xl-hero-font-style)] text-genericwhite mb-2">
                      {item.id}.) {item.title}
                    </h3>
                    <p className="font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] text-white/90">
                      <span className="font-semibold text-white">Tip:</span> {item.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <img
        className="h-[80px] md:h-[159.6px] w-full max-w-[1216px]"
        alt="Vector"
        src="/figmaAssets/vector-5.svg"
      />
    </section>
  );
};