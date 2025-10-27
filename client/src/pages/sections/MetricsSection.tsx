import React from "react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
  badge?: "measured" | "new";
  iconPath: string;
}

const metrics: Metric[] = [
  // Row 1
  {
    name: "Total Distance",
    whatItIs: "Carry plus rollout.",
    howItAffects: "Influenced by descent angle, spin, and surface—flatter descent/less spin often rolls farther.",
    iconPath: "M 20 40 L 30 20 L 40 30 L 50 10 M 10 40 L 60 40"
  },
  {
    name: "Carry Distance",
    whatItIs: "Distance the ball flies before first landing.",
    howItAffects: "Core outcome metric; driven by ball speed, launch, and spin.",
    iconPath: "M 30 35 Q 35 15 40 35 M 25 40 Q 35 45 45 40"
  },
  {
    name: "Side Carry",
    whatItIs: "Lateral distance from target line at landing.",
    howItAffects: "Shows left/right miss pattern; relates to launch direction and spin axis.",
    iconPath: "M 35 15 L 35 45 M 30 40 L 35 45 L 40 40"
  },
  {
    name: "Ball Speed",
    whatItIs: "Speed of the ball right after impact.",
    howItAffects: "Biggest driver of carry; more speed = more potential distance if launch & spin are optimized.",
    badge: "measured",
    iconPath: "M 20 30 L 40 30 M 32 22 L 40 30 L 32 38 M 45 30 A 5 5 0 1 1 45 29.9"
  },
  {
    name: "Launch Direction",
    whatItIs: "Initial horizontal start line relative to target.",
    howItAffects: "Sets the starting line; paired with Spin Axis it determines curve back toward/away from target.",
    badge: "measured",
    iconPath: "M 30 45 L 30 15 L 45 30 Z"
  },
  
  // Row 2
  {
    name: "Club Speed",
    whatItIs: "Speed of the clubhead at impact.",
    howItAffects: "Enables ball speed; efficiency depends on strike quality and delivery (see Smash Factor).",
    badge: "measured",
    iconPath: "M 15 35 Q 25 25 35 35 L 38 45 L 32 45 Z"
  },
  {
    name: "Smash Factor",
    whatItIs: "Ball speed ÷ club speed.",
    howItAffects: "Higher smash = more efficient energy transfer → more distance at the same club speed.",
    iconPath: "M 35 20 A 12 12 0 0 1 35 40 M 35 30 A 2 2 0 1 1 35 29.9 M 20 30 L 28 30"
  },
  {
    name: "Launch Angle",
    whatItIs: "Vertical takeoff angle of the ball.",
    howItAffects: "Too low/high costs carry; optimizing with spin maximizes distance.",
    badge: "measured",
    iconPath: "M 15 45 L 35 25 M 25 35 Q 28 32 31 35 M 35 25 L 30 30 L 35 32"
  },
  {
    name: "Descent Angle",
    whatItIs: "Angle of the ball's approach at landing.",
    howItAffects: "Steeper angles stop faster (irons); shallower angles roll more (driver).",
    badge: "new",
    iconPath: "M 20 15 Q 35 25 45 20 M 45 20 L 42 25 M 40 45 L 45 40 L 50 45"
  },
  {
    name: "Shot Apex",
    whatItIs: "Highest point of the ball's flight.",
    howItAffects: "Too low can limit carry/stop; too high with excess spin can balloon.",
    iconPath: "M 15 45 Q 30 15 45 45 M 28 20 L 30 15 L 32 20"
  },
  
  // Row 3
  {
    name: "Shot Type",
    whatItIs: "Classification of the curve (e.g., draw, fade, straight).",
    howItAffects: "Summarizes start line + curvature for dispersion control.",
    badge: "measured",
    iconPath: "M 20 20 L 25 30 L 20 40 M 30 20 L 30 40 M 40 20 L 35 30 L 40 40"
  },
  {
    name: "Spin Rate",
    whatItIs: "Revolutions per minute around the ball's horizontal axis.",
    howItAffects: "With launch angle, governs lift/drag and carry; too much/too little hurts distance/consistency.",
    badge: "new",
    iconPath: "M 30 20 A 10 10 0 1 1 30 40 A 10 10 0 1 1 30 20 M 35 25 L 40 30 L 35 35"
  },
  {
    name: "Spin Axis",
    whatItIs: "The measurement of axis tilt that the ball spins on.",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve.",
    badge: "new",
    iconPath: "M 25 30 L 45 30 M 30 25 L 25 30 L 30 35 M 40 25 L 45 30 L 40 35 M 35 22 A 5 5 0 1 1 35 21.9"
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade).",
    badge: "new",
    iconPath: "M 20 25 Q 30 35 40 25 M 25 30 L 20 35 L 30 35 M 35 30 L 40 35 L 30 35"
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons.",
    badge: "new",
    iconPath: "M 25 25 Q 30 18 35 25 M 30 35 A 7 7 0 1 1 30 34.9 M 20 40 L 40 40"
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Metric Item */}
      <div
        className="flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Icon - Simple SVG shape */}
        <div className="relative">
          <svg
            width="70"
            height="60"
            viewBox="0 0 60 60"
            className="transition-all duration-300 group-hover:scale-110"
          >
            <path
              d={metric.iconPath}
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Metric Name */}
        <p className="font-semibold text-sm text-center text-white leading-tight w-32">
          {metric.name}
        </p>
        
        {/* Badge - positioned absolutely below when present */}
        {metric.badge && (
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            metric.badge === "new" 
              ? "bg-green-400 text-black" 
              : "bg-gray-300 text-black"
          }`}>
            {metric.badge === "new" ? "New" : "Measured"}
          </span>
        )}
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

        {/* 5x3 Grid Layout with generous spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-24 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
