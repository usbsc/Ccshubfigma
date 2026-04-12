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
  Image,
  History,
} from "lucide-react";
import { teams } from "../data/teams";
import {
  DEFAULT_GAMES_YEAR,
  GAME_YEARS,
  gamesByYear,
  seasonLabel,
  type GameYear,
} from "../data/games";
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
        <div className="relative h-80 bg-card">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10"></div>
          <div className="flex items-center justify-center h-full p-12">
            <ImageWithFallback
              src={team.image}
              alt={team.name}
              className="h-full object-contain filter drop-shadow-2xl"
            />
          </div>
          <div className="absolute top-4 left-4 z-20">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-3xl text-foreground shadow-xl border-4 border-blue-600">
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
                <span className="text-foreground">
                  {team.record.wins}-{team.record.losses}
                </span>
                {typeof team.stateRank === "number" ? (
                  <span className="text-foreground">CA #{team.stateRank}</span>
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
                      className="p-2 bg-secondary/80 hover:bg-blue-400/20 rounded-full transition-all group"
                    >
                      <Twitter className="w-5 h-5 text-foreground group-hover:text-blue-400" />
                    </a>
                  )}
                  {team.socials.instagram && (
                    <a
                      href={`https://instagram.com/${team.socials.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary/80 hover:bg-pink-500/20 rounded-full transition-all group"
                    >
                      <Instagram className="w-5 h-5 text-foreground group-hover:text-pink-500" />
                    </a>
                  )}
                  {team.socials.maxpreps && (
                    <a
                      href={team.socials.maxpreps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary/80 hover:bg-green-500/20 rounded-full transition-all group"
                    >
                      <ExternalLink className="w-5 h-5 text-foreground group-hover:text-green-500" />
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
            className="bg-card rounded-xl p-4 border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-muted-foreground uppercase">{stat.label}</span>
            </div>
            <div className="text-xl font-bold break-words line-clamp-2">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Uniforms & Levels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Uniforms */}
        <UniformShowcase team={team} />

        {/* Level Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            All Levels
          </h2>
          <div className="grid gap-3">
            {Object.entries(team.levels).map(([level, record]) => (
              <div key={level} className="bg-secondary rounded-xl p-3">
                <div className="text-sm text-muted-foreground uppercase mb-1">{level}</div>
                <div className="text-xl font-bold">
                  {typeof record === "string" ? record : `${record.wins}-${record.losses}`}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Coaching Staff & System */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coaching Staff */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            Coaching Staff
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Head Coach</div>
              <div className="font-semibold text-lg">{team.headCoach}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Offensive Coordinator</div>
              <div className="font-semibold">{team.offensiveCoordinator}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Defensive Coordinator</div>
              <div className="font-semibold">{team.defensiveCoordinator}</div>
            </div>
          </div>
        </motion.div>

        {/* Systems */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Systems & Schemes
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Offensive System</div>
              <div className="font-semibold text-lg">{team.offensiveSystem}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Defensive System</div>
              <div className="font-semibold text-lg">{team.defensiveSystem}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* School Info */}
      {team.schoolInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <History className="w-6 h-6 text-purple-400" />
            School History & Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">School Founded</div>
                <div className="font-semibold">{team.schoolInfo.founded}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Football Program Started</div>
                <div className="font-semibold">{team.schoolInfo.footballProgramStarted}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Joined CCS</div>
                <div className="font-semibold">{team.schoolInfo.ccsJoined}</div>
              </div>
              {team.schoolInfo.fieldCapacity && (
                <div>
                  <div className="text-sm text-muted-foreground">Field Capacity</div>
                  <div className="font-semibold">{team.schoolInfo.fieldCapacity.toLocaleString()}</div>
                </div>
              )}
            </div>
            <div>
              {team.schoolInfo.championships && team.schoolInfo.championships.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Championships</div>
                  <div className="space-y-1">
                    {team.schoolInfo.championships.map((champ, idx) => (
                      <div key={idx} className="text-sm font-medium">
                        {champ.year} - {champ.division}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!team.schoolInfo.championships || team.schoolInfo.championships.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  Championship history not yet documented
                </div>
              )}
            </div>
          </div>
          {team.schoolInfo.notableFacts && team.schoolInfo.notableFacts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2">Notable Facts</div>
              <ul className="space-y-1">
                {team.schoolInfo.notableFacts.map((fact, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Common Plays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-400" />
          Common Plays
        </h2>
        <div className="flex flex-wrap gap-3">
          {team.commonPlays.map((play, idx) => (
            <span
              key={idx}
              className="bg-secondary px-4 py-2 rounded-full font-medium hover:bg-secondary transition-colors"
            >
              {play}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Common Defensive Tendencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-400" />
          Common Defensive Tendencies
        </h2>
        <div className="flex flex-wrap gap-3">
          {team.commonDefensiveTendencies.map((play, idx) => (
            <span
              key={idx}
              className="bg-red-900/30 px-4 py-2 rounded-full font-medium border border-red-800 hover:bg-red-900/50 transition-colors text-red-200"
            >
              {play}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Team Strengths */}
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

      {/* Schedule Section - Moved Up */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Season</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value) as GameYear)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="bg-card rounded-2xl p-6 border border-border"
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
                    className="block bg-secondary rounded-lg p-3 hover:bg-secondary transition-colors"
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {new Date(game.date).toLocaleDateString()} • {game.time}
                    </div>
                    <div className="font-semibold">
                      {isHome ? "vs" : "@"} {opponentTeam?.name || "Opponent"}
                    </div>
                    <div className="text-xs text-muted-foreground">{game.stadium}</div>
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
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            Recent Results
          </h2>
          <div className="space-y-3">
            {recentGames.length === 0 ? (
              <div className="text-sm text-muted-foreground">No final scores loaded for this season.</div>
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
                    className="block bg-secondary rounded-lg p-3 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
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
                    <div className="text-sm text-muted-foreground">
                      {teamScore} - {oppScore}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      {/* Photos Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="bg-card rounded-2xl p-6 border border-border"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Image className="w-6 h-6 text-purple-400" />
          Photos
        </h2>
        <div className="flex flex-col items-center justify-center py-12 px-6 rounded-lg border-2 border-dashed border-border">
          <Image className="w-12 h-12 text-purple-400 mb-4" />
          <p className="text-foreground mb-4 text-center">View team photos on Adobe Lightroom</p>
          <a
            href="https://lightroom.adobe.com/shares/3af11b5819fb4d48a6d1b659dba92b74"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            Open Gallery <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
