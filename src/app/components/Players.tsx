import { Link } from "react-router";
import { Award, TrendingUp, User, Search, ChevronRight, Star, X } from "lucide-react";
import { players, Player } from "../data/players";
import { teams } from "../data/teams";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Players() {
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [searchQuery, setSearchTerm] = useState("");
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  const positions = ["all", "QB", "RB", "WR", "TE", "LB", "DB", "OL", "DL"];

  const filteredPlayers = players.filter((p) => {
    const matchesPosition = selectedPosition === "all" || p.position === selectedPosition;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1568540825978-73021c06dad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGZvb3RiYWxsJTIwcGxheWVyJTIwYWN0aW9ufGVufDF8fHx8MTc3Mzk0MzYzMHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Player"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/40 to-transparent"></div>
        </div>

        <div className="relative p-10 md:p-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white mb-4">
              <Star className="w-3 h-3 fill-white" /> Elite Athletes
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.85] mb-4">
              Player <br/><span className="text-orange-500 font-black">Database</span>
            </h1>
            <p className="text-zinc-400 text-sm font-medium max-w-sm">
              In-depth profiles and statistical performance metrics for top section standouts.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search athlete name..."
                value={searchQuery}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setSelectedPosition(pos)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all whitespace-nowrap border ${
              selectedPosition === pos
                ? "bg-white text-zinc-950 border-white shadow-lg"
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"
            }`}
          >
            {pos === "all" ? "All Positions" : pos}
          </button>
        ))}
      </div>

      {/* Player Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPlayers.map((player) => {
            const team = getTeam(player.team);
            return (
              <motion.div
                key={player.id}
                variants={itemVariants}
                layout
                onClick={() => setActivePlayer(player)}
                className="group relative bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 active:scale-[0.98] cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>

                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/40 rotate-3">
                      <span className="text-2xl font-black text-white">#{player.number}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{player.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="bg-white text-zinc-950 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        {player.position}
                      </span>
                      <span className="text-zinc-300 text-xs font-bold tracking-widest">Grade {player.grade}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <img
                      src={team?.image}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover border-2 border-zinc-800"
                    />
                    <div>
                      <div className="font-bold text-sm text-white uppercase tracking-tight">{team?.name}</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{team?.mascot}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
                      <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Height</div>
                      <div className="font-black text-white">{player.height}</div>
                    </div>
                    <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
                      <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Weight</div>
                      <div className="font-black text-white">{player.weight} lbs</div>
                    </div>
                  </div>

                  {/* Stats Overview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
                      <div className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-orange-500" /> Season Impact</div>
                      <div>{player.stats.games} Games</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(player.stats)
                        .filter(([key]) => key !== "games")
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-end border-b border-zinc-800 pb-2">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">{key}</span>
                            <span className="font-black text-orange-500">{value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Player Detail Modal */}
      <AnimatePresence>
        {activePlayer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePlayer(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setActivePlayer(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-zinc-950/50 hover:bg-zinc-800 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative h-80 md:h-auto">
                  <img src={activePlayer.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="bg-orange-600 inline-block px-4 py-1 rounded-lg font-black text-white text-xl mb-2 italic">#{activePlayer.number}</div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase">{activePlayer.name}</h2>
                  </div>
                </div>

                <div className="p-10 space-y-8">
                  <div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Core Attributes</div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                        <div className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Position</div>
                        <div className="font-black text-white">{activePlayer.position} {activePlayer.subPosition && `• ${activePlayer.subPosition}`}</div>
                      </div>
                      <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                        <div className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Class</div>
                        <div className="font-black text-white">Grade {activePlayer.grade}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Complete Statistics</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 bg-zinc-950/50 p-8 rounded-3xl border border-zinc-800/50">
                      {Object.entries(activePlayer.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-[10px] font-bold text-zinc-600 uppercase mb-1">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-xl font-black text-orange-500">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activePlayer.highlights && (
                    <div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Scouting Notes</div>
                      <div className="space-y-2">
                        {activePlayer.highlights.map((h, i) => (
                          <div key={i} className="flex gap-3 text-zinc-300 text-sm leading-relaxed">
                            <Star className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Leaderboard Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 rounded-[2.5rem] p-10 border border-zinc-800"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" /> Statistical Leaders
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { pos: "QB", label: "Passing Yards", color: "text-blue-500" },
            { pos: "RB", label: "Rushing Yards", color: "text-green-500" },
            { pos: "WR", label: "Receiving Yards", color: "text-purple-500" }
          ].map((leaderGroup) => (
            <div key={leaderGroup.pos}>
              <h3 className={`font-black text-xs uppercase tracking-[0.2em] mb-6 ${leaderGroup.color}`}>{leaderGroup.label}</h3>
              <div className="space-y-4">
                {players
                  .filter((p) => p.position === leaderGroup.pos)
                  .sort((a, b) => (b.stats.yards as number) - (a.stats.yards as number))
                  .slice(0, 3)
                  .map((player, idx) => (
                    <div key={player.id} className="flex items-center gap-4 bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer" onClick={() => setActivePlayer(player)}>
                      <div className="text-xl font-black text-zinc-800 w-4">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm text-white truncate uppercase">{player.name}</div>
                        <div className="text-[10px] font-bold text-zinc-600 truncate uppercase">{getTeam(player.team)?.name}</div>
                      </div>
                      <div className={`font-black ${leaderGroup.color}`}>{player.stats.yards}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
