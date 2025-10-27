import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const featureTabs = [
  {
    id: "feature-1",
    title: "Feature Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    id: "feature-2",
    title: "Feature Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    id: "feature-3",
    title: "Feature Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    id: "feature-4",
    title: "Feature Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
];

export const ImageGallerySection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[46px] pt-0 pb-36 px-4 md:px-8 lg:px-[216px] bg-genericblack w-full">
      <div className="relative w-full max-w-[1008px] h-[554px] bg-[#323438]">
        <div className="absolute w-full h-full top-0 left-0 [background:url(../figmaAssets/image-10.png)_50%_50%_/_cover]" />

        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#323438]">
          <img
            className="h-[120px] w-[120px]"
            alt="Media icon filled"
            src="/figmaAssets/media---icon-filled-photograph.svg"
          />
        </div>
      </div>

      <Tabs defaultValue="feature-1" className="w-full max-w-[864px]">
        <TabsList className="w-full h-auto bg-transparent p-0 gap-2 grid grid-cols-4 mb-6">
          {featureTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center justify-end gap-4 bg-transparent data-[state=active]:bg-transparent p-0 h-auto border-0 rounded-none"
            >
              <div className="font-paragraph-18-lg-semibold font-[number:var(--paragraph-18-lg-semibold-font-weight)] text-genericblack text-[length:var(--paragraph-18-lg-semibold-font-size)] text-center tracking-[var(--paragraph-18-lg-semibold-letter-spacing)] leading-[var(--paragraph-18-lg-semibold-line-height)] [font-style:var(--paragraph-18-lg-semibold-font-style)] w-full">
                {tab.title}
              </div>

              <div className="w-full h-[3px] data-[state=active]:bg-[url(/figmaAssets/line-53.svg)] data-[state=inactive]:bg-[url(/figmaAssets/line-54.svg)] bg-cover bg-center" />
            </TabsTrigger>
          ))}
        </TabsList>

        {featureTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <p className="text-center font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] [font-style:var(--paragraph-16-base-medium-font-style)]">
              {tab.content}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
