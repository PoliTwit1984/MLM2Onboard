import React from "react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
  badge?: "measured" | "new";
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
    badge: "new",
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
    badge: "new",
    iconName: "spin-rate"
  },
  {
    name: "Spin Axis",
    whatItIs: "The measurement of axis tilt that the ball spins on.",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve.",
    badge: "new",
    iconName: "spin-axis"
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade).",
    badge: "new",
    iconName: "club-path"
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons.",
    badge: "new",
    iconName: "angle-of-attack"
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Metric Item */}
      <div
        className="flex flex-col items-center gap-3 cursor-pointer group relative"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Icon from extracted image */}
        <div className="relative">
          <img 
            src={`/figmaAssets/icons/${metric.iconName}.png`}
            alt={metric.name}
            className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-110"
          />
          
          {/* Badge - positioned at top right of icon */}
          {metric.badge && (
            <span className={`absolute -top-1 -right-2 px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
              metric.badge === "new" 
                ? "bg-green-400 text-black" 
                : "bg-gray-300 text-black"
            }`}>
              {metric.badge === "new" ? "New" : "Measured"}
            </span>
          )}
        </div>
        
        {/* Metric Name */}
        <p className="font-semibold text-sm text-center text-white leading-tight w-32">
          {metric.name}
        </p>
      </div>

      {/* Expanded Details - Positioned absolutely to avoid layout shift */}
      {isExpanded && (
        <div 
          className="absolute top-full mt-8 left-1/2 transform -translate-x-1/2 z-50 p-6 bg-white border-2 border-gray-300 rounded-xl shadow-2xl w-80 animate-in fade-in slide-in-from-top-2 duration-300"
          data-testid={`metric-details-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <h4 className="font-bold text-base text-genericblack mb-4 uppercase tracking-wide">{metric.name}</h4>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">What it is</p>
              <p className="text-sm text-gray-700 leading-relaxed">{metric.whatItIs}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">How it affects ball flight</p>
              <p className="text-sm text-gray-700 leading-relaxed">{metric.howItAffects}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MetricsSection = (): JSX.Element => {
  return (
    <section className="w-full py-24 px-8 bg-genericblack">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            MLM2PRO Metrics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        {/* 5x3 Grid Layout with generous spacing to prevent dropdown overcrowding */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-24 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
