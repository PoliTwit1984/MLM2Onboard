import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  deviceSerial?: string;
  registrationDate?: string;
  subscriptionType?: string;
  firstConnectDate?: string;
  lastConnectDate?: string;
  sessionCount?: number;
  capturedShots?: number;
  phoneType?: string;
  appVersion?: string;
  firmwareVersion?: string;
  lastPlayed?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  age?: number;
  handedness?: string;
  e6ConnectKey?: string;
}

interface GroupedCardItem {
  label: string;
  value: string;
}

interface GroupedProfileCardProps {
  title: string;
  items: GroupedCardItem[];
  delay: number;
  side: 'left' | 'right';
}

const GroupedProfileCard = ({ title, items, delay, side }: GroupedProfileCardProps) => {
  const slideClass = side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right';
  const testId = `grouped-card-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div 
      className={`${slideClass} bg-white border-2 border-primary600-main rounded-xl p-8 shadow-2xl`}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards'
      }}
      data-testid={testId}
    >
      <h3 className="font-heading-48-6xl-hero font-[number:var(--heading-48-6xl-hero-font-weight)] text-[length:var(--heading-48-6xl-hero-font-size)] tracking-[var(--heading-48-6xl-hero-letter-spacing)] leading-[var(--heading-48-6xl-hero-line-height)] [font-style:var(--heading-48-6xl-hero-font-style)] text-primary600-main uppercase mb-6 pb-4 border-b-2 border-primary600-main">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col" data-testid={`${testId}-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="font-paragraph-14-sm-semibold font-[number:var(--paragraph-14-sm-semibold-font-weight)] text-[length:var(--paragraph-14-sm-semibold-font-size)] tracking-[var(--paragraph-14-sm-semibold-letter-spacing)] leading-[var(--paragraph-14-sm-semibold-line-height)] text-primary600-main uppercase mb-1">
              {item.label}
            </span>
            <span className="font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)] text-genericblack">
              {item.value}
            </span>
          </div>
        ))}
      </div>
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

  // Prepare grouped profile cards data
  const getGroupedProfileCards = (): Array<{ title: string; items: GroupedCardItem[]; side: 'left' | 'right' }> => {
    if (!userProfile) return [];

    const groups: Array<{ title: string; items: GroupedCardItem[]; side: 'left' | 'right' }> = [];

    // Group 1: Account Info
    const accountItems: GroupedCardItem[] = [];
    if (userProfile.email) {
      accountItems.push({ label: "Email", value: userProfile.email });
    }
    if (userProfile.registrationDate) {
      const date = new Date(userProfile.registrationDate);
      accountItems.push({ 
        label: "Start Date", 
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
    if (userProfile.handedness) {
      accountItems.push({ label: "Handedness", value: userProfile.handedness });
    }
    if (accountItems.length > 0) {
      groups.push({ title: "Account Info", items: accountItems, side: 'left' });
    }

    // Group 2: Device Info
    const deviceItems: GroupedCardItem[] = [];
    if (userProfile.deviceSerial) {
      deviceItems.push({ label: "Serial Number", value: userProfile.deviceSerial });
    }
    if (userProfile.appVersion) {
      deviceItems.push({ label: "App Version", value: userProfile.appVersion });
    }
    if (userProfile.firmwareVersion) {
      deviceItems.push({ label: "Firmware Version", value: userProfile.firmwareVersion });
    }
    if (deviceItems.length > 0) {
      groups.push({ title: "Device Info", items: deviceItems, side: 'right' });
    }

    // Group 3: Subscription
    const subscriptionItems: GroupedCardItem[] = [];
    if (userProfile.subscriptionType) {
      subscriptionItems.push({ label: "Current Subscription", value: userProfile.subscriptionType });
    }
    if (userProfile.subscriptionStartDate) {
      const date = new Date(userProfile.subscriptionStartDate);
      subscriptionItems.push({ 
        label: "Subscription Start Date", 
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
    if (userProfile.subscriptionEndDate) {
      const date = new Date(userProfile.subscriptionEndDate);
      subscriptionItems.push({ 
        label: "Subscription End Date", 
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
    if (subscriptionItems.length > 0) {
      groups.push({ title: "Subscription", items: subscriptionItems, side: 'left' });
    }

    // Group 4: Activity
    const activityItems: GroupedCardItem[] = [];
    if (userProfile.sessionCount) {
      activityItems.push({ label: "Total Sessions", value: userProfile.sessionCount.toLocaleString() });
    }
    if (userProfile.capturedShots) {
      activityItems.push({ label: "Captured Shots", value: userProfile.capturedShots.toLocaleString() });
    }
    if (userProfile.lastPlayed) {
      const date = new Date(userProfile.lastPlayed);
      activityItems.push({ 
        label: "Last Session", 
        value: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }
    if (activityItems.length > 0) {
      groups.push({ title: "Activity", items: activityItems, side: 'right' });
    }

    // Group 5: E6 Connect (if exists)
    if (userProfile.e6ConnectKey) {
      groups.push({ 
        title: "E6 Connect", 
        items: [{ label: "E6 Connect Key", value: userProfile.e6ConnectKey }], 
        side: groups.length % 2 === 0 ? 'left' : 'right'
      });
    }

    return groups;
  };

  const groupedProfileCards = getGroupedProfileCards();

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

        {/* Grouped Profile Cards - Slide in from left and right */}
        {showPersonalized && groupedProfileCards.length > 0 && (
          <>
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
              {groupedProfileCards.map((group, index) => (
                <GroupedProfileCard
                  key={index}
                  title={group.title}
                  items={group.items}
                  delay={index * 150}
                  side={group.side}
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
