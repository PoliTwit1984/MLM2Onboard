import React from "react";
import { Button } from "@/components/ui/button";

const socialMediaIcons = [
  { src: "/figmaAssets/media---social-icon.svg", alt: "Social media 1" },
  { src: "/figmaAssets/media---social-icon-1.svg", alt: "Social media 2" },
  { src: "/figmaAssets/media---social-icon-4.svg", alt: "Social media 3" },
  { src: "/figmaAssets/media---social-icon-3.svg", alt: "Social media 4" },
  { src: "/figmaAssets/media---social-icon-2.svg", alt: "Social media 5" },
];

const productsLinks = [
  "MLM2PRO",
  "MLM",
  "Premium Subscription",
  "Bundles",
  "Accessories",
];

const supportLinks = ["Learning Center", "Support", "Blog", "User Portal"];

const companyLinks = ["Rapsodo - Home", "Play Without Limits"];

const legalLinks = ["Privacy & Cookie Policy", "Terms of Use", "FCC Statement"];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-center gap-8 md:gap-[54px] p-4 md:p-8 lg:p-12 bg-genericwhite border-t border-[#dfdfdf]">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-12 w-full">
        <div className="flex-1 text-center md:text-left [font-family:'Acumin_Pro_ExtraCondensed-Bold',Helvetica] font-bold text-genericblack text-[24px] md:text-[32px] lg:text-[40px] tracking-[0] leading-tight md:leading-9">
          <span className="[font-family:'Acumin_Pro_ExtraCondensed-BoldItalic',Helvetica] italic">
            OUR MISSION IS GIVE ATHLETES EVERYWHERE THE TOOLS THEY NEED TO PLAY
            LIKE NEVER BEFORE. SEE MORE. DO MORE. PLAY MORE.{" "}
          </span>
          <span className="[font-family:'Acumin_Pro_ExtraCondensed-BoldItalic',Helvetica] italic underline">
            PLAY WITHOUT LIMITS™.
          </span>
        </div>

        <div className="flex flex-col w-auto md:w-[238px] items-center gap-2 px-0 md:px-[30px] py-0">
          <div className="relative w-[100px] h-[83px] md:w-[125.84px] md:h-[104px]">
            <img
              className="absolute top-[59px] md:top-[74px] left-0 w-[100px] md:w-[126px] h-[24px] md:h-[30px]"
              alt="Golf"
              src="/figmaAssets/golf-1.svg"
            />
            <div className="absolute top-px left-[31px] md:left-[39px] w-10 md:w-12 h-10 md:h-12">
              <div className="absolute w-[86.36%] h-full top-0 left-0">
                <img
                  className="w-[11px] md:w-[13px] h-[38px] md:h-[46px] absolute top-px left-0"
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
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
        <div className="flex flex-col w-full lg:w-96 gap-6 lg:gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center justify-center md:justify-start mt-[-1.00px] font-heading-28-3xl-hero font-[number:var(--heading-28-3xl-hero-font-weight)] [font-style:var(--heading-28-3xl-hero-font-style)] text-primary600-main text-[18px] md:text-[length:var(--heading-28-3xl-hero-font-size)] tracking-[var(--heading-28-3xl-hero-letter-spacing)] leading-[var(--heading-28-3xl-hero-line-height)]">
                GET THE LATEST FROM THE PRO SHOP
              </h3>

              <div className="flex items-center gap-3 px-0 py-2.5 border-b border-[#dfdfdf]">
                <div className="flex items-center gap-2 flex-1">
                  <div className="inline-flex items-center gap-0.5">
                    <span className="flex items-center justify-center w-fit mt-[-1.00px] font-paragraph-16-base-medium font-[number:var(--paragraph-16-base-medium-font-weight)] text-genericblack text-[14px] md:text-[length:var(--paragraph-16-base-medium-font-size)] tracking-[var(--paragraph-16-base-medium-letter-spacing)] leading-[var(--paragraph-16-base-medium-line-height)] [font-style:var(--paragraph-16-base-medium-font-style)]">
                      Enter your Email
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-auto p-0">
                  <img
                    className="w-5 h-5"
                    alt="Icon right"
                    src="/figmaAssets/icon-right.svg"
                  />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-center md:text-left w-fit mx-auto md:mx-0 mt-[-1.00px] opacity-65 font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-genericblack text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] [font-style:var(--label-12-xs-semibold-font-style)]">
                R GOLF COMMUNITY
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 pl-0 md:pl-4 pr-0 py-0">
                {socialMediaIcons.map((icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="h-auto p-0"
                  >
                    <img className="w-6 h-6" alt={icon.alt} src={icon.src} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between flex-1 gap-8 md:gap-4">
          <nav className="flex flex-col w-full md:w-auto gap-4 md:gap-6">
            <div className="inline-flex flex-col gap-2">
              <div className="flex flex-col gap-2 pt-0 pb-1 px-0">
                <h4 className="w-fit mt-[-1.00px] opacity-65 font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-genericblack text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] [font-style:var(--label-12-xs-semibold-font-style)]">
                  PRODUCTS
                </h4>
              </div>

              <ul className="inline-flex flex-col gap-2 pl-0 md:pl-4 pr-0 py-0">
                {productsLinks.map((link, index) => (
                  <li key={index} className="inline-flex items-center gap-2">
                    <Button
                      variant="link"
                      className="h-auto p-0 font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericblack text-[12px] md:text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]"
                    >
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <nav className="inline-flex flex-col gap-2">
            <div className="flex flex-col gap-2 pt-0 pb-1 px-0">
              <h4 className="w-fit mt-[-1.00px] opacity-65 font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-genericblack text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] [font-style:var(--label-12-xs-semibold-font-style)]">
                SUPPORT
              </h4>
            </div>

            <ul className="inline-flex flex-col gap-2 pl-0 md:pl-4 pr-0 py-0">
              {supportLinks.map((link, index) => (
                <li key={index} className="inline-flex items-center gap-2">
                  <Button
                    variant="link"
                    className="h-auto p-0 font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericblack text-[12px] md:text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]"
                  >
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="inline-flex flex-col gap-2">
            <div className="flex flex-col gap-2 pt-0 pb-1 px-0">
              <h4 className="w-fit mt-[-1.00px] opacity-65 font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-genericblack text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] [font-style:var(--label-12-xs-semibold-font-style)]">
                COMPANY
              </h4>
            </div>

            <ul className="inline-flex flex-col gap-2 pl-0 md:pl-4 pr-0 py-0">
              {companyLinks.map((link, index) => (
                <li key={index} className="inline-flex items-center gap-2">
                  <Button
                    variant="link"
                    className="h-auto p-0 font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericblack text-[12px] md:text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]"
                  >
                    {link}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="inline-flex flex-col gap-6 md:gap-8">
            <div className="inline-flex flex-col gap-3.5">
              <div className="flex flex-col w-full md:w-[202px] gap-2">
                <h4 className="w-fit mt-[-1.00px] opacity-75 font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-genericblack text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] [font-style:var(--label-12-xs-semibold-font-style)]">
                  CONTACT
                </h4>
              </div>

              <div className="inline-flex flex-col gap-2 pl-0 md:pl-4 pr-0 py-0">
                <Button
                  variant="link"
                  className="h-auto p-0 inline-flex items-center md:items-end gap-2 justify-start"
                >
                  <img
                    className="w-5 h-5"
                    alt="Media icon unfilled"
                    src="/figmaAssets/media---icon-unfilled-mail.svg"
                  />
                  <span className="font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-genericblack text-[12px] md:text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] [font-style:var(--paragraph-14-sm-medium-font-style)]">
                    Support@Rapsodo.com
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 md:gap-0 w-full">
        <p className="text-center md:text-left mt-[-1.00px] font-paragraph-14-sm-special-italics font-[number:var(--paragraph-14-sm-special-italics-font-weight)] [font-style:var(--paragraph-14-sm-special-italics-font-style)] text-neutral-800 text-[12px] md:text-[length:var(--paragraph-14-sm-special-italics-font-size)] tracking-[var(--paragraph-14-sm-special-italics-letter-spacing)] leading-[var(--paragraph-14-sm-special-italics-line-height)]">
          Copyright © 2023 Rapsodo LLC. All rights reserved
        </p>

        <nav className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
          {legalLinks.map((link, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 w-fit mt-[-1.00px] font-paragraph-14-sm-special-italics font-[number:var(--paragraph-14-sm-special-italics-font-weight)] [font-style:var(--paragraph-14-sm-special-italics-font-style)] text-neutral-800 text-[12px] md:text-[length:var(--paragraph-14-sm-special-italics-font-size)] tracking-[var(--paragraph-14-sm-special-italics-letter-spacing)] leading-[var(--paragraph-14-sm-special-italics-line-height)]"
            >
              {link}
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
};
