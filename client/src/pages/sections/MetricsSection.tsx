import React from "react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
  badge?: "measured";
  iconName: string;
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
    iconName: "launch-direction"
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
    iconName: "spin-axis"
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade).",
    iconName: "club-path"
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons.",
    iconName: "angle-of-attack"
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
        isSelected ? 'scale-105' : ''
      }`}
      onClick={onSelect}
      data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon Container - Clean with no extra space */}
      <div className="relative mb-3">
        <img 
          src={`/figmaAssets/icons-cropped/${metric.iconName}.png`}
          alt={metric.name}
          className="w-28 h-28 sm:w-40 sm:h-40 lg:w-52 lg:h-52 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
        />
        
        {/* Badge - Subtle corner overlay */}
        {metric.badge && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-paragraph-12-xs-semibold font-[number:var(--paragraph-12-xs-semibold-font-weight)] tracking-[var(--paragraph-12-xs-semibold-letter-spacing)] leading-[var(--paragraph-12-xs-semibold-line-height)] rounded-md bg-neutral-700 text-white shadow-lg">
            MEASURED
          </span>
        )}
      </div>
      
      {/* Metric Name - Using design system typography */}
      <p className="font-label-16-base-semibold font-[number:var(--label-16-base-semibold-font-weight)] text-[length:var(--label-16-base-semibold-font-size)] tracking-[var(--label-16-base-semibold-letter-spacing)] leading-[var(--label-16-base-semibold-line-height)] text-center text-white uppercase">
        {metric.name}
      </p>
    </div>
  );
};

const MetricDetails = ({ metric, onClose }: { metric: Metric; onClose: () => void }) => {
  return (
    <div 
      className="col-span-full px-4 py-6 animate-in fade-in slide-in-from-top-4 duration-300"
      data-testid={`metric-details-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="max-w-2xl mx-auto bg-neutral-900 border-2 border-primary600-main rounded-lg shadow-2xl p-6">
        <div className="flex justify-between items-start mb-5">
          <h4 className="font-paragraph-18-lg-semibold font-[number:var(--paragraph-18-lg-semibold-font-weight)] text-[length:var(--paragraph-18-lg-semibold-font-size)] tracking-[var(--paragraph-18-lg-semibold-letter-spacing)] leading-[var(--paragraph-18-lg-semibold-line-height)] text-white uppercase">
            {metric.name}
          </h4>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-neutral-500 hover:text-white text-2xl font-bold transition-colors ml-4"
            data-testid="metric-details-close-button"
            aria-label="Close details"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] text-neutral-500 uppercase mb-2">
              What it is
            </p>
            <p className="font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] text-neutral-200">
              {metric.whatItIs}
            </p>
          </div>
          
          <div>
            <p className="font-label-12-xs-semibold font-[number:var(--label-12-xs-semibold-font-weight)] text-[length:var(--label-12-xs-semibold-font-size)] tracking-[var(--label-12-xs-semibold-letter-spacing)] leading-[var(--label-12-xs-semibold-line-height)] text-neutral-500 uppercase mb-2">
              How it affects ball flight
            </p>
            <p className="font-paragraph-14-sm-medium font-[number:var(--paragraph-14-sm-medium-font-weight)] text-[length:var(--paragraph-14-sm-medium-font-size)] tracking-[var(--paragraph-14-sm-medium-letter-spacing)] leading-[var(--paragraph-14-sm-medium-line-height)] text-neutral-200">
              {metric.howItAffects}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MetricsSection = (): JSX.Element => {
  const [selectedMetric, setSelectedMetric] = React.useState<number | null>(null);

  const handleMetricClick = (index: number) => {
    setSelectedMetric(selectedMetric === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-8 bg-genericblack">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] [font-style:var(--heading-72-9xl-hero-font-style)] text-white mb-6">
            MLM2PRO Metrics
          </h2>
          <p className="font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)] text-neutral-200 max-w-3xl mx-auto">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        {/* 5x3 Grid Layout with inline dropdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-16 mx-auto">
          {metrics.map((metric, index) => (
            <div className="contents" key={index}>
              <MetricCard 
                metric={metric}
                isSelected={selectedMetric === index}
                onSelect={() => handleMetricClick(index)}
              />
              
              {/* Show details directly after selected metric */}
              {selectedMetric === index && (
                <MetricDetails 
                  metric={metric} 
                  onClose={() => setSelectedMetric(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
