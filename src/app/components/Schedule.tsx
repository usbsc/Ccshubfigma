import { Link } from "react-router";
import { Calendar, MapPin, Clock, ChevronRight, Filter } from "lucide-react";
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

export function Schedule() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<GameYear>(DEFAULT_GAMES_YEAR);

  const games = gamesByYear[selectedYear] ?? [];

  const levels = ["all", "Varsity", "JV", "Freshman"];

  const filteredGames =
    selectedLevel === "all" ? games : games.filter((g) => g.level === selectedLevel);

  const upcomingGames = filteredGames
    .filter((g) => g.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const liveGames = filteredGames.filter((g) => g.status === "live");

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  // Group games by date
  const gamesByDate = upcomingGames.reduce(
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
    {} as Record<string, typeof upcomingGames>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1581588535512-4dbe198fbbee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBsaWdodHN8ZW58MXx8fHwxNzc0MDExODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-transparent"></div>
        </div>

        <div className="relative p-10 md:p-16">
          <div className="inline-flex items-center gap-2 bg-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white mb-4">
            <Calendar className="w-3 h-3 fill-white" /> {seasonLabel(selectedYear)} Season Schedule
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.85] mb-4">
            Game <br />
            <span className="text-green-500 font-black">Plan</span>
          </h1>
          <p className="text-zinc-400 text-sm font-medium max-w-sm">
            Complete broadcast schedule and stadium locations for all CCS competition levels.
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
            <Filter className="w-3 h-3" /> Showing {upcomingGames.length} Upcoming
          </div>
        </div>
      </div>

      {/* Live Section */}
      {liveGames.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
              Live Broadcasts
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {liveGames.map((game) => {
              const home = getTeam(game.homeTeam);
              const away = getTeam(game.awayTeam);
              return (
                <Link
                  key={game.id}
                  to={`/game/${game.id}`}
                  className="group relative bg-zinc-900 rounded-[2rem] border-2 border-red-600/50 p-8 hover:bg-zinc-800 transition-all shadow-2xl shadow-red-900/10"
                >
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Broadcast Live
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 tracking-widest uppercase">
                      {game.quarter} • {game.timeRemaining}
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 mb-8">
                    <div className="flex flex-col items-end gap-3 text-right">
                      <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center p-2 border-2 border-zinc-700 overflow-hidden">
                        <ImageWithFallback
                          src={away?.image}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-black text-2xl text-white uppercase tracking-tight leading-none mb-1">
                          {away?.name}
                        </div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {away?.mascot}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-zinc-950 rounded-xl font-black text-xl text-red-500 border border-zinc-800 tracking-tighter">
                      VS
                    </div>
                    <div className="flex flex-col items-start gap-3 text-left">
                      <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center p-2 border-2 border-zinc-700 overflow-hidden">
                        <ImageWithFallback
                          src={home?.image}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="font-black text-2xl text-white uppercase tracking-tight leading-none mb-1">
                          {home?.name}
                        </div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {home?.mascot}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-red-500" /> {game.stadium}
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Grouped Schedule */}
      <section className="space-y-12">
        {liveGames.length === 0 && upcomingGames.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-zinc-400">
            No games loaded for {seasonLabel(selectedYear)} yet.
          </div>
        ) : null}

        {Object.entries(gamesByDate).map(([date, dateGames]) => (
          <div key={date} className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-black text-blue-500 uppercase tracking-widest whitespace-nowrap">
                {date}
              </h3>
              <div className="h-[1px] w-full bg-zinc-800/50"></div>
            </div>

            <div className="grid gap-4">
              {dateGames.map((game) => {
                const home = getTeam(game.homeTeam);
                const away = getTeam(game.awayTeam);
                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="group flex flex-col md:flex-row md:items-center gap-6 p-6 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 rounded-[1.5rem] transition-all"
                  >
                    {/* Time & Level */}
                    <div className="md:w-32 shrink-0">
                      <div className="flex items-center gap-2 text-zinc-100 font-black tracking-tight">
                        <Clock className="w-4 h-4 text-green-500" /> {game.time}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">
                        {game.level}
                      </div>
                    </div>

                    {/* Matchup */}
                    <div className="flex-1 flex items-center gap-6">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-800">
                          <ImageWithFallback
                            src={away?.image}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-white uppercase tracking-tight truncate">
                            {away?.name || "Away"}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase">
                            {away?.record ? `${away.record.wins}-${away.record.losses}` : "0-0"}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-black text-zinc-700 uppercase italic">
                        at
                      </div>

                      <div className="flex items-center gap-4 flex-1 justify-end text-right">
                        <div className="min-w-0">
                          <div className="font-black text-white uppercase tracking-tight truncate">
                            {home?.name || "Home"}
                          </div>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase">
                            {home?.record ? `${home.record.wins}-${home.record.losses}` : "0-0"}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-800">
                          <ImageWithFallback
                            src={home?.image}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stadium */}
                    <div className="md:w-48 flex items-center justify-between md:justify-end gap-4 shrink-0">
                      <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest truncate max-w-[120px]">
                        <MapPin className="w-3 h-3" /> {game.stadium}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-green-600 flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                      </div>
                    </div>
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
