import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    id: 1,
    title: "Key Feature Highlight Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    imageUrl: "/figmaAssets/image-10.png",
    iconUrl: "/figmaAssets/media---icon-filled-photograph.svg",
  },
  {
    id: 2,
    title: "Key Feature Highlight Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    imageUrl: "/figmaAssets/image-10.png",
    iconUrl: "/figmaAssets/media---icon-filled-photograph.svg",
  },
  {
    id: 3,
    title: "Key Feature Highlight Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    imageUrl: "/figmaAssets/image-10.png",
    iconUrl: "/figmaAssets/media---icon-filled-photograph.svg",
  },
];

export const ReasonsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-8 pt-0 pb-36 px-12 w-full bg-genericblack">
      <header className="flex items-center gap-2 px-[113px] py-0 w-full">
        <h2 className="flex-1 mt-[-1.00px] font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] text-center tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)]">
          REASONS YOU&apos;LL LOVE IT
        </h2>
      </header>

      <div className="flex w-full max-w-[1336px] items-start gap-4">
        {featureCards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col items-start gap-4 flex-1"
          >
            <Card className="w-full h-[480px] overflow-hidden border-0 bg-transparent">
              <CardContent className="relative w-full h-full p-0">
                <div className="absolute w-full h-full top-0 left-0 bg-[#323438]">
                  <div
                    className="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.imageUrl})` }}
                  />

                  <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#323438]">
                    <img
                      className="h-[120px] w-[120px]"
                      alt="Media icon filled"
                      src={card.iconUrl}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full items-start gap-6 pt-14 pb-8 px-6 absolute left-0 bottom-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_100%)]">
                  <div className="flex flex-col items-start gap-4 w-full">
                    <h3 className="mt-[-1.00px] font-heading-32-4xl-standard font-[number:var(--heading-32-4xl-standard-font-weight)] text-genericwhite text-[length:var(--heading-32-4xl-standard-font-size)] tracking-[var(--heading-32-4xl-standard-letter-spacing)] leading-[var(--heading-32-4xl-standard-line-height)] [font-style:var(--heading-32-4xl-standard-font-style)]">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-col items-start gap-4 w-full">
                <p className="mt-[-1.00px] opacity-80 font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] [font-style:var(--paragraph-16-base-medium-font-style)]">
                  {card.description}
                </p>

                <Button
                  variant="link"
                  className="inline-flex items-center gap-2 h-auto p-0 font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]"
                >
                  Read More
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
