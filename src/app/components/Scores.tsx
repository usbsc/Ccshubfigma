import { Link } from "react-router";
import { Award, MapPin, Users, ChevronRight, Filter, Flame } from "lucide-react";
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
import { googleMapsSearchUrl } from "../utils/maps";
import { motion } from "motion/react";

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
      {/* Modern Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 backdrop-blur-sm"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-black text-primary uppercase tracking-widest">
              {seasonLabel(selectedYear)} Season
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-3 text-foreground">
            Final <span className="text-primary">Scores</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md">
            Complete results archive with box scores, attendance, and key highlights from across the region.
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4"
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 pb-2 md:pb-0">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wide transition-all whitespace-nowrap border ${
                selectedLevel === level
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-secondary text-secondary-foreground border-primary/20 hover:border-primary/40"
              }`}
            >
              {level === "all" ? "All Levels" : level}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as GameYear)}
            className="bg-secondary text-foreground border border-primary/20 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select season"
          >
            {[...GAME_YEARS].reverse().map((y) => (
              <option key={y} value={y}>
                {seasonLabel(y)}
              </option>
            ))}
          </select>

          <div className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-3 h-3" /> {finalGames.length}
          </div>
        </div>
      </motion.div>

      {/* Results by Date */}
      <section className="space-y-12">
        {finalGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-secondary border border-primary/20 rounded-2xl p-8 text-muted-foreground text-center"
          >
            No final scores loaded for {seasonLabel(selectedYear)} yet.
          </motion.div>
        ) : null}

        {Object.entries(gamesByDate).map(([date, dateGames], dateIdx) => (
          <div key={date} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dateIdx * 0.05 }}
              className="flex items-center gap-3"
            >
              <Flame className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.2em]">{date}</h3>
              <div className="flex-1 h-px bg-primary/20"></div>
            </motion.div>

            <div className="grid gap-4">
              {dateGames.map((game, gameIdx) => {
                const home = getTeam(game.homeTeam);
                const away = getTeam(game.awayTeam);
                const awayWon = game.awayScore > game.homeScore;
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dateIdx * 0.05 + gameIdx * 0.02 }}
                  >
                    <Link
                      to={`/game/${game.id}`}
                      className="group block bg-card border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all"
                    >
                      {/* Metadata */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/10">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            {game.level}
                          </span>
                          <span className="text-[10px] font-black text-primary uppercase">FINAL</span>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap justify-end">
                          {game.stadium && (
                            <a
                              href={googleMapsSearchUrl(
                                `${game.stadium} ${home?.name ?? ""} ${away?.name ?? ""}`.trim()
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors"
                              title="Open in Google Maps"
                            >
                              <MapPin className="w-3 h-3" />
                              {game.stadium}
                            </a>
                          )}
                          {game.attendance && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                              <Users className="w-3 h-3" /> {game.attendance.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Score Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-6 md:gap-8">
                        {/* Away Team */}
                        <div className={`flex items-center gap-4 ${awayWon ? "opacity-100" : "opacity-60"}`}>
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-primary/10 p-2 border border-primary/20">
                              <ImageWithFallback
                                src={away?.image}
                                className="w-full h-full object-contain"
                                alt={away?.name}
                              />
                            </div>
                            {awayWon && (
                              <Award className="absolute -top-2 -left-2 w-5 h-5 text-primary bg-card rounded-full p-0.5 border border-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-black text-lg text-foreground uppercase tracking-tight leading-none mb-1 truncate">
                              {away?.name || "Away"}
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              {away?.mascot || "Team"}
                            </div>
                          </div>
                          <div className="text-3xl font-black text-primary tabular-nums flex-shrink-0">
                            {game.awayScore}
                          </div>
                        </div>

                        <div className="hidden md:block text-[10px] font-black text-muted-foreground uppercase italic px-2">
                          VS
                        </div>

                        {/* Home Team */}
                        <div className={`flex items-center gap-4 flex-row-reverse md:flex-row ${!awayWon ? "opacity-100" : "opacity-60"}`}>
                          <div className="text-3xl font-black text-primary tabular-nums flex-shrink-0">
                            {game.homeScore}
                          </div>
                          <div className="flex-1 min-w-0 text-right md:text-left">
                            <div className="font-black text-lg text-foreground uppercase tracking-tight leading-none mb-1 truncate">
                              {home?.name || "Home"}
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              {home?.mascot || "Team"}
                            </div>
                          </div>
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-primary/10 p-2 border border-primary/20">
                              <ImageWithFallback
                                src={home?.image}
                                className="w-full h-full object-contain"
                                alt={home?.name}
                              />
                            </div>
                            {!awayWon && (
                              <Award className="absolute -top-2 -right-2 md:-left-2 w-5 h-5 text-primary bg-card rounded-full p-0.5 border border-primary" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Highlights & CTA */}
                      {game.highlights && game.highlights.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-primary/10 flex flex-wrap gap-2">
                          {game.highlights.slice(0, 2).map((h, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-md text-[8px] font-black uppercase tracking-widest border border-primary/20"
                            >
                              {h}
                            </span>
                          ))}
                          <div className="ml-auto flex items-center gap-1.5 text-[10px] font-black text-primary uppercase group-hover:translate-x-0.5 transition-transform">
                            Recap <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
