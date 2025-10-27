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
    icon: <Activity className="w-8 h-8" />
  },
  {
    name: "Carry Distance",
    whatItIs: "Distance the ball flies before first landing.",
    howItAffects: "Core outcome metric; driven by ball speed, launch, and spin.",
    badge: "measured",
    icon: <Target className="w-8 h-8" />
  },
  {
    name: "Side Carry",
    whatItIs: "Lateral distance from target line at landing.",
    howItAffects: "Shows left/right miss pattern; relates to launch direction and spin axis.",
    icon: <ArrowRight className="w-8 h-8" />
  },
  {
    name: "Ball Speed",
    whatItIs: "Speed of the ball right after impact.",
    howItAffects: "Biggest driver of carry; more speed = more potential distance if launch & spin are optimized.",
    badge: "measured",
    icon: <Zap className="w-8 h-8" />
  },
  {
    name: "Launch Direction",
    whatItIs: "Initial horizontal start line relative to target.",
    howItAffects: "Sets the starting line; paired with Spin Axis it determines curve back toward/away from target.",
    badge: "measured",
    icon: <Navigation className="w-8 h-8" />
  },
  {
    name: "Club Speed",
    whatItIs: "Speed of the clubhead at impact.",
    howItAffects: "Enables ball speed; efficiency depends on strike quality and delivery (see Smash Factor).",
    badge: "measured",
    icon: <Gauge className="w-8 h-8" />
  },
  {
    name: "Smash Factor",
    whatItIs: "Ball speed ÷ club speed.",
    howItAffects: "Higher smash = more efficient energy transfer → more distance at the same club speed.",
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    name: "Launch Angle",
    whatItIs: "Vertical takeoff angle of the ball.",
    howItAffects: "Too low/high costs carry; optimizing with spin maximizes distance.",
    badge: "measured",
    icon: <ArrowUpRight className="w-8 h-8" />
  },
  {
    name: "Descent Angle",
    whatItIs: "Angle of the ball's approach at landing.",
    howItAffects: "Steeper angles stop faster (irons); shallower angles roll more (driver).",
    badge: "new",
    icon: <ArrowDown className="w-8 h-8" />
  },
  {
    name: "Shot Apex",
    whatItIs: "Highest point of the ball's flight.",
    howItAffects: "Too low can limit carry/stop; too high with excess spin can balloon.",
    icon: <Mountain className="w-8 h-8" />
  },
  {
    name: "Shot Type",
    whatItIs: "Classification of the curve (e.g., draw, fade, straight).",
    howItAffects: "Summarizes start line + curvature for dispersion control.",
    badge: "measured",
    icon: <GitBranch className="w-8 h-8" />
  },
  {
    name: "Spin Rate",
    whatItIs: "Revolutions per minute around the ball's horizontal axis.",
    howItAffects: "With launch angle, governs lift/drag and carry; too much/too little hurts distance/consistency. (Measured when using RPT/RCT-style balls.)",
    badge: "measured",
    icon: <RotateCw className="w-8 h-8" />
  },
  {
    name: "Spin Axis",
    whatItIs: "The measurement of axis tilt that the ball spins on.",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve.",
    badge: "new",
    icon: <RotateCw className="w-8 h-8" />
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade). Added in 2025.",
    icon: <MapPin className="w-8 h-8" />
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons. Added in 2025.",
    badge: "new",
    icon: <Triangle className="w-8 h-8" />
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-24 h-24 rounded-full bg-genericblack flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-xl">
          {metric.icon}
        </div>
        
        <div className="mt-3 text-center">
          <p className="font-semibold text-sm text-genericblack">{metric.name}</p>
          {metric.badge && (
            <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
              metric.badge === "new" 
                ? "bg-green-500 text-white" 
                : "bg-gray-200 text-gray-700"
            }`}>
              {metric.badge === "new" ? "New" : "Measured"}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow-lg max-w-md w-full">
          <h4 className="font-bold text-lg text-genericblack mb-4">{metric.name.toUpperCase()}</h4>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">What it is</p>
              <p className="text-sm text-gray-700">{metric.whatItIs}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">How it affects ball flight</p>
              <p className="text-sm text-gray-700">{metric.howItAffects}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MetricsSection = (): JSX.Element => {
  return (
    <section className="w-full py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-genericblack mb-4">
            MLM2PRO Metrics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 justify-items-center">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
