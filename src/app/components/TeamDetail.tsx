import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Users,
  MapPin,
  Target,
  Shield,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react";
import { teams } from "../data/teams";
import {
  DEFAULT_GAMES_YEAR,
  GAME_YEARS,
  gamesByYear,
  seasonLabel,
  type GameYear,
} from "../data/games";
import { players } from "../data/players";
import { motion } from "motion/react";
import { ImageWithFallback } from "./common/ImageWithFallback";
import { UniformShowcase } from "./UniformShowcase";
import { googleMapsSearchUrl } from "../utils/maps";

export function TeamDetail() {
  const { teamId } = useParams();
  const [selectedYear, setSelectedYear] = useState<GameYear>(DEFAULT_GAMES_YEAR);
  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Team Not Found</h2>
        <Link to="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const teamGames = (gamesByYear[selectedYear] ?? []).filter(
    (g) => g.homeTeam === team.id || g.awayTeam === team.id
  );
  const teamPlayers = players.filter((p) => p.team === team.id);

  const upcomingGames = teamGames
    .filter((g) => g.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recentGames = teamGames
    .filter((g) => g.status === "final")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Team Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="relative h-80 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10"></div>
          <div className="flex items-center justify-center h-full p-12">
            <ImageWithFallback
              src={team.image}
              alt={team.name}
              className="h-full object-contain filter drop-shadow-2xl"
            />
          </div>
          <div className="absolute top-4 left-4 z-20">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-3xl text-zinc-900 shadow-xl border-4 border-blue-600">
              {team.ranking}
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">{team.name}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                <span className="bg-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">
                  {team.mascot}
                </span>
                <span className="text-zinc-300">
                  {team.record.wins}-{team.record.losses}
                </span>
                {typeof team.stateRank === "number" ? (
                  <span className="text-zinc-300">CA #{team.stateRank}</span>
                ) : null}
                <span className="bg-green-700/70 px-3 py-1 rounded-full text-xs uppercase tracking-widest whitespace-normal line-clamp-2">
                  {team.division}
                </span>
              </div>

              {team.socials && (
                <div className="flex items-center gap-4">
                  {team.socials.twitter && (
                    <a
                      href={`https://twitter.com/${team.socials.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-zinc-800/80 hover:bg-blue-400/20 rounded-full transition-all group"
                    >
                      <Twitter className="w-5 h-5 text-zinc-300 group-hover:text-blue-400" />
                    </a>
                  )}
                  {team.socials.instagram && (
                    <a
                      href={`https://instagram.com/${team.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-zinc-800/80 hover:bg-pink-500/20 rounded-full transition-all group"
                    >
                      <Instagram className="w-5 h-5 text-zinc-300 group-hover:text-pink-500" />
                    </a>
                  )}
                  {team.socials.maxpreps && (
                    <a
                      href={team.socials.maxpreps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-zinc-800/80 hover:bg-green-500/20 rounded-full transition-all group"
                    >
                      <ExternalLink className="w-5 h-5 text-zinc-300 group-hover:text-green-500" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {[
          { label: "Ranking", value: `#${team.ranking}`, icon: Award },
          {
            label: "CA Rank",
            value: typeof team.stateRank === "number" ? `#${team.stateRank}` : "—",
            icon: Award,
          },
          {
            label: "Record",
            value: `${team.record.wins}-${team.record.losses}`,
            icon: Target,
          },
          {
            label: "PF / PA",
            value:
              typeof team.pointsFor === "number" && typeof team.pointsAgainst === "number"
                ? `${team.pointsFor} / ${team.pointsAgainst}`
                : "—",
            icon: TrendingUp,
          },
          { label: "Streak", value: team.streak ?? "—", icon: Zap },
          { label: "Division/League", value: team.division, icon: Shield },
          {
            label: "Stadium",
            value:
              team.stadium && team.stadium !== "N/A" ? (
                <a
                  href={googleMapsSearchUrl(`${team.stadium} ${team.name}`.trim())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  title="Open in Google Maps"
                >
                  {team.stadium}
                </a>
              ) : (
                "—"
              ),
            icon: MapPin,
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-zinc-400 uppercase">{stat.label}</span>
            </div>
            <div className="text-xl font-bold break-words line-clamp-2">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Uniforms */}
      <UniformShowcase team={team} />

      {/* Level Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          All Levels
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(team.levels).map(([level, record]) => (
            <div key={level} className="bg-zinc-800 rounded-xl p-4">
              <div className="text-sm text-zinc-400 uppercase mb-2">{level}</div>
              <div className="text-2xl font-bold">
                {typeof record === "string" ? record : `${record.wins}-${record.losses}`}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Coaching Staff & System */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coaching Staff */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Coaching Staff
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-zinc-400">Head Coach</div>
              <div className="font-semibold text-lg">{team.headCoach}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400">Offensive Coordinator</div>
              <div className="font-semibold">{team.offensiveCoordinator}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400">Defensive Coordinator</div>
              <div className="font-semibold">{team.defensiveCoordinator}</div>
            </div>
          </div>
        </motion.div>

        {/* Systems */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Systems & Schemes
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-zinc-400">Offensive System</div>
              <div className="font-semibold text-lg">{team.offensiveSystem}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400">Defensive System</div>
              <div className="font-semibold text-lg">{team.defensiveSystem}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Common Plays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-400" />
          Common Plays
        </h2>
        <div className="flex flex-wrap gap-3">
          {team.commonPlays.map((play, idx) => (
            <span
              key={idx}
              className="bg-zinc-800 px-4 py-2 rounded-full font-medium hover:bg-zinc-700 transition-colors"
            >
              {play}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Common Defensive Plays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-400" />
          Common Defensive Plays
        </h2>
        <div className="flex flex-wrap gap-3">
          {team.commonDefensivePlay.map((play, idx) => (
            <span
              key={idx}
              className="bg-red-900/30 px-4 py-2 rounded-full font-medium border border-red-800 hover:bg-red-900/50 transition-colors text-red-200"
            >
              {play}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-2xl p-6 border border-blue-700"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-400" />
          Team Strengths
        </h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {team.strengths.map((strength, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Key Players */}
      {teamPlayers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            Key Players
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {teamPlayers.map((player) => (
              <Link
                key={player.id}
                to="/players"
                className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors"
              >
                <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
                  <ImageWithFallback
                    src={team.image}
                    alt={player.name}
                    className="w-full h-full object-contain bg-zinc-950 p-6"
                  />
                </div>
                <div className="font-bold text-lg">
                  #{player.number} {player.name}
                </div>
                <div className="text-sm text-zinc-400">
                  {player.position} • Grade {player.grade}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Schedule */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Season</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as GameYear)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {GAME_YEARS.map((year) => (
              <option key={year} value={year}>
                {seasonLabel(year)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Games */}
        {upcomingGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              Upcoming Games
            </h2>
            <div className="space-y-3">
              {upcomingGames.map((game) => {
                const opponent = game.homeTeam === team.id ? game.awayTeam : game.homeTeam;
                const isHome = game.homeTeam === team.id;
                const opponentTeam = teams.find((t) => t.id === opponent);
                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="block bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700 transition-colors"
                  >
                    <div className="text-xs text-zinc-400 mb-1">
                      {new Date(game.date).toLocaleDateString()} • {game.time}
                    </div>
                    <div className="font-semibold">
                      {isHome ? "vs" : "@"} {opponentTeam?.name || "Opponent"}
                    </div>
                    <div className="text-xs text-zinc-500">{game.stadium}</div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            Recent Results
          </h2>
          <div className="space-y-3">
            {recentGames.length === 0 ? (
              <div className="text-sm text-zinc-400">No final scores loaded for this season.</div>
            ) : (
              recentGames.map((game) => {
                const opponent = game.homeTeam === team.id ? game.awayTeam : game.homeTeam;
                const isHome = game.homeTeam === team.id;
                const opponentTeam = teams.find((t) => t.id === opponent);
                const teamScore = isHome ? game.homeScore : game.awayScore;
                const oppScore = isHome ? game.awayScore : game.homeScore;
                const won = teamScore > oppScore;
                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="block bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-400">
                        {new Date(game.date).toLocaleDateString()}
                      </span>
                      <span
                        className={`text-xs font-bold ${won ? "text-green-400" : "text-red-400"}`}
                      >
                        {won ? "W" : "L"}
                      </span>
                    </div>
                    <div className="font-semibold">
                      {isHome ? "vs" : "@"} {opponentTeam?.name || "Opponent"}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {teamScore} - {oppScore}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
