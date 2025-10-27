import React from "react";

const features = [
  {
    icon: "/figmaAssets/media---icon-unfilled-wifi.svg",
    alt: "Media icon unfilled wifi",
    title: "Title",
    description: "A short description goes here.",
  },
  {
    icon: "/figmaAssets/media---icon-unfilled-users.svg",
    alt: "Media icon unfilled users",
    title: "Title",
    description: "A short description goes here.",
  },
  {
    icon: "/figmaAssets/media---icon-unfilled-globe-alt.svg",
    alt: "Media icon unfilled globe",
    title: "Title",
    description: "A short description goes here.",
  },
  {
    icon: "/figmaAssets/media---icon-unfilled-badge-check.svg",
    alt: "Media icon unfilled badge check",
    title: "Title",
    description: "A short description goes here.",
  },
  {
    icon: "/figmaAssets/media---icon-unfilled-annotation.svg",
    alt: "Media icon unfilled annotation",
    title: "Title",
    description: "A short description goes here.",
  },
  {
    icon: "/figmaAssets/media---icon-unfilled-camera.svg",
    alt: "Media icon unfilled camera",
    title: "Title",
    description: "A short description goes here.",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="flex items-start gap-[72px] pt-0 pb-36 px-28 w-full bg-genericblack">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2 flex-1">
          <img
            className="w-[72px] h-[72px]"
            alt={feature.alt}
            src={feature.icon}
          />

          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col items-start justify-center gap-1 w-full">
              <h3 className="w-full mt-[-1.00px] font-paragraph-16-base-semibold font-[number:var(--paragraph-16-base-semibold-font-weight)] text-genericwhite text-[length:var(--paragraph-16-base-semibold-font-size)] text-center tracking-[var(--paragraph-16-base-semibold-letter-spacing)] leading-[var(--paragraph-16-base-semibold-line-height)] [font-style:var(--paragraph-16-base-semibold-font-style)]">
                {feature.title}
              </h3>

              <p className="w-full font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-14-sm-medium-font-size)] text-center tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
