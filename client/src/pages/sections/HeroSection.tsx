import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { identifyUser, trackEvent } from "@/lib/mixpanel";

export const HeroSection = (): JSX.Element => {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const thanksCardRef = useRef<HTMLDivElement>(null);

  // Focus management - move focus to Thanks card after submission
  useEffect(() => {
    if (submitted && thanksCardRef.current) {
      thanksCardRef.current.focus();
    }
  }, [submitted]);

  // Email validation (optional field)
  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Optional field - empty is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email if provided
    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Identify user in Mixpanel if email provided
    if (email) {
      identifyUser(email);
      trackEvent("email_submitted", { email });
    } else {
      trackEvent("onboarding_started_anonymous");
    }

    setSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-screen bg-genericblack flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-7xl w-full z-10">
        {/* Content area */}
        <div className="flex flex-col w-full max-w-2xl items-center gap-6 sm:gap-8 relative">
          {!submitted ? (
            <>
              {/* Headline - Responsive font sizes */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-genericwhite text-center leading-tight italic font-heading-96-12xl-hero">
                Your Quest To More Golf Starts Here
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base md:text-lg text-center max-w-xl text-white/90">
                Unlock the full potential of your MLM2PRO. Learn how to set up, practice smarter, and turn your swing data into real improvement.
              </p>

              {/* Email Input Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md"
              >
                <Input
                  type="email"
                  placeholder="Email address (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for MLM2PRO onboarding"
                  aria-describedby="email-help"
                  data-testid="email-input"
                  className="flex-1 h-12 px-4 bg-white text-genericblack placeholder:text-gray-500 border-0 focus-visible:ring-2 focus-visible:ring-primary600-main rounded-md"
                />
                <Button
                  type="submit"
                  aria-label="Start onboarding"
                  data-testid="submit-button"
                  className="h-12 px-6 sm:px-8 bg-primary600-main hover:bg-primary-500 text-white font-semibold text-sm uppercase tracking-wide whitespace-nowrap rounded-md"
                >
                  GET STARTED
                </Button>
              </form>
              <span id="email-help" className="sr-only">
                Optional. Enter your email to personalize your experience and track your progress.
              </span>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="text-red-400 text-center text-sm animate-fade-in"
                  data-testid="error-message"
                >
                  {error}
                </div>
              )}
            </>
          ) : (
            /* Thanks Card - Shown after submission */
            <div aria-live="polite" aria-atomic="true">
              <Card
                ref={thanksCardRef}
                tabIndex={-1}
                className="w-full max-w-sm sm:max-w-md mx-auto bg-white border-2 border-primary600-main shadow-2xl animate-fade-in"
                data-testid="thanks-card"
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="flex justify-center mb-2 sm:mb-4">
                    <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-genericblack">
                    You're All Set!
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-4 sm:px-6 pb-6">
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    Thanks for joining. You're ready to start your MLM2PRO journey.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Scroll down to explore setup guides, swing metrics, and troubleshooting tips.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Device Image - Lazy loaded with WebP optimization */}
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex items-center justify-center">
          <picture>
            <source
              srcSet="/figmaAssets/mlm2pro-device.webp"
              type="image/webp"
            />
            <img
              src="/figmaAssets/mlm2pro-device.png"
              alt="MLM2PRO Launch Monitor device"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
