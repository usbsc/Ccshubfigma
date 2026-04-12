import { Award, TrendingUp, Search, Star, X } from "lucide-react";
import { players, Player } from "../data/players.maxpreps";
import { teams } from "../data/teams";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { ImageWithFallback } from "./common/ImageWithFallback";

export function Players() {
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [searchQuery, setSearchTerm] = useState("");
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), []);

  const positions = useMemo(() => {
    const set = new Set<string>();
    for (const p of players) set.add(p.position);
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredPlayers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return players.filter((p) => {
      const matchesPosition = selectedPosition === "all" || p.position === selectedPosition;
      const matchesTeam = selectedTeam === "all" || p.team === selectedTeam;
      const teamName = (teamById.get(p.team)?.name || "").toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        teamName.includes(q);
      return matchesPosition && matchesTeam && matchesSearch;
    });
  }, [selectedPosition, selectedTeam, searchQuery, teamById]);

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
          Discover the top athletes competing in the Central Coast Section.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search players by name or team..."
            value={searchQuery}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-zinc-400 mb-2">
              Position
            </label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos} className="bg-zinc-950">
                  {pos === "all" ? "All Positions" : pos}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-zinc-400 mb-2">
              Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
            >
              <option value="all" className="bg-zinc-950">
                All Teams
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id} className="bg-zinc-950">
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-zinc-400">
          {filteredPlayers.length} {filteredPlayers.length === 1 ? "player" : "players"} found
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredPlayers.map((player, idx) => {
              const team = teamById.get(player.team);
              return (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActivePlayer(activePlayer?.id === player.id ? null : player)}
                  className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-purple-500 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                          {player.name}
                        </h3>
                        <p className="text-sm text-purple-400 font-semibold">
                          {player.position}
                        </p>
                      </div>
                      {player.number !== null && (
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-purple-400">#{player.number}</span>
                        </div>
                      )}
                    </div>

                    {/* Team Info */}
                    {team && (
                      <div className="flex items-center gap-2 pt-2 border-t border-zinc-700">
                        {team.logoUrl && (
                          <ImageWithFallback
                            src={team.logoUrl}
                            alt={team.name}
                            className="w-6 h-6 rounded"
                          />
                        )}
                        <span className="text-sm text-zinc-400">{team.name}</span>
                      </div>
                    )}

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {activePlayer?.id === player.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 pt-3 border-t border-zinc-700"
                        >
                          {player.grade && (
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-500">Grade:</span>
                              <span className="text-white font-medium">{player.grade}</span>
                            </div>
                          )}
                          {player.height && (
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-500">Height:</span>
                              <span className="text-white font-medium">{player.height}</span>
                            </div>
                          )}
                          {player.weight && (
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-500">Weight:</span>
                              <span className="text-white font-medium">{player.weight} lbs</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-2xl p-12 text-center"
          >
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-50" />
            <p className="text-zinc-400">
              No players match your search criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
