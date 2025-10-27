import React from "react";

const sidebarItems = [
  {
    isActive: true,
    title: "Feature or important callout headline with expanded description",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    lineWidth: "w-[3px]",
    opacity: "opacity-100",
    paddingBottom: "pb-4",
  },
  {
    isActive: false,
    title: "Feature or important callout headline",
    description: null,
    lineWidth: "w-px",
    opacity: "opacity-75",
    paddingBottom: "pb-2",
  },
  {
    isActive: false,
    title: "Feature or important callout headline",
    description: null,
    lineWidth: "w-px",
    opacity: "opacity-75",
    paddingBottom: "pb-2",
  },
  {
    isActive: false,
    title: "Feature or important callout headline",
    description: null,
    lineWidth: "w-px",
    opacity: "opacity-75",
    paddingBottom: "pb-2",
  },
];

export const SidebarSection = (): JSX.Element => {
  return (
    <section className="flex items-start gap-[106px] pt-0 pb-36 px-28 bg-genericblack">
      <nav className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <div key={index} className="flex w-[416px] items-start gap-6">
              <div
                className={`self-stretch ${item.lineWidth} ${item.isActive ? "bg-primary600-main" : "bg-neutral-700"}`}
              />

              <div
                className={`flex flex-col items-start gap-4 pt-0 ${item.paddingBottom} px-0 flex-1`}
              >
                <h3
                  className={`self-stretch mt-[-1.00px] ${item.opacity} font-paragraph-24-2xl-semibold font-[number:var(--paragraph-24-2xl-semibold-font-weight)] text-genericwhite text-[length:var(--paragraph-24-2xl-semibold-font-size)] tracking-[var(--paragraph-24-2xl-semibold-letter-spacing)] leading-[var(--paragraph-24-2xl-semibold-line-height)] [font-style:var(--paragraph-24-2xl-semibold-font-style)]`}
                >
                  {item.title}
                </h3>

                {item.description && (
                  <p className="self-stretch font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] [font-style:var(--paragraph-16-base-medium-font-style)]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="relative w-[694px] h-[554px] bg-[#323438]">
        <div className="absolute w-full h-full top-0 left-0 [background:url(/figmaAssets/image-10.png)_50%_50%_/_cover]" />

        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#323438]">
          <img
            className="h-[120px] w-[120px]"
            alt="Media icon filled"
            src="/figmaAssets/media---icon-filled-photograph.svg"
          />
        </div>
      </div>
    </section>
  );
};
