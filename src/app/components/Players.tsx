import { Award } from "lucide-react";
import { motion } from "motion/react";

export function Players() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Players</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          No player data available at this time.
        </p>
      </motion.div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-2xl p-12 text-center"
      >
        <Award className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
        <p className="text-zinc-400 text-lg">
          Player roster data will be available soon.
        </p>
      </motion.div>
    </div>
  );
}
