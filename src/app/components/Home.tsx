import { Link } from "react-router";
import { Calendar, MapPin, Users, TrendingUp, Clock, Zap, Star, ChevronRight, Award } from "lucide-react";
import { games } from "../data/games";
import { teams } from "../data/teams";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useAutoUpdate } from "../hooks/useAutoUpdate";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const homeTeam = localStorage.getItem("homeTeam");
  const lastUpdate = useAutoUpdate(60000); 

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveGames = games.filter((g) => g.status === "live");
  const upcomingGames = games.filter((g) => g.status === "upcoming").slice(0, 4);
  const recentGames = games.filter((g) => g.status === "final").slice(0, 3);

  const homeTeamGames = homeTeam
    ? games.filter((g) => g.homeTeam === homeTeam || g.awayTeam === homeTeam)
    : [];

  const getTeam = (id: string) => teams.find((t) => t.id === id);
  const topRankedTeams = [...teams].sort((a, b) => a.ranking - b.ranking).slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-20"
    >
      {/* Dynamic Hero Section */}
      <section className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1663563624897-de8972d7ce93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwZm9vdGJhbGwlMjBnYW1lJTIwbmlnaHR8ZW58MXx8fHwxNzc0MDU1MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Football game"
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

        {/* Live Ticker */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="bg-blue-600/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/10">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">Season 2025-26 Countdown</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black mb-4 text-white leading-[0.85] tracking-tighter uppercase">
              CCS <br/><span className="text-blue-500 italic font-black">HUB</span>
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-zinc-300 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                {currentTime.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </span>
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="bg-zinc-800/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-blue-400 border border-zinc-700">
                Off-Season
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Priority Home Team Section */}
      {homeTeam && (
        <motion.section variants={itemVariants} className="relative">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-xl shadow-blue-900/20 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Star className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white tracking-tight">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Your Team Portal: {getTeam(homeTeam)?.name}
              </h2>

              {homeTeamGames.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {homeTeamGames.slice(0, 2).map((game) => {
                    const opponentId = game.homeTeam === homeTeam ? game.awayTeam : game.homeTeam;
                    const opponent = getTeam(opponentId);
                    return (
                      <Link
                        key={game.id}
                        to={`/game/${game.id}`}
                        className="bg-zinc-950/40 hover:bg-zinc-950/60 backdrop-blur-md rounded-2xl p-5 transition-all border border-white/10 group/card"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-blue-200 tracking-wide">{game.status} • {game.level}</span>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover/card:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 overflow-hidden border-2 border-white/20">
                            <ImageWithFallback src={opponent?.image} className="w-full h-full object-contain" alt="" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300 font-bold uppercase tracking-tight">vs {opponent?.name}</p>
                            <p className="text-2xl font-black text-white">
                              {game.homeScore} - {game.awayScore}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-blue-100 font-medium">No recent games found for your team.</p>
              )}
            </div>
          </div>
        </motion.section>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Live/Upcoming Games */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                {liveGames.length > 0 ? "Live Broadcasts" : "Upcoming Matches"}
              </h2>
              <Link to="/schedule" className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group">
                Full Schedule <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {(liveGames.length > 0 ? liveGames : upcomingGames).map((game) => {
                const home = getTeam(game.homeTeam);
                const away = getTeam(game.awayTeam);
                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="group relative bg-zinc-900 hover:bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-[0.98]"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                          {game.level} • {game.time}
                        </span>
                        {game.status === "live" && (
                          <span className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 p-1">
                              <ImageWithFallback src={away?.image} className="w-full h-full object-contain" alt="" />
                            </div>
                            <span className="font-bold text-lg truncate pr-4 text-zinc-100 uppercase tracking-tight">{away?.name || "Away Team"}</span>
                          </div>
                          <span className="text-2xl font-black text-white">{game.awayScore}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 p-1">
                              <ImageWithFallback src={home?.image} className="w-full h-full object-contain" alt="" />
                            </div>
                            <span className="font-bold text-lg truncate pr-4 text-zinc-100 uppercase tracking-tight">{home?.name || "Home Team"}</span>
                          </div>
                          <span className="text-2xl font-black text-white">{game.homeScore}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between text-[10px] font-bold text-zinc-500 tracking-wide">
                        <span className="flex items-center gap-1.5 uppercase"><MapPin className="w-3 h-3" /> {game.stadium}</span>
                        <span className="flex items-center gap-1.5 uppercase"><Users className="w-3 h-3" /> {game.attendance?.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured Player Spotlight */}
          <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-zinc-800 group-hover:ring-blue-600/20 transition-all">
                <img src="https://images.unsplash.com/photo-1568540825978-73021c06dad6?q=80&w=400&h=400&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black mb-4 tracking-tight">
                  <Star className="w-3 h-3 fill-blue-400" /> Player of the Week
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Jake Morrison</h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-medium">
                  The Bellarmine senior quarterback led his team to a stunning 28-24 victory, throwing for 315 yards and 3 touchdowns in the championship game.
                </p>
                <Link to="/players" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-zinc-800 hover:bg-blue-600 px-6 py-2.5 rounded-xl transition-all shadow-lg border border-white/5">
                  View Player Profile
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <aside className="space-y-12">
          {/* Top Power Rankings */}
          <section>
            <h2 className="text-2xl font-black mb-8 tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Power Top 5
            </h2>
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
              {topRankedTeams.map((team, idx) => (
                <Link
                  key={team.id}
                  to={`/team/${team.id}`}
                  className="flex items-center gap-4 p-5 hover:bg-zinc-800/50 transition-all border-b border-zinc-800/50 last:border-0 group"
                >
                  <div className="text-2xl font-black text-zinc-700 group-hover:text-blue-500 transition-colors w-6">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 p-1 flex-shrink-0">
                      <ImageWithFallback src={team.image} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:translate-x-1 transition-transform uppercase tracking-tight truncate">{team.name}</div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {team.record.wins}-{team.record.losses} • {team.division}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500" />
                </Link>
              ))}
              <Link
                to="/rankings"
                className="block p-5 text-center text-[10px] font-black text-zinc-400 hover:text-white transition-colors bg-zinc-950/50 uppercase tracking-[0.2em]"
              >
                View Full Rankings
              </Link>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-blue-600 rounded-3xl p-6 shadow-xl shadow-blue-900/20 border border-white/10">
            <h3 className="text-white font-black text-lg mb-4 tracking-tight">SEASON RECAP</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Total Games Played</p>
                <p className="text-2xl font-black text-white">482</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Average PPG</p>
                <p className="text-2xl font-black text-white">32.4</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}
