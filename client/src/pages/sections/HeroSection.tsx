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
    <section className="relative w-full min-h-screen bg-genericblack flex flex-col items-center justify-center py-20 px-8">
      <div className="flex flex-col items-center gap-12 max-w-7xl w-full z-10">
        <div className="flex flex-col w-full max-w-[700px] items-center gap-8">
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

        <div className="w-full max-w-3xl flex items-center justify-center">
          <img
            src="/figmaAssets/mlm2pro-device.png"
            alt="MLM2PRO Launch Monitor"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
