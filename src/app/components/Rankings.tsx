import { Link } from "react-router";
import { Trophy, TrendingUp, TrendingDown, Minus, Search, Filter, ArrowRight } from "lucide-react";
import { teams } from "../data/teams";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Rankings() {
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [searchQuery, setSearchTerm] = useState("");

  const divisions = ["all", "Division I", "Division II", "Division III"];

  const filteredTeams = teams.filter((t) => {
    const matchesDivision = selectedDivision === "all" || t.division === selectedDivision;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.mascot.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  const sortedTeams = [...filteredTeams].sort((a, b) => a.ranking - b.ranking);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header with Background */}
      <div className="relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1663563624897-de8972d7ce93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwZm9vdGJhbGwlMjBnYW1lJTIwbmlnaHR8ZW58MXx8fHwxNzc0MDU1MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Football"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent"></div>
        </div>

        <div className="relative p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white mb-2">
              <Trophy className="w-3 h-3 fill-white" /> 2025-2026 Rankings
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              CCS POWER <br/><span className="text-blue-500">INDEX</span>
            </h1>
            <p className="text-zinc-400 text-sm font-medium max-w-md">
              Real-time performance metrics synchronized with official CIF, MaxPreps, and CalPreps data.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search school or mascot..."
                value={searchQuery}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
          {divisions.map((division) => (
            <button
              key={division}
              onClick={() => setSelectedDivision(division)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border ${
                selectedDivision === division
                  ? "bg-white text-zinc-950 border-white shadow-lg"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              {division === "all" ? "All Divisions" : division}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
          <Filter className="w-3 h-3" /> Showing {sortedTeams.length} Teams
        </div>
      </div>

      {/* Rankings Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-zinc-800 shadow-xl"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-6 border-b border-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-900/80">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">School Program</div>
          <div className="col-span-2 text-center">Record</div>
          <div className="col-span-2 text-center">Division</div>
          <div className="col-span-2 text-right">Trend</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-zinc-800/50">
          <AnimatePresence mode="popLayout">
            {sortedTeams.map((team, idx) => {
              const trend = team.ranking <= 3 ? "up" : team.ranking <= 10 ? "same" : "down";
              return (
                <motion.div
                  key={team.id}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <Link
                    to={`/team/${team.id}`}
                    className="grid grid-cols-12 gap-4 px-6 md:px-8 py-6 hover:bg-blue-600/5 transition-all items-center"
                  >
                    {/* Rank */}
                    <div className="col-span-2 md:col-span-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                        team.ranking <= 3
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 rotate-3"
                          : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                      }`}>
                        {team.ranking}
                      </div>
                    </div>

                    {/* Team */}
                    <div className="col-span-7 md:col-span-5 flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0">
                        <img
                          src={team.image}
                          alt={team.name}
                          className="w-full h-full rounded-xl object-cover border-2 border-zinc-800 group-hover:border-blue-500/50 transition-all shadow-md"
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-white group-hover:text-blue-400 transition-colors truncate uppercase tracking-tight">{team.name}</div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">
                          {team.mascot} • {team.league}
                        </div>
                      </div>
                    </div>

                    {/* Record (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center">
                      <div className="font-black text-xl text-white tracking-tighter">
                        {team.record.wins}-{team.record.losses}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase">
                        {((team.record.wins / (team.record.wins + team.record.losses)) * 100).toFixed(0)}% Win Rate
                      </div>
                    </div>

                    {/* Division (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center">
                      <span className="bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-zinc-700">
                        {team.division}
                      </span>
                    </div>

                    {/* Trend & Action */}
                    <div className="col-span-3 md:col-span-2 flex flex-col items-end gap-1">
                      {trend === "up" && (
                        <div className="flex items-center gap-1.5 text-green-500">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase hidden md:inline">Rising</span>
                        </div>
                      )}
                      {trend === "down" && (
                        <div className="flex items-center gap-1.5 text-red-500">
                          <TrendingDown className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase hidden md:inline">Falling</span>
                        </div>
                      )}
                      {trend === "same" && (
                        <div className="flex items-center gap-1.5 text-zinc-600">
                          <Minus className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase hidden md:inline">Steady</span>
                        </div>
                      )}
                      <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {sortedTeams.length === 0 && (
            <div className="p-20 text-center">
              <Search className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-xl font-black text-white uppercase tracking-widest">No matching teams</h3>
              <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or division filters.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Summary - Polished */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Schools", value: teams.length, icon: Trophy },
          { label: "Elite (DI)", value: teams.filter((t) => t.division === "Division I").length, icon: Star },
          { label: "Competitive (DII)", value: teams.filter((t) => t.division === "Division II").length, icon: TrendingUp },
          { label: "Emerging (DIII)", value: teams.filter((t) => t.division === "Division III").length, icon: Target },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
            className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-800 shadow-lg group hover:border-blue-500/30 transition-colors"
          >
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 group-hover:text-blue-400 transition-colors">{stat.label}</div>
            <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}