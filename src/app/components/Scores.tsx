import { Link } from "react-router";
import { Award, MapPin, Users, ChevronRight, Filter } from "lucide-react";
import {
  DEFAULT_GAMES_YEAR,
  GAME_YEARS,
  gamesByYear,
  seasonLabel,
  type GameYear,
} from "../data/games";
import { teams } from "../data/teams";
import { useState } from "react";
import { ImageWithFallback } from "./common/ImageWithFallback";

export function Scores() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<GameYear>(DEFAULT_GAMES_YEAR);

  const games = gamesByYear[selectedYear] ?? [];

  const levels = ["all", "Varsity", "JV", "Freshman"];

  const filteredGames =
    selectedLevel === "all" ? games : games.filter((g) => g.level === selectedLevel);

  const finalGames = filteredGames
    .filter((g) => g.status === "final")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  // Group games by date
  const gamesByDate = finalGames.reduce(
    (acc, game) => {
      const date = new Date(game.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(game);
      return acc;
    },
    {} as Record<string, typeof finalGames>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1663563624897-de8972d7ce93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwc2Nob29sJTIwZm9vdGJhbGwlMjBnYW1lJTIwbmlnaHR8ZW58MXx8fHwxNzc0MDU1MjU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Football"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-transparent"></div>
        </div>

        <div className="relative p-10 md:p-16">
          <div className="inline-flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white mb-4">
            <Award className="w-3 h-3 fill-white" /> {seasonLabel(selectedYear)} Season Archive
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.85] mb-4">
            Game <br />
            <span className="text-purple-500 font-black">Scores</span>
          </h1>
          <p className="text-zinc-400 text-sm font-medium max-w-sm">
            Complete results archive including box scores, attendance, and key performance
            highlights.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full pb-2 md:pb-0">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all whitespace-nowrap border ${
                selectedLevel === level
                  ? "bg-white text-zinc-950 border-white shadow-lg"
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              }`}
            >
              {level === "all" ? "All Levels" : level}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as GameYear)}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold"
            aria-label="Select season"
          >
            {[...GAME_YEARS].reverse().map((y) => (
              <option key={y} value={y}>
                {seasonLabel(y)}
              </option>
            ))}
          </select>

          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-3 h-3" /> Showing {finalGames.length} Results
          </div>
        </div>
      </div>

      {/* Results by Date */}
      <section className="space-y-12">
        {finalGames.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-zinc-400">
            No final scores loaded for {seasonLabel(selectedYear)} yet.
          </div>
        ) : null}

        {Object.entries(gamesByDate).map(([date, dateGames]) => (
          <div key={date} className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black text-purple-500 uppercase tracking-[0.3em] whitespace-nowrap">
                {date}
              </h3>
              <div className="h-[1px] w-full bg-zinc-800/50"></div>
            </div>

            <div className="grid gap-6">
              {dateGames.map((game) => {
                const home = getTeam(game.homeTeam);
                const away = getTeam(game.awayTeam);
                const awayWon = game.awayScore > game.homeScore;
                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 transition-all"
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {game.level} • FINAL
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase">
                          <MapPin className="w-3 h-3 text-red-500" /> {game.stadium}
                        </span>
                        {game.attendance && (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase">
                            <Users className="w-3 h-3" /> {game.attendance.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8 md:gap-12">
                      {/* Away Team */}
                      <div
                        className={`flex items-center gap-6 ${awayWon ? "opacity-100" : "opacity-40"}`}
                      >
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 p-2 border-2 border-zinc-800">
                            <ImageWithFallback
                              src={away?.image}
                              className="w-full h-full object-contain"
                              alt=""
                            />
                          </div>
                          {awayWon && (
                            <Award className="absolute -top-2 -left-2 w-6 h-6 text-yellow-500 bg-zinc-900 rounded-full p-1 border border-zinc-800" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-xl text-white uppercase tracking-tight leading-none mb-1">
                            {away?.name || "Away"}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {away?.mascot || "Mascot"}
                          </div>
                        </div>
                        <div className="text-4xl font-black text-white tabular-nums">
                          {game.awayScore}
                        </div>
                      </div>

                      <div className="hidden md:block text-[10px] font-black text-zinc-800 uppercase italic">
                        FINAL
                      </div>

                      {/* Home Team */}
                      <div
                        className={`flex items-center gap-6 flex-row-reverse md:flex-row ${!awayWon ? "opacity-100" : "opacity-40"}`}
                      >
                        <div className="text-4xl font-black text-white tabular-nums">
                          {game.homeScore}
                        </div>
                        <div className="flex-1 text-right md:text-left">
                          <div className="font-black text-xl text-white uppercase tracking-tight leading-none mb-1">
                            {home?.name || "Home"}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {home?.mascot || "Mascot"}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 p-2 border-2 border-zinc-800">
                            <ImageWithFallback
                              src={home?.image}
                              className="w-full h-full object-contain"
                              alt=""
                            />
                          </div>
                          {!awayWon && (
                            <Award className="absolute -top-2 -right-2 md:-left-2 w-6 h-6 text-yellow-500 bg-zinc-900 rounded-full p-1 border border-zinc-800" />
                          )}
                        </div>
                      </div>
                    </div>

                    {game.highlights && game.highlights.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-wrap gap-2">
                        {game.highlights.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-zinc-950 text-zinc-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-zinc-800"
                          >
                            {h}
                          </span>
                        ))}
                        <div className="ml-auto flex items-center gap-2 text-[10px] font-black text-purple-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          Full Recap <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
