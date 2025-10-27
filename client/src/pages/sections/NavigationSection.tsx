import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const navigationLinks = [
  { label: "GOLF", href: "/golf" },
  { label: "BASEBALL", href: "/baseball" },
  { label: "SOFTBALL", href: "/softball" },
];

export const NavigationSection = (): JSX.Element => {
  const [showAnnouncement, setShowAnnouncement] = React.useState(true);

  return (
    <nav className="inline-flex w-full max-w-[1440px] relative flex-col items-start">
      {showAnnouncement && (
        <div className="flex w-full items-center justify-center pl-12 pr-7 py-2 relative bg-primary600-main">
          <div className="flex-1 font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-white text-[length:var(--label-14-sm-semibold-font-size)] text-center tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] [font-style:var(--label-14-sm-semibold-font-style)]">
            FREE SHIPPING ON ORDERS OVER $99
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-5 p-0 hover:bg-transparent"
            onClick={() => setShowAnnouncement(false)}
          >
            <XIcon className="w-5 h-5 text-white" />
          </Button>
        </div>
      )}

      <div className="flex w-full items-center justify-end gap-2 pl-28 pr-8 py-2 relative bg-genericwhite border-b border-[#dfdfdf]">
        <button className="inline-flex items-center justify-end gap-2 relative hover:opacity-80 transition-opacity">
          <div className="relative w-6 h-6">
            <img
              className="absolute w-full h-[71.43%] top-[14.29%] left-0"
              alt="Flag"
              src="/figmaAssets/flag.svg"
            />
          </div>

          <div className="relative w-7 h-5 font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-genericblack text-[length:var(--label-14-sm-semibold-font-size)] text-center tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] whitespace-nowrap [font-style:var(--label-14-sm-semibold-font-style)]">
            USD
          </div>

          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex w-full items-center justify-between px-8 py-0 relative bg-primarywhite">
        <Link href="/" className="inline-flex flex-col items-start justify-around gap-2 relative self-stretch cursor-pointer hover:opacity-80 transition-opacity">
          <div className="relative w-[161.1px] h-9">
            <img
              className="absolute top-0 left-0 w-2 h-[27px]"
              alt="Measurement lines"
              src="/figmaAssets/measurement-lines.svg"
            />

            <img
              className="absolute top-0 left-[9px] w-[152px] h-[35px]"
              alt="Wording"
              src="/figmaAssets/wording.svg"
            />
          </div>
        </Link>

        <div className="inline-flex items-center gap-8 pt-6 pb-0 px-0 relative">
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="inline-flex flex-col items-center gap-5 relative hover:opacity-70 transition-opacity"
            >
              <div className="relative w-fit font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-genericblack text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] whitespace-nowrap [font-style:var(--label-14-sm-semibold-font-style)]">
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="gap-6 self-stretch inline-flex items-center relative">
          <div className="gap-4 inline-flex items-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-6 p-0 hover:bg-transparent"
              onClick={() => {/* Search functionality */}}
            >
              <SearchIcon className="w-6 h-6" />
            </Button>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-6 p-0 hover:bg-transparent"
              >
                <ShoppingBagIcon className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          <Link href="/shop">
            <Button className="h-auto w-[120px] items-center justify-center gap-1.5 px-4 py-2.5 bg-primary600-main hover:bg-primary-500 rounded-lg">
              <span className="font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-genericwhite text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] [font-style:var(--label-14-sm-semibold-font-style)]">
                SHOP
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
