import React from "react";
import { CheckCircle2, Wifi, Target, Activity, Eye, Wrench } from "lucide-react";

const checklistItems = [
  {
    id: 1,
    icon: Wifi,
    title: "Plug in charger and power on. Establish a connection and update your firmware.",
    tip: "Establish preferred network connection, visit device info page to update firmware"
  },
  {
    id: 2,
    icon: Target,
    title: "Dial in your Alignment",
    tip: "Mark where the MLM2PRO and ball placements are for consistent performance. MLM2PRO will not deliver metrics if it doesn't see the ball!"
  },
  {
    id: 3,
    icon: Activity,
    title: "Get Comfy in your Setup! Hop in a session",
    tip: "Swinging into a net or screen inside/outside off a mat can take some getting used to. Indoor Swing Syndrome is real!"
  },
  {
    id: 4,
    icon: Eye,
    title: "Review Session, Impact Vision!",
    tip: "Accessing impact vision during or after your session can help dial in your setup even further. Making sure the ball is properly aligned shot after shot, more importantly how the club and ball are coming into contact with each other."
  },
  {
    id: 5,
    icon: Wrench,
    title: "Make those Adjustments!",
    tip: "Sim setups often require tinkering before you get to that optimal setup. If you are experiencing any issues not covered here, or you can't find any answers online. Please reach out to us in app!"
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
              TEE TIME CHECKLIST
            </h2>

            <p className="w-full font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] [font-style:var(--paragraph-18-lg-medium-font-style)] text-genericwhite opacity-90">
              Your quick-start guide to getting the most out of your MLM2PRO
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