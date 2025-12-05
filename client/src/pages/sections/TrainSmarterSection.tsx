import React, { useRef, useEffect } from "react";
import { Eye, Crosshair, Shuffle, Trophy, Lightbulb, Target } from "lucide-react";
import { trackSectionView } from "@/lib/mixpanel";

interface CardData {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  proTip: string | string[];
  challenge: {
    title: string;
    description: string;
    timing: string;
  };
  image: string;
  isPremium: boolean;
}

const CARDS: CardData[] = [
  {
    id: "impact-vision",
    icon: Eye,
    title: "See What You Feel",
    description: "Stop guessing if you hit it off the toe. <strong>Impact Vision</strong> captures your strike at 240 frames per second, letting you see the exact moment of impact in slow motion—automatically, with every shot.",
    proTip: "Watch your clubface angle at impact to diagnose slices and hooks—no extra setup required.",
    challenge: {
      title: "View Your Impact",
      description: "Hit any shot and tap \"Impact Vision\" to see the slow-motion replay.",
      timing: "Try it your next session."
    },
    image: "/figmaAssets/480x640bb (3).webp",
    isPremium: true
  },
  {
    id: "session-insights",
    icon: Crosshair,
    title: "Know Your True Distances",
    description: "Stop guessing how far your 7-iron goes. <strong>Session Insights</strong> shows your actual average carry and shot pattern—so you know exactly which club to pull when you have to carry a bunker.",
    proTip: [
      "Check the center of your shot pattern to adjust your aim.",
      "Identify large distance gaps between your clubs.",
      "See which clubs have the tightest accuracy for approach shots."
    ],
    challenge: {
      title: "Reveal Your Shot Dispersion",
      description: "Hit 10 shots with your 7-iron to see your true shot pattern.",
      timing: "Try it this week."
    },
    image: "/figmaAssets/480x640bb (4).webp",
    isPremium: true
  },
  {
    id: "random-target",
    icon: Shuffle,
    title: "Train Under Pressure",
    description: "Stop hitting the same shot over and over. <strong>Random Target</strong> mode changes your distance after every shot—forcing you to adapt just like a real round.",
    proTip: "Set your range to 80–130 yards and practice those scoring-club distances that win rounds.",
    challenge: {
      title: "Try Random Target Mode",
      description: "Hit 10 random distances and see how you adapt.",
      timing: "Try it twice before your next round."
    },
    image: "/figmaAssets/cfimages (6).avif",
    isPremium: false
  },
  {
    id: "rapsodo-combine",
    icon: Trophy,
    title: "Test Your Skills in 20 Minutes",
    description: "Don't just hit balls—measure your ability. The <strong>Rapsodo Combine</strong> is a 24-shot test that generates an <strong>Estimated Handicap</strong> based on your accuracy.",
    proTip: "Retake the Combine monthly to track your improvement and see your handicap drop over time.",
    challenge: {
      title: "Take the Combine",
      description: "24 shots. 20 minutes. Get your estimated handicap.",
      timing: "Retake monthly."
    },
    image: "/figmaAssets/cfimages (4).avif",
    isPremium: true
  }
];

export const TrainSmarterSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Track section view with Intersection Observer
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasTrackedView.current) {
            hasTrackedView.current = true;
            trackSectionView('train-smarter', 'Train Smarter Section');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="train-smarter"
      className="flex flex-col items-center py-24 px-4 md:px-8 lg:px-12 w-full max-w-[1440px] mx-auto bg-genericblack border-t border-white/10"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-4xl">
        <h2 className="font-heading-72-9xl-hero text-genericwhite text-4xl md:text-6xl font-bold tracking-wide leading-tight uppercase italic">
          Train Smarter, Not Harder
        </h2>
        <p className="text-neutral-300 text-lg md:text-xl font-medium tracking-wide max-w-2xl opacity-90">
          Unlock the full potential of your MLM2PRO with these advanced practice modes designed to lower your scores.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const isMultipleTips = Array.isArray(card.proTip);

          return (
            <div
              key={card.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 hover:border-primary600-main transition-all duration-300 shadow-lg hover:shadow-primary600-main/10"
            >
              {/* Image Area */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10 opacity-60"></div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Icon Badge */}
                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
                  <Icon className="w-6 h-6 text-primary600-main" />
                </div>

                {/* Premium Badge */}
                {card.isPremium && (
                  <div className="absolute top-4 left-4 z-20 bg-primary600-main/90 backdrop-blur-md px-3 py-1 rounded-md shadow-lg border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Premium</span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-grow p-8 gap-5">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading-72-9xl-hero text-3xl md:text-4xl text-genericwhite uppercase italic">
                    {card.title}
                  </h3>
                  <p
                    className="text-base md:text-lg text-neutral-200 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>

                {/* Pro Tip(s) */}
                <div className="bg-black/40 rounded-xl p-5 border-l-4 border-primary600-main">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-primary600-main flex-shrink-0 mt-0.5" />
                    {isMultipleTips ? (
                      <div className="text-base text-neutral-200 leading-relaxed">
                        <strong className="text-white">Pro tips:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                          {(card.proTip as string[]).map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-base text-neutral-200 leading-relaxed">
                        <strong className="text-white">Pro tip:</strong> {card.proTip as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Challenge Card */}
                <div className="mt-auto bg-black/30 rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary600-main" />
                    <span className="text-sm font-bold text-primary600-main uppercase tracking-wider">Your Challenge</span>
                  </div>
                  <p className="text-base text-white font-semibold mb-1">{card.challenge.title}</p>
                  <p className="text-base text-neutral-300">
                    {card.challenge.description}{" "}
                    <span className="text-primary600-main font-medium">{card.challenge.timing}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social CTA */}
      <div className="mt-16 text-center max-w-2xl">
        <p className="text-lg text-neutral-300">
          <strong className="text-white">Completed a challenge?</strong> Share your swing or Combine score and tag{" "}
          <span className="text-primary600-main font-semibold">@RapsodoGolf</span> to let us know! We love celebrating your progress.
        </p>
      </div>
    </section>
  );
};
