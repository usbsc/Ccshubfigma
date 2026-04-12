import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Clock,
  Zap,
  Star,
  ChevronRight,
  Award,
  Search,
  ExternalLink,
} from "lucide-react";
import { games } from "../data/games";
import { teams } from "../data/teams";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useAutoUpdate } from "../hooks/useAutoUpdate";
import { useNfhsCifccsBroadcasts } from "../hooks/useNfhsCifccsBroadcasts";
import { ImageWithFallback } from "./common/ImageWithFallback";
import { UPDATE_INTERVALS, DISPLAY_LIMITS } from "../constants";
import { homeTeamStorage } from "../services/storage";
import { googleMapsSearchUrl } from "../utils/maps";

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const homeTeam = homeTeamStorage.get();
  useAutoUpdate(UPDATE_INTERVALS.SCORES);

  const [teamQuery, setTeamQuery] = useState("");
  const [divisionLeagueQuery, setDivisionLeagueQuery] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveGames = games.filter((g) => g.status === "live");
  const upcomingGames = games
    .filter((g) => g.status === "upcoming")
    .slice(0, DISPLAY_LIMITS.UPCOMING_GAMES);

  const homeTeamGames = homeTeam
    ? games.filter((g) => g.homeTeam === homeTeam || g.awayTeam === homeTeam)
    : [];

  const getTeam = (id: string) => teamById.get(id);

  const baseBroadcastGames = liveGames.length > 0 ? liveGames : upcomingGames;

  const {
    broadcasts: nfhsBroadcasts,
    loading: nfhsLoading,
    error: nfhsError,
    lastUpdated: nfhsLastUpdated,
  } = useNfhsCifccsBroadcasts();

  const filteredNfhsBroadcasts = useMemo(() => {
    const tq = teamQuery.trim().toLowerCase();
    const dlq = divisionLeagueQuery.trim().toLowerCase();

    return nfhsBroadcasts
      .filter((b) => {
        const haystack =
          `${b.title} ${b.publisherName ?? ""} ${b.publisherSlug ?? ""}`.toLowerCase();
        const matchesTeam = tq.length === 0 || haystack.includes(tq);
        const matchesDivisionLeague = dlq.length === 0 || haystack.includes(dlq);
        return matchesTeam && matchesDivisionLeague;
      })
      .slice(0, 6);
  }, [divisionLeagueQuery, nfhsBroadcasts, teamQuery]);

  const broadcastGames = useMemo(() => {
    const tq = teamQuery.trim().toLowerCase();
    const dlq = divisionLeagueQuery.trim().toLowerCase();

    return baseBroadcastGames.filter((game) => {
      const home = teamById.get(game.homeTeam);
      const away = teamById.get(game.awayTeam);

      const teamHaystack = `${home?.name ?? ""} ${home?.mascot ?? ""} ${away?.name ?? ""} ${
        away?.mascot ?? ""
      }`.toLowerCase();
      const matchesTeam = tq.length === 0 || teamHaystack.includes(tq);

      const divisionLeagueHaystack = `${home?.division ?? ""} ${home?.league ?? ""} ${
        away?.division ?? ""
      } ${away?.league ?? ""}`.toLowerCase();
      const matchesDivisionLeague = dlq.length === 0 || divisionLeagueHaystack.includes(dlq);

      return matchesTeam && matchesDivisionLeague;
    });
  }, [
    baseBroadcastGames,
    divisionLeagueQuery,
    teamById,
    teamQuery,
  ]);
  const topRankedTeams = [...teams]
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, DISPLAY_LIMITS.TOP_RANKED_TEAMS);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              Season 2025-26 Countdown
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black mb-4 text-white leading-[0.85] tracking-tighter uppercase">
              CCS <br />
              <span className="text-blue-500 italic font-black">HUB</span>
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-zinc-300 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                {currentTime.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </span>
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                          <span className="text-[10px] font-bold text-blue-200 tracking-wide">
                            {game.status} • {game.level}
                          </span>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover/card:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 overflow-hidden border-2 border-white/20">
                            <ImageWithFallback
                              src={opponent?.image}
                              className="w-full h-full object-contain"
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300 font-bold uppercase tracking-tight">
                              vs {opponent?.name}
                            </p>
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

      {/* Games Near You Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-800/50 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-black mb-2 flex items-center gap-3 text-white">
              <MapPin className="w-6 h-6 text-green-400" />
              Games Near You
            </h2>
            <p className="text-sm text-zinc-300">Find football games in your area</p>
          </div>

          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-green-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by city or zip code..."
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="w-full bg-zinc-950 border border-green-800/50 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all shadow-xl"
              aria-label="Search games by location"
            />
          </div>

          {userLocation.trim().length > 0 && (
            <div className="mt-6 text-sm text-zinc-400">
              <p>Games near <span className="font-bold text-green-300">{userLocation}</span> would appear here</p>
              <p className="text-xs mt-2 text-zinc-500">(Location-based filtering coming soon)</p>
            </div>
          )}
        </div>
      </motion.section>

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
              <Link
                to="/schedule"
                className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 group"
              >
                Full Schedule{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search team..."
                  value={teamQuery}
                  onChange={(e) => setTeamQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-xl"
                  aria-label="Search broadcasts by team"
                />
              </div>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search division or league..."
                  value={divisionLeagueQuery}
                  onChange={(e) => setDivisionLeagueQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-xl"
                  aria-label="Search broadcasts by division or league"
                />
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 mb-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    NFHS Network • CIFCCS
                  </div>
                  <div className="text-sm font-bold text-zinc-200">Recent football broadcasts</div>
                </div>
                {nfhsLastUpdated ? (
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                    Updated{" "}
                    {nfhsLastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                ) : null}
              </div>

              {nfhsLoading ? (
                <div className="text-sm text-zinc-400">Loading NFHS broadcasts…</div>
              ) : nfhsError ? (
                <div className="text-sm text-zinc-400">
                  NFHS broadcasts unavailable: {nfhsError}
                </div>
              ) : filteredNfhsBroadcasts.length === 0 ? (
                <div className="text-sm text-zinc-400">
                  No NFHS broadcasts found for your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredNfhsBroadcasts.map((b) => (
                    <a
                      key={b.id}
                      href={b.pageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-950/60 p-4 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-black text-white uppercase tracking-tight truncate">
                            {b.title}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                            {new Date(b.startTime).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                            {b.publisherName ? (
                              <span className="text-zinc-600"> • {b.publisherName}</span>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {b.paymentRequired ? (
                            <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                              SUB
                            </span>
                          ) : null}
                          {b.status === "live" ? (
                            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                              LIVE
                            </span>
                          ) : null}
                          <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">
              Showing {broadcastGames.length} of {baseBroadcastGames.length}
            </div>

            {broadcastGames.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {broadcastGames.map((game) => {
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
                                <ImageWithFallback
                                  src={away?.image}
                                  className="w-full h-full object-contain"
                                  alt=""
                                />
                              </div>
                              <span className="font-bold text-lg truncate pr-4 text-zinc-100 uppercase tracking-tight">
                                {away?.name || "Away Team"}
                              </span>
                            </div>
                            <span className="text-2xl font-black text-white">{game.awayScore}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 p-1">
                                <ImageWithFallback
                                  src={home?.image}
                                  className="w-full h-full object-contain"
                                  alt=""
                                />
                              </div>
                              <span className="font-bold text-lg truncate pr-4 text-zinc-100 uppercase tracking-tight">
                                {home?.name || "Home Team"}
                              </span>
                            </div>
                            <span className="text-2xl font-black text-white">{game.homeScore}</span>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between text-[10px] font-bold text-zinc-500 tracking-wide">
                          <span className="flex items-center gap-1.5 uppercase">
                            <MapPin className="w-3 h-3" />
                            <a
                              href={googleMapsSearchUrl(
                                `${game.stadium} ${home?.name ?? ""} ${away?.name ?? ""}`.trim()
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                              title="Open in Google Maps"
                            >
                              {game.stadium}
                            </a>
                          </span>
                          <span className="flex items-center gap-1.5 uppercase">
                            <Users className="w-3 h-3" /> {game.attendance?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </section>

          {/* Featured Player Spotlight */}
          <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors"></div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-zinc-800 group-hover:ring-blue-600/20 transition-all">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=400&h=400&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Michael Mitchell Jr."
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black mb-4 tracking-tight">
                  <Star className="w-3 h-3 fill-blue-400" /> Player of the Week
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">
                  Michael Mitchell Jr.
                </h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-medium">
                  The Archbishop Riordan standout quarterback led the Crusaders to a historic start,
                  demonstrating elite dual-threat capabilities and leadership on and off the field.
                </p>
                <Link
                  to="/players"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-zinc-800 hover:bg-blue-600 px-6 py-2.5 rounded-xl transition-all shadow-lg border border-white/5"
                >
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
                      <ImageWithFallback
                        src={team.image}
                        className="w-full h-full object-contain"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:translate-x-1 transition-transform uppercase tracking-tight truncate">
                        {team.name}
                      </div>
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest truncate">
                        <span className="line-clamp-1">
                          {team.record.wins}-{team.record.losses} • {team.division}
                        </span>
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
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">
                  Total Games Played
                </p>
                <p className="text-2xl font-black text-white">482</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">
                  Average PPG
                </p>
                <p className="text-2xl font-black text-white">32.4</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}
