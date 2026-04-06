import { useParams, Link } from "react-router";
import { MapPin, Users, Clock, TrendingUp, Award, Play } from "lucide-react";
import { games } from "../data/games";
import { teams } from "../data/teams";
import { motion } from "motion/react";
import { ImageWithFallback } from "./common/ImageWithFallback";

export function GameDetail() {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Game Not Found</h2>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const home = teams.find((t) => t.id === game.homeTeam);
  const away = teams.find((t) => t.id === game.awayTeam);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Broadcast Video Section */}
      {game.videoUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl relative group"
        >
          <div className="aspect-video w-full bg-zinc-950">
            <iframe
              src={game.videoUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <div className="bg-red-600 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-white/10">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs font-black tracking-widest text-white uppercase">
                Live Broadcast
              </span>
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/5">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-tighter">
                12.5k watching
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Game Header (only if no video or smaller version) */}
      {!game.videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
        >
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1581588535512-4dbe198fbbee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBsaWdodHN8ZW58MXx8fHwxNzc0MDExODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Stadium"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent"></div>
            {game.status === "live" && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-4 text-sm text-zinc-300 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {game.stadium}
                </div>
                {game.attendance && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {game.attendance.toLocaleString()} fans
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(game.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {game.time}
                </div>
              </div>
              <div className="text-sm font-medium text-blue-300">2025-26 Season • {game.level}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Score Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
      >
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Away Team */}
          <Link
            to={`/team/${away?.id}`}
            className="text-center hover:opacity-80 transition-opacity"
          >
            <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 border-4 border-zinc-700 flex items-center justify-center p-4 overflow-hidden">
              <ImageWithFallback
                src={away?.image}
                alt={away?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-xl mb-1">{away?.name || "Away Team"}</h3>
            <p className="text-sm text-zinc-400">
              {away?.record ? `${away.record.wins}-${away.record.losses}` : "0-0"}
            </p>
          </Link>

          {/* Score */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-6xl font-black text-white">{game.awayScore}</div>
              <div className="text-2xl font-black text-zinc-700">-</div>
              <div className="text-6xl font-black text-white">{game.homeScore}</div>
            </div>
            {game.status === "live" && (
              <div className="text-lg font-black text-red-500 uppercase tracking-widest">
                {game.quarter} • {game.timeRemaining}
              </div>
            )}
            {game.status === "final" && (
              <div className="text-lg font-black text-zinc-500 uppercase tracking-widest italic">
                Final
              </div>
            )}
            {game.status === "upcoming" && (
              <div className="text-lg font-black text-blue-500 uppercase tracking-widest">
                Upcoming
              </div>
            )}
          </div>

          {/* Home Team */}
          <Link
            to={`/team/${home?.id}`}
            className="text-center hover:opacity-80 transition-opacity"
          >
            <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 border-4 border-zinc-700 flex items-center justify-center p-4 overflow-hidden">
              <ImageWithFallback
                src={home?.image}
                alt={home?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-xl mb-1">{home?.name || "Home Team"}</h3>
            <p className="text-sm text-zinc-400">
              {home?.record ? `${home.record.wins}-${home.record.losses}` : "0-0"}
            </p>
          </Link>
        </div>
      </motion.div>

      {/* Game Highlights */}
      {game.highlights && game.highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Game Highlights
          </h3>
          <ul className="space-y-3">
            {game.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Team Matchup Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Away Team Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h3 className="font-bold text-xl mb-4">{away?.name}</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-zinc-400">Head Coach:</span>{" "}
              <span className="font-medium">{away?.headCoach}</span>
            </div>
            <div>
              <span className="text-zinc-400">Offensive System:</span>{" "}
              <span className="font-medium">{away?.offensiveSystem}</span>
            </div>
            <div>
              <span className="text-zinc-400">Defensive System:</span>{" "}
              <span className="font-medium">{away?.defensiveSystem}</span>
            </div>
            <div>
              <span className="text-zinc-400">Common Plays:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {away?.commonPlays.map((play, idx) => (
                  <span key={idx} className="bg-zinc-800 px-3 py-1 rounded-full text-xs">
                    {play}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-zinc-400">Strengths:</span>
              <ul className="mt-2 space-y-1">
                {away?.strengths.map((strength, idx) => (
                  <li key={idx} className="text-zinc-300">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Home Team Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h3 className="font-bold text-xl mb-4">{home?.name}</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-zinc-400">Head Coach:</span>{" "}
              <span className="font-medium">{home?.headCoach}</span>
            </div>
            <div>
              <span className="text-zinc-400">Offensive System:</span>{" "}
              <span className="font-medium">{home?.offensiveSystem}</span>
            </div>
            <div>
              <span className="text-zinc-400">Defensive System:</span>{" "}
              <span className="font-medium">{home?.defensiveSystem}</span>
            </div>
            <div>
              <span className="text-zinc-400">Common Plays:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {home?.commonPlays.map((play, idx) => (
                  <span key={idx} className="bg-zinc-800 px-3 py-1 rounded-full text-xs">
                    {play}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-zinc-400">Strengths:</span>
              <ul className="mt-2 space-y-1">
                {home?.strengths.map((strength, idx) => (
                  <li key={idx} className="text-zinc-300">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
