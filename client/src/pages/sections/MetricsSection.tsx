import React from "react";
import { ChevronDown } from "lucide-react";

interface Metric {
  name: string;
  whatItIs: string;
  howItAffects: string;
}

const metrics: Metric[] = [
  {
    name: "Ball Speed",
    whatItIs: "Speed of the ball right after impact.",
    howItAffects: "Biggest driver of carry; more speed = more potential distance if launch & spin are optimized."
  },
  {
    name: "Club Speed",
    whatItIs: "Speed of the clubhead at impact.",
    howItAffects: "Enables ball speed; efficiency depends on strike quality and delivery (see Smash Factor)."
  },
  {
    name: "Smash Factor",
    whatItIs: "Ball speed ÷ club speed.",
    howItAffects: "Higher smash = more efficient energy transfer → more distance at the same club speed."
  },
  {
    name: "Launch Angle",
    whatItIs: "Vertical takeoff angle of the ball.",
    howItAffects: "Too low/high costs carry; optimizing with spin maximizes distance."
  },
  {
    name: "Launch Direction",
    whatItIs: "Initial horizontal start line relative to target.",
    howItAffects: "Sets the starting line; paired with Spin Axis it determines curve back toward/away from target."
  },
  {
    name: "Spin Rate (Backspin)",
    whatItIs: "Revolutions per minute around the ball's horizontal axis.",
    howItAffects: "With launch angle, governs lift/drag and carry; too much/too little hurts distance/consistency. (Measured when using RPT/RCT-style balls.)"
  },
  {
    name: "Spin Axis",
    whatItIs: "Tilt of the spin axis (left/right).",
    howItAffects: "Primary controller of shot curvature (draw/fade); more tilt = more curve."
  },
  {
    name: "Carry Distance",
    whatItIs: "Distance the ball flies before first landing.",
    howItAffects: "Core outcome metric; driven by ball speed, launch, and spin."
  },
  {
    name: "Total Distance",
    whatItIs: "Carry plus rollout.",
    howItAffects: "Influenced by descent angle, spin, and surface—flatter descent/less spin often rolls farther."
  },
  {
    name: "Side Carry",
    whatItIs: "Lateral distance from target line at landing.",
    howItAffects: "Shows left/right miss pattern; relates to launch direction and spin axis."
  },
  {
    name: "Apex (Peak Height)",
    whatItIs: "Highest point of the ball's flight.",
    howItAffects: "Too low can limit carry/stop; too high with excess spin can balloon."
  },
  {
    name: "Descent Angle",
    whatItIs: "Angle of the ball's approach at landing.",
    howItAffects: "Steeper angles stop faster (irons); shallower angles roll more (driver)."
  },
  {
    name: "Shot Type (Shape)",
    whatItIs: "Classification of the curve (e.g., draw, fade, straight).",
    howItAffects: "Summarizes start line + curvature for dispersion control."
  },
  {
    name: "Club Path",
    whatItIs: "Direction the clubhead is moving (in-to-out / out-to-in) at impact.",
    howItAffects: "Along with face angle, heavily influences spin axis and shot shape (draw/fade). Added in 2025."
  },
  {
    name: "Angle of Attack",
    whatItIs: "Up/down strike angle at impact.",
    howItAffects: "Affects spin and launch: upward AoA with driver can add carry; downward AoA increases spin/trajectory control with irons. Added in 2025."
  }
];

const MetricCard = ({ metric }: { metric: Metric }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-genericblack">{metric.name}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-primary600-main mb-2">What it is</h4>
            <p className="text-sm text-gray-700">{metric.whatItIs}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary600-main mb-2">How it affects ball flight</h4>
            <p className="text-sm text-gray-700">{metric.howItAffects}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MetricsSection = (): JSX.Element => {
  return (
    <section className="w-full py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-genericblack mb-4">
            MLM2PRO Metrics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unlock precision golf analytics with comprehensive metrics that help you understand and improve your game. Click any metric to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};
