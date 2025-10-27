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
    <div className="flex flex-col items-center w-full">
      {/* Metric Item */}
      <div
        className={`flex flex-col items-center gap-4 cursor-pointer group relative transition-all duration-300 ${
          isSelected ? 'scale-105' : ''
        }`}
        onClick={onSelect}
        data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Icon from extracted image - Responsive sizing to prevent overflow */}
        <div className="relative">
          <img 
            src={`/figmaAssets/icons/${metric.iconName}.png`}
            alt={metric.name}
            className="w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 object-contain transition-all duration-300 group-hover:scale-105"
          />
          
          {/* Badge - only "measured", removed "new" */}
          {metric.badge && (
            <span className="absolute top-1 right-1 px-2.5 py-1 text-xs font-bold rounded-full bg-gray-300 text-black">
              Measured
            </span>
          )}
        </div>
        
        {/* Metric Name */}
        <p className="font-semibold text-lg text-center text-white leading-tight max-w-[200px]">
          {metric.name}
        </p>
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
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            MLM2PRO Metrics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        {/* 5x3 Grid Layout with generous spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-20 mx-auto mb-16">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric}
              isSelected={selectedMetric === index}
              onSelect={() => handleMetricClick(index)}
            />
          ))}
        </div>

        {/* Expanded Details Section - Below the grid, not overlapping */}
        {selectedMetric !== null && (
          <div 
            className="p-8 bg-white border-2 border-gray-300 rounded-xl shadow-2xl max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
            data-testid={`metric-details-${metrics[selectedMetric].name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex justify-between items-start mb-6">
              <h4 className="font-bold text-2xl text-genericblack uppercase tracking-wide">
                {metrics[selectedMetric].name}
              </h4>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                data-testid="metric-details-close-button"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">What it is</p>
                <p className="text-base text-gray-700 leading-relaxed">{metrics[selectedMetric].whatItIs}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">How it affects ball flight</p>
                <p className="text-base text-gray-700 leading-relaxed">{metrics[selectedMetric].howItAffects}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
