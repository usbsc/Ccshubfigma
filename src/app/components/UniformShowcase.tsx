import React from "react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
    >
      <div className="flex items-center gap-3 mb-8">
        <Shirt className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold">Uniforms</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {uniformTypes.map(({ key, label }) => {
          const uniform = team.uniforms?.[key];
          if (!uniform) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center"
            >
              {/* Uniform Card */}
              <div className="w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700 hover:border-blue-500 transition-colors">
                {/* Helmet */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Helmet shell */}
                      <ellipse
                        cx="50"
                        cy="45"
                        rx="35"
                        ry="38"
                        fill={uniform.primary}
                        stroke="#000"
                        strokeWidth="1"
                      />
                      {/* Facemask */}
                      <path
                        d="M 35 45 Q 35 70 50 75 Q 65 70 65 45"
                        fill="none"
                        stroke="#444"
                        strokeWidth="2"
                      />
                      {/* Stripe/Logo accent */}
                      <path
                        d="M 48 20 L 52 20 L 52 60 L 48 60 Z"
                        fill={uniform.secondary}
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>

                {/* Jersey & Pants */}
                <div className="flex justify-center mb-6 h-32">
                  <svg
                    viewBox="0 0 80 160"
                    className="w-20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Jersey */}
                    <path
                      d="M 20 20 L 30 20 L 30 40 L 50 40 L 50 20 L 60 20 L 60 80 Q 60 95 40 95 Q 20 95 20 80 Z"
                      fill={uniform.primary}
                      stroke="#000"
                      strokeWidth="0.5"
                    />

                    {/* Jersey Number (styled) */}
                    <text
                      x="40"
                      y="65"
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="bold"
                      fill={uniform.secondary}
                      stroke="#000"
                      strokeWidth="0.3"
                    >
                      23
                    </text>

                    {/* Sleeve accent */}
                    <rect
                      x="18"
                      y="30"
                      width="4"
                      height="25"
                      fill={uniform.secondary}
                      opacity="0.6"
                    />
                    <rect
                      x="58"
                      y="30"
                      width="4"
                      height="25"
                      fill={uniform.secondary}
                      opacity="0.6"
                    />

                    {/* Pants */}
                    <path
                      d="M 28 90 L 52 90 L 50 150 L 30 150 Z"
                      fill={uniform.secondary}
                      stroke="#000"
                      strokeWidth="0.5"
                    />

                    {/* Pants stripe */}
                    <line
                      x1="40"
                      y1="90"
                      x2="40"
                      y2="150"
                      stroke={uniform.primary}
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  </svg>
                </div>

                {/* Label */}
                <h3 className="text-center font-bold text-lg text-white mb-3">
                  {label}
                </h3>

                {/* Colors */}
                <div className="space-y-3 border-t border-zinc-700 pt-4">
                  {/* Primary Color */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg border-2 border-zinc-600 shadow-lg flex-shrink-0"
                      style={{ backgroundColor: uniform.primary }}
                      title="Jersey color"
                    />
                    <div className="text-sm">
                      <div className="text-xs text-zinc-500">Jersey</div>
                      <div className="font-mono text-white text-xs">
                        {uniform.primary}
                      </div>
                    </div>
                  </div>

                  {/* Secondary Color */}
                  {uniform.secondary && uniform.secondary !== uniform.primary && (
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-zinc-600 shadow-lg flex-shrink-0"
                        style={{ backgroundColor: uniform.secondary }}
                        title="Pants/accent color"
                      />
                      <div className="text-sm">
                        <div className="text-xs text-zinc-500">Pants/Accent</div>
                        <div className="font-mono text-white text-xs">
                          {uniform.secondary}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {uniform.description && (
                  <p className="text-xs text-zinc-400 italic mt-4 pt-4 border-t border-zinc-700">
                    {uniform.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
        <p className="text-center">
          Uniform designs show jersey colors, pants, helmet, and accent stripes based on team color schemes.
        </p>
      </div>
    </motion.div>
  );
}
