import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import type { Team } from "../data/teams";

interface UniformShowcaseProps {
  team: Team;
}

export function UniformShowcase({ team }: UniformShowcaseProps) {
  if (!team.uniforms) {
    return null;
  }

  const uniformTypes = [
    { key: "home", label: "Home" },
    { key: "away", label: "Away" },
    { key: "alternate", label: "Alternate" },
  ] as const;

  // Realistic football uniform SVG - Wikipedia style proportions
  const UniformRenderer = ({
    jerseyColor,
    pantsColor,
    helmetColor,
    accentColor,
  }: {
    jerseyColor: string;
    pantsColor: string;
    helmetColor: string;
    accentColor: string;
  }) => (
    <svg viewBox="0 0 100 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Head/Helmet - proportionally smaller */}
      <circle cx="50" cy="18" r="12" fill={helmetColor} stroke="#1a1a1a" strokeWidth="0.5" />

      {/* Helmet facemask */}
      <path d="M 42 18 Q 42 25 50 26 Q 58 25 58 18" fill="none" stroke="#555" strokeWidth="1" />

      {/* Helmet stripe down center */}
      <rect x="49" y="8" width="2" height="20" fill={accentColor} />

      {/* Neck */}
      <rect x="48" y="29" width="4" height="3" fill={jerseyColor} />

      {/* Jersey - realistic proportions (wider) */}
      <path
        d="M 30 32 L 32 32 L 34 42 L 66 42 L 68 32 L 70 32 L 70 78 Q 70 88 50 88 Q 30 88 30 78 Z"
        fill={jerseyColor}
        stroke="#1a1a1a"
        strokeWidth="0.5"
      />

      {/* Jersey sleeves/shoulders */}
      <ellipse cx="32" cy="38" rx="2" ry="4" fill={jerseyColor} />
      <ellipse cx="68" cy="38" rx="2" ry="4" fill={jerseyColor} />

      {/* Jersey number - large and visible */}
      <g>
        <text
          x="50"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="900"
          fill={pantsColor}
          stroke="#1a1a1a"
          strokeWidth="0.3"
          fontFamily="Arial, sans-serif"
          letterSpacing="2"
        >
          23
        </text>
      </g>

      {/* Sleeve stripes */}
      <line x1="30" y1="35" x2="30" y2="55" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
      <line x1="70" y1="35" x2="70" y2="55" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />

      {/* Pants - realistic length (longer) */}
      <path
        d="M 35 78 L 48 78 L 46 128 L 37 128 Z"
        fill={pantsColor}
        stroke="#1a1a1a"
        strokeWidth="0.5"
      />
      <path
        d="M 52 78 L 65 78 L 64 128 L 54 128 Z"
        fill={pantsColor}
        stroke="#1a1a1a"
        strokeWidth="0.5"
      />

      {/* Pants stripes - center stripe */}
      <line x1="50" y1="78" x2="50" y2="128" stroke={accentColor} strokeWidth="1.2" opacity="0.7" />

      {/* Pants side stripes */}
      <line x1="38" y1="78" x2="37" y2="128" stroke={accentColor} strokeWidth="0.8" opacity="0.5" />
      <line x1="62" y1="78" x2="63" y2="128" stroke={accentColor} strokeWidth="0.8" opacity="0.5" />

      {/* Shoes */}
      <ellipse cx="41" cy="130" rx="3" ry="2" fill="#1a1a1a" />
      <ellipse cx="59" cy="130" rx="3" ry="2" fill="#1a1a1a" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shirt className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-bold">Uniforms</h2>
      </div>

      {/* Compact uniform display */}
      <div className="grid grid-cols-3 gap-2">
        {uniformTypes.map(({ key, label }) => {
          const uniform = team.uniforms?.[key];
          if (!uniform) return null;

          return (
            <div key={key} className="bg-zinc-800 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-zinc-300 mb-2">{label}</div>
              <div className="h-24 w-12 mx-auto mb-2">
                <UniformRenderer
                  jerseyColor={uniform.primary}
                  pantsColor={uniform.secondary}
                  helmetColor={uniform.primary}
                  accentColor={uniform.secondary}
                />
              </div>
              <div className="flex gap-2 justify-center">
                <div
                  className="w-6 h-6 rounded border border-zinc-600 flex-shrink-0"
                  style={{ backgroundColor: uniform.primary }}
                  title="Jersey color"
                />
                {uniform.secondary && uniform.secondary !== uniform.primary && (
                  <div
                    className="w-6 h-6 rounded border border-zinc-600 flex-shrink-0"
                    style={{ backgroundColor: uniform.secondary }}
                    title="Pants/accent color"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
