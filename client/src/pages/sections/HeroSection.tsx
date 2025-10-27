import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  deviceSerial?: string;
  purchaseDate?: string;
  productName?: string;
  registrationDate?: string;
  city?: string;
  region?: string;
  country?: string;
}

interface ProfileCardProps {
  title: string;
  value: string;
  delay: number;
  side: 'left' | 'right';
}

const ProfileCard = ({ title, value, delay, side }: ProfileCardProps) => {
  const slideClass = side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right';
  const testId = `profile-card-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div 
      className={`${slideClass} bg-neutral-900 border-2 border-primary600-main rounded-xl p-6 shadow-2xl`}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
      data-testid={testId}
    >
      <h3 className="font-paragraph-14-sm-semibold font-[number:var(--paragraph-14-sm-semibold-font-weight)] text-[length:var(--paragraph-14-sm-semibold-font-size)] tracking-[var(--paragraph-14-sm-semibold-letter-spacing)] leading-[var(--paragraph-14-sm-semibold-line-height)] text-primary600-main uppercase mb-2">
        {title}
      </h3>
      <p className="font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)] text-white">
        {value}
      </p>
    </div>
  );
};

export const HeroSection = (): JSX.Element => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [showPersonalized, setShowPersonalized] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mixpanel/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      if (data.success && data.profile) {
        setUserProfile(data.profile);
        // Trigger the personalized view after a short delay
        setTimeout(() => {
          setShowPersonalized(true);
        }, 100);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'An error occurred. Please try again.');
      // Reset state on error to allow retry
      setUserProfile(null);
      setShowPersonalized(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setUserProfile(null);
    setShowPersonalized(false);
    setError(null);
  };

  // Prepare profile cards data
  const getProfileCards = (): Array<{ title: string; value: string; side: 'left' | 'right' }> => {
    if (!userProfile) return [];

    const cards: Array<{ title: string; value: string; side: 'left' | 'right' }> = [];
    let sideToggle = false;

    if (userProfile.productName) {
      cards.push({
        title: "Product",
        value: userProfile.productName,
        side: sideToggle ? 'left' : 'right'
      });
      sideToggle = !sideToggle;
    }

    if (userProfile.deviceSerial) {
      cards.push({
        title: "Device Serial",
        value: userProfile.deviceSerial,
        side: sideToggle ? 'left' : 'right'
      });
      sideToggle = !sideToggle;
    }

    if (userProfile.purchaseDate) {
      const date = new Date(userProfile.purchaseDate);
      cards.push({
        title: "Purchase Date",
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        side: sideToggle ? 'left' : 'right'
      });
      sideToggle = !sideToggle;
    }

    if (userProfile.registrationDate) {
      const date = new Date(userProfile.registrationDate);
      cards.push({
        title: "Registration Date",
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        side: sideToggle ? 'left' : 'right'
      });
      sideToggle = !sideToggle;
    }

    if (userProfile.city && userProfile.region) {
      cards.push({
        title: "Location",
        value: `${userProfile.city}, ${userProfile.region}`,
        side: sideToggle ? 'left' : 'right'
      });
      sideToggle = !sideToggle;
    }

    return cards;
  };

  const profileCards = getProfileCards();

  return (
    <section className="relative w-full min-h-screen bg-genericblack flex flex-col items-center justify-center py-20 px-8">
      <div className="flex flex-col items-center gap-12 max-w-7xl w-full z-10">
        {/* Headline - Crossfades between initial and personalized */}
        <div className="flex flex-col w-full max-w-[700px] items-center gap-8 relative">
          {!showPersonalized ? (
            <h1 
              className={`font-heading-96-12xl-hero font-[number:var(--heading-96-12xl-hero-font-weight)] [font-style:var(--heading-96-12xl-hero-font-style)] text-genericwhite text-[length:var(--heading-96-12xl-hero-font-size)] tracking-[var(--heading-96-12xl-hero-letter-spacing)] leading-[var(--heading-96-12xl-hero-line-height)] text-center transition-opacity duration-500 ${
                userProfile && !showPersonalized ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Start Your MLM2PRO Discovery Here
            </h1>
          ) : (
            <h1 
              className="font-heading-96-12xl-hero font-[number:var(--heading-96-12xl-hero-font-weight)] [font-style:var(--heading-96-12xl-hero-font-style)] text-genericwhite text-[length:var(--heading-96-12xl-hero-font-size)] tracking-[var(--heading-96-12xl-hero-letter-spacing)] leading-[var(--heading-96-12xl-hero-line-height)] text-center animate-fade-in"
            >
              Welcome, {userProfile?.firstName}!
            </h1>
          )}

          {/* Email Input Form - Fades out when profile loaded */}
          {!showPersonalized && (
            <form 
              onSubmit={handleSubmit} 
              className={`flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-[500px] transition-opacity duration-200 ${
                userProfile ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Input
                type="email"
                placeholder="Enter your MLM2PRO email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                data-testid="email-input"
                className="flex-1 h-12 px-4 bg-white text-genericblack placeholder:text-gray-500 border-0 focus-visible:ring-2 focus-visible:ring-primary600-main disabled:opacity-50"
              />
              <Button 
                type="submit"
                disabled={loading}
                data-testid="submit-button"
                className="h-12 px-8 bg-primary600-main hover:bg-primary-500 text-white font-label-14-sm-semibold font-[number:var(--label-14-sm-semibold-font-weight)] text-[length:var(--label-14-sm-semibold-font-size)] tracking-[var(--label-14-sm-semibold-letter-spacing)] leading-[var(--label-14-sm-semibold-line-height)] [font-style:var(--label-14-sm-semibold-font-style)] whitespace-nowrap disabled:opacity-50"
              >
                {loading ? 'LOADING...' : 'GET STARTED'}
              </Button>
            </form>
          )}

          {/* Error Message */}
          {error && (
            <div 
              className="text-red-500 text-center font-paragraph-16-base-medium animate-fade-in"
              data-testid="error-message"
            >
              {error}
            </div>
          )}
        </div>

        {/* Profile Cards - Slide in from left and right */}
        {showPersonalized && profileCards.length > 0 && (
          <>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {profileCards.map((card, index) => (
                <ProfileCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  delay={index * 150}
                  side={card.side}
                />
              ))}
            </div>
            
            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="outline"
              data-testid="reset-button"
              className="mt-4 px-6 py-3 border-2 border-primary600-main bg-transparent hover:bg-primary600-main text-white font-label-14-sm-semibold transition-all duration-200"
            >
              Try Different Email
            </Button>
          </>
        )}

        {/* Device Image */}
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
