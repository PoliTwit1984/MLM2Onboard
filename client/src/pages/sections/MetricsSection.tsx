import React from "react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
  badge?: "measured";
  iconName: string;
  positiveNegative?: {
    positive: {
      label: string;
      description: string;
      idealRange?: string;
    };
    negative: {
      label: string;
      description: string;
      idealRange?: string;
    };
    neutral?: {
      label: string;
      description: string;
    };
  };
}

const metrics: Metric[] = [
  // Row 1
  {
    name: "Total Distance",
    whatItIs: "Carry plus rollout.",
    howItAffects: "Influenced by descent angle, spin, and surface—flatter descent/less spin often rolls farther.",
    iconName: "total-distance"
  },
  {
    name: "Carry Distance",
    whatItIs: "Distance the ball flies before first landing.",
    howItAffects: "Core outcome metric; driven by ball speed, launch, and spin.",
    iconName: "carry-distance"
  },
  {
    name: "Side Carry",
    whatItIs: "Lateral distance from target line at landing.",
    howItAffects: "Shows left/right miss pattern; relates to launch direction and spin axis.",
    iconName: "side-carry"
  },
  {
    name: "Ball Speed",
    whatItIs: "Speed of the ball right after impact.",
    howItAffects: "Biggest driver of carry; more speed = more potential distance if launch & spin are optimized.",
    badge: "measured",
    iconName: "ball-speed"
  },
  {
    name: "Launch Direction",
    whatItIs: "Initial horizontal start line relative to target.",
    howItAffects: "Sets the starting line; paired with Spin Axis it determines curve back toward/away from target.",
    badge: "measured",
    iconName: "launch-direction",
    positiveNegative: {
      positive: {
        label: "Right of Target",
        description: "Ball starts to the right (push)",
        idealRange: "Within ±2° for accuracy"
      },
      negative: {
        label: "Left of Target",
        description: "Ball starts to the left (pull)",
        idealRange: "Within ±2° for accuracy"
      },
      neutral: {
        label: "At Target",
        description: "Ball starts directly at the target line"
      }
    }
  },
  
  // Row 2
  {
    name: "Club Speed",
    whatItIs: "Speed of the clubhead at impact.",
    howItAffects: "Enables ball speed; efficiency depends on strike quality and delivery (see Smash Factor).",
    badge: "measured",
    iconName: "club-speed"
  },
  {
    name: "Smash Factor",
    whatItIs: "Ball speed ÷ club speed.",
    howItAffects: "Higher smash = more efficient energy transfer → more distance at the same club speed.",
    iconName: "smash-factor"
  },
  {
    name: "Launch Angle",
    whatItIs: "Vertical takeoff angle of the ball.",
    howItAffects: "Too low/high costs carry; optimizing with spin maximizes distance.",
    badge: "measured",
    iconName: "launch-angle"
  },
  {
    name: "Descent Angle",
    whatItIs: "Angle of the ball's approach at landing.",
    howItAffects: "Steeper angles stop faster (irons); shallower angles roll more (driver).",
    iconName: "descent-angle"
  },
  {
    name: "Shot Apex",
    whatItIs: "Highest point of the ball's flight.",
    howItAffects: "Too low can limit carry/stop; too high with excess spin can balloon.",
    iconName: "shot-apex"
  },
  
  // Row 3
  {
    name: "Shot Type",
    whatItIs: "Classification of the curve (e.g., draw, fade, straight).",
    howItAffects: "Summarizes start line + curvature for dispersion control.",
    badge: "measured",
    iconName: "shot-type"
  },
  {
    name: "Spin Rate",
    whatItIs: "Revolutions per minute around the ball's horizontal axis.",
    howItAffects: "With launch angle, governs lift/drag and carry; too much/too little hurts distance/consistency.",
    iconName: "spin-rate"
  },
  {
    name: "Spin Axis",
    whatItIs: "The measurement of axis tilt that the ball spins on.",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve.",
    iconName: "spin-axis",
    positiveNegative: {
      positive: {
        label: "Fade/Slice",
        description: "Ball curves left to right (RH golfer)",
        idealRange: "+2° to +5° for controlled fade"
      },
      negative: {
        label: "Draw/Hook",
        description: "Ball curves right to left (RH golfer)",
        idealRange: "-2° to -5° for controlled draw"
      },
      neutral: {
        label: "Straight",
        description: "No curve, ball flies straight"
      }
    }
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade).",
    iconName: "club-path",
    positiveNegative: {
      positive: {
        label: "Inside-Out",
        description: "Clubhead moving right of target (promotes draws)",
        idealRange: "+2° to +4° for draw shape"
      },
      negative: {
        label: "Outside-In",
        description: "Clubhead moving left of target (promotes fades)",
        idealRange: "-2° to -4° for fade shape"
      },
      neutral: {
        label: "Neutral Path",
        description: "Clubhead moving straight at target"
      }
    }
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons.",
    iconName: "angle-of-attack",
    positiveNegative: {
      positive: {
        label: "Upward Strike",
        description: "Hitting up on the ball (ideal for driver)",
        idealRange: "+3° to +5° with driver"
      },
      negative: {
        label: "Downward Strike",
        description: "Hitting down on the ball (ideal for irons)",
        idealRange: "-2° to -5° for irons, -5° to -10° for wedges"
      },
      neutral: {
        label: "Level Strike",
        description: "Clubhead traveling level with ground"
      }
    }
  }
];

const MetricCard = ({ metric, isSelected, onSelect }: { 
  metric: Metric; 
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div 
      className={`flex flex-col items-center cursor-pointer group transition-all duration-300 ${
        isSelected ? 'scale-110 brightness-125' : 'hover:scale-105 hover:brightness-110'
      }`}
      onClick={onSelect}
      data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon Container - Tight spacing with clean icons */}
      <div className="relative">
        <img 
          src={`/figmaAssets/icons-clean/${metric.iconName}.png`}
          alt={metric.name}
          className="w-28 h-28 sm:w-40 sm:h-40 lg:w-52 lg:h-52 object-contain transition-all duration-300 mb-0"
        />
        {/* Directional Indicator for +/- metrics */}
        {metric.positiveNegative && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 bg-neutral-900 px-2 py-1 rounded-full border border-neutral-700">
            <span className="text-xs font-bold text-red-400">−</span>
            <span className="text-xs text-neutral-400">/</span>
            <span className="text-xs font-bold text-blue-400">+</span>
          </div>
        )}
      </div>
      {/* Metric Name */}
      <p className={`font-label-16-base-semibold font-[number:var(--label-16-base-semibold-font-weight)] text-[length:var(--label-16-base-semibold-font-size)] tracking-[var(--label-16-base-semibold-letter-spacing)] leading-[var(--label-16-base-semibold-line-height)] text-center text-white uppercase ${metric.positiveNegative ? 'mt-2' : ''}`}>
        {metric.name}
      </p>
    </div>
  );
};

const MetricModal = ({ metric, onClose }: { metric: Metric; onClose: () => void }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      data-testid={`metric-modal-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-900 border-2 border-primary600-main rounded-2xl shadow-2xl p-8 sm:p-12 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 hover:scale-110"
          data-testid="metric-modal-close-button"
          aria-label="Close modal"
        >
          <span className="text-2xl leading-none">×</span>
        </button>
        
        {/* Header */}
        <div className="mb-8">
          <h3 className="font-heading-48-6xl-hero font-[number:var(--heading-48-6xl-hero-font-weight)] text-[length:var(--heading-48-6xl-hero-font-size)] tracking-[var(--heading-48-6xl-hero-letter-spacing)] leading-[var(--heading-48-6xl-hero-line-height)] [font-style:var(--heading-48-6xl-hero-font-style)] text-white uppercase mb-2">
            {metric.name}
          </h3>
        </div>
        
        {/* Content */}
        <div className="space-y-8">
          <div>
            <h4 className="font-paragraph-18-lg-semibold font-[number:var(--paragraph-18-lg-semibold-font-weight)] text-[length:var(--paragraph-18-lg-semibold-font-size)] tracking-[var(--paragraph-18-lg-semibold-letter-spacing)] leading-[var(--paragraph-18-lg-semibold-line-height)] text-primary600-main uppercase mb-3">
              What it is
            </h4>
            <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] text-neutral-100">
              {metric.whatItIs}
            </p>
          </div>
          
          <div>
            <h4 className="font-paragraph-18-lg-semibold font-[number:var(--paragraph-18-lg-semibold-font-weight)] text-[length:var(--paragraph-18-lg-semibold-font-size)] tracking-[var(--paragraph-18-lg-semibold-letter-spacing)] leading-[var(--paragraph-18-lg-semibold-line-height)] text-primary600-main uppercase mb-3">
              How it affects ball flight
            </h4>
            <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] text-neutral-100">
              {metric.howItAffects}
            </p>
          </div>
          
          {/* Positive/Negative Value Explanation */}
          {metric.positiveNegative && (
            <div className="border-2 border-neutral-700 rounded-xl p-6 bg-neutral-950">
              <h4 className="font-paragraph-18-lg-semibold font-[number:var(--paragraph-18-lg-semibold-font-weight)] text-[length:var(--paragraph-18-lg-semibold-font-size)] tracking-[var(--paragraph-18-lg-semibold-letter-spacing)] leading-[var(--paragraph-18-lg-semibold-line-height)] text-primary600-main uppercase mb-5">
                Understanding Positive & Negative Values
              </h4>
              
              <div className="space-y-4">
                {/* Negative Values */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-400">−</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-400 text-base mb-1">
                      {metric.positiveNegative.negative.label}
                    </p>
                    <p className="text-neutral-300 text-sm">
                      {metric.positiveNegative.negative.description}
                    </p>
                    {metric.positiveNegative.negative.idealRange && (
                      <p className="text-neutral-400 text-xs mt-1 italic">
                        Ideal: {metric.positiveNegative.negative.idealRange}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Neutral/Zero Values */}
                {metric.positiveNegative.neutral && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-600/20 flex items-center justify-center">
                      <span className="text-xl font-bold text-neutral-400">0</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-400 text-base mb-1">
                        {metric.positiveNegative.neutral.label}
                      </p>
                      <p className="text-neutral-300 text-sm">
                        {metric.positiveNegative.neutral.description}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Positive Values */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-400">+</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-400 text-base mb-1">
                      {metric.positiveNegative.positive.label}
                    </p>
                    <p className="text-neutral-300 text-sm">
                      {metric.positiveNegative.positive.description}
                    </p>
                    {metric.positiveNegative.positive.idealRange && (
                      <p className="text-neutral-400 text-xs mt-1 italic">
                        Ideal: {metric.positiveNegative.positive.idealRange}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MetricsSection = (): JSX.Element => {
  const [selectedMetric, setSelectedMetric] = React.useState<number | null>(null);

  const handleMetricClick = (index: number) => {
    setSelectedMetric(index);
  };

  const handleCloseModal = () => {
    setSelectedMetric(null);
  };

  return (
    <section className="w-full bg-genericblack relative">
      {/* Top Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary600-main to-transparent opacity-30" />
      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] [font-style:var(--heading-72-9xl-hero-font-style)] text-white text-center mt-[8px] mb-[8px] text-[55px]">Understand The Data</h2>
            <p className="font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)] text-neutral-200 max-w-3xl mx-auto">Click on any metric below to learn about what it means and how it affects your ball flight. Understanding the data allows you to hit a shot and know exactly why that shot did what it did. </p>
          </div>

          {/* 5x3 Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16 mx-auto">
            {metrics.map((metric, index) => (
              <MetricCard 
                key={index}
                metric={metric}
                isSelected={selectedMetric === index}
                onSelect={() => handleMetricClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary600-main to-transparent opacity-30" />
      {/* Modal */}
      {selectedMetric !== null && (
        <MetricModal 
          metric={metrics[selectedMetric]} 
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};
