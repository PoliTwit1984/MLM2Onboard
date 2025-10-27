import React from "react";
import { 
  Activity, 
  Gauge, 
  Target, 
  ArrowUpRight, 
  Navigation, 
  Zap,
  TrendingUp,
  ArrowRight,
  MapPin,
  Mountain,
  ArrowDown,
  GitBranch,
  RotateCw,
  Triangle
} from "lucide-react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
  badge?: "measured" | "new";
  icon: React.ReactNode;
}

const metrics: Metric[] = [
  {
    name: "Total Distance",
    whatItIs: "Carry plus rollout.",
    howItAffects: "Influenced by descent angle, spin, and surface—flatter descent/less spin often rolls farther.",
    badge: "measured",
    icon: <Activity className="w-10 h-10" />
  },
  {
    name: "Carry Distance",
    whatItIs: "Distance the ball flies before first landing.",
    howItAffects: "Core outcome metric; driven by ball speed, launch, and spin.",
    badge: "measured",
    icon: <Target className="w-10 h-10" />
  },
  {
    name: "Side Carry",
    whatItIs: "Lateral distance from target line at landing.",
    howItAffects: "Shows left/right miss pattern; relates to launch direction and spin axis.",
    icon: <ArrowRight className="w-10 h-10" />
  },
  {
    name: "Ball Speed",
    whatItIs: "Speed of the ball right after impact.",
    howItAffects: "Biggest driver of carry; more speed = more potential distance if launch & spin are optimized.",
    badge: "measured",
    icon: <Zap className="w-10 h-10" />
  },
  {
    name: "Launch Direction",
    whatItIs: "Initial horizontal start line relative to target.",
    howItAffects: "Sets the starting line; paired with Spin Axis it determines curve back toward/away from target.",
    badge: "measured",
    icon: <Navigation className="w-10 h-10" />
  },
  {
    name: "Club Speed",
    whatItIs: "Speed of the clubhead at impact.",
    howItAffects: "Enables ball speed; efficiency depends on strike quality and delivery (see Smash Factor).",
    badge: "measured",
    icon: <Gauge className="w-10 h-10" />
  },
  {
    name: "Smash Factor",
    whatItIs: "Ball speed ÷ club speed.",
    howItAffects: "Higher smash = more efficient energy transfer → more distance at the same club speed.",
    icon: <TrendingUp className="w-10 h-10" />
  },
  {
    name: "Launch Angle",
    whatItIs: "Vertical takeoff angle of the ball.",
    howItAffects: "Too low/high costs carry; optimizing with spin maximizes distance.",
    badge: "measured",
    icon: <ArrowUpRight className="w-10 h-10" />
  },
  {
    name: "Descent Angle",
    whatItIs: "Angle of the ball's approach at landing.",
    howItAffects: "Steeper angles stop faster (irons); shallower angles roll more (driver).",
    badge: "new",
    icon: <ArrowDown className="w-10 h-10" />
  },
  {
    name: "Shot Apex",
    whatItIs: "Highest point of the ball's flight.",
    howItAffects: "Too low can limit carry/stop; too high with excess spin can balloon.",
    icon: <Mountain className="w-10 h-10" />
  },
  {
    name: "Shot Type",
    whatItIs: "Classification of the curve (e.g., draw, fade, straight).",
    howItAffects: "Summarizes start line + curvature for dispersion control.",
    badge: "measured",
    icon: <GitBranch className="w-10 h-10" />
  },
  {
    name: "Spin Rate",
    whatItIs: "Revolutions per minute around the ball's horizontal axis.",
    howItAffects: "With launch angle, governs lift/drag and carry; too much/too little hurts distance/consistency. (Measured when using RPT/RCT-style balls.)",
    badge: "new",
    icon: <RotateCw className="w-10 h-10" />
  },
  {
    name: "Spin Axis",
    whatItIs: "The measurement of axis tilt that the ball spins on.",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve.",
    badge: "measured",
    icon: <RotateCw className="w-10 h-10" />
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade). Added in 2025.",
    badge: "measured",
    icon: <MapPin className="w-10 h-10" />
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons. Added in 2025.",
    badge: "new",
    icon: <Triangle className="w-10 h-10" />
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Metric Item - matching Figma specs */}
      <div
        className="flex flex-col items-center p-0 gap-2 w-full max-w-[142px] cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`metric-card-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Icon Circle */}
        <div className="w-20 h-20 rounded-full bg-genericblack flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          {metric.icon}
        </div>
        
        {/* Metric Name */}
        <p className="font-semibold text-sm text-center text-genericblack leading-tight min-h-[32px] flex items-center">
          {metric.name}
        </p>
        
        {/* Badge */}
        {metric.badge && (
          <span className={`inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${
            metric.badge === "new" 
              ? "bg-green-100 text-green-700 border-green-300" 
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}>
            {metric.badge === "new" ? "New" : "Measured"}
          </span>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div 
          className="mt-6 p-6 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-w-md w-full animate-in fade-in slide-in-from-top-2 duration-300"
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
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-genericblack mb-6">
            MLM2PRO Metrics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        {/* Grid matching Figma specifications */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
