import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HeroSection = (): JSX.Element => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // Handle email submission here
  };

  return (
    <section className="relative w-full h-screen bg-genericblack">
      <div className="absolute w-full h-full top-0 left-0 opacity-70">
        <div className="w-full h-full relative bg-[#323438]">
          <div
            className="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/figmaAssets/image-10.png)" }}
          />

          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#323438]">
            <img
              className="h-[120px] w-[120px]"
              alt="Media icon filled"
              src="/figmaAssets/media---icon-filled-photograph.svg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[700px] items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8">
        <h1 className="font-heading-96-12xl-hero font-[number:var(--heading-96-12xl-hero-font-weight)] [font-style:var(--heading-96-12xl-hero-font-style)] text-genericwhite text-[length:var(--heading-96-12xl-hero-font-size)] tracking-[var(--heading-96-12xl-hero-letter-spacing)] leading-[var(--heading-96-12xl-hero-line-height)] text-center">
          Start Your MLM2PRO Discovery Here
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-[500px]">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="email-input"
            className="flex-1 h-12 px-4 bg-white text-genericblack placeholder:text-gray-500 border-0 focus-visible:ring-2 focus-visible:ring-primary600-main"
          />
          <Button 
            type="submit"
            data-testid="submit-button"
            className="h-12 px-8 bg-primary600-main hover:bg-primary-500 text-white font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] [font-style:var(--label-14-sm-semibold-font-style)] whitespace-nowrap"
          >
            GET STARTED
          </Button>
        </form>
      </div>
    </section>
  );
};
