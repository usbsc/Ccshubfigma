import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, X, Calendar, MapPin } from "lucide-react";
import { games } from "../data/games";
import { teams } from "../data/teams";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GameSearchMenuProps {
  onClose: () => void;
}

export function GameSearchMenu({ onClose }: GameSearchMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;

    const query = searchQuery.toLowerCase();
    return games.filter((game) => {
      const homeTeam = teams.find((t) => t.id === game.homeTeam);
      const awayTeam = teams.find((t) => t.id === game.awayTeam);

      return (
        homeTeam?.name.toLowerCase().includes(query) ||
        awayTeam?.name.toLowerCase().includes(query) ||
        homeTeam?.mascot.toLowerCase().includes(query) ||
        awayTeam?.mascot.toLowerCase().includes(query) ||
        game.stadium.toLowerCase().includes(query) ||
        game.level.toLowerCase().includes(query) ||
        game.status.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <div className="bg-blue-800 border-t border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Search games by team, stadium, level, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-900 text-white border border-blue-600 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-blue-900 rounded-lg max-h-96 overflow-y-auto">
          {filteredGames.length === 0 ? (
            <div className="p-8 text-center text-blue-300">
              No games found matching your search.
            </div>
          ) : (
            <div className="divide-y divide-blue-800">
              {filteredGames.map((game) => {
                const home = getTeam(game.homeTeam);
                const away = getTeam(game.awayTeam);

                return (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    onClick={onClose}
                    className="block p-4 hover:bg-blue-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {game.status === "live" && (
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            LIVE
                          </span>
                        )}
                        {game.status === "upcoming" && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                            UPCOMING
                          </span>
                        )}
                        {game.status === "final" && (
                          <span className="bg-zinc-600 text-white px-2 py-1 rounded text-xs font-bold">
                            FINAL
                          </span>
                        )}
                        <span className="text-xs text-blue-300">{game.level}</span>
                      </div>
                      <span className="text-xs text-blue-300 flex items-center gap-1">
                        <Calendar className="w-3" />
                        {new Date(game.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1 overflow-hidden border border-zinc-700">
                          <ImageWithFallback
                            src={away?.image}
                            alt={away?.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-black truncate uppercase tracking-tight">
                            {away?.name}
                          </div>
                          {game.status !== "upcoming" && (
                            <div className="text-lg font-black text-white">{game.awayScore}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1 overflow-hidden border border-zinc-700">
                          <ImageWithFallback
                            src={home?.image}
                            alt={home?.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-black truncate uppercase tracking-tight">
                            {home?.name}
                          </div>
                          {game.status !== "upcoming" && (
                            <div className="text-lg font-black text-white">{game.homeScore}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-blue-300">
                      <MapPin className="w-3 h-3" />
                      {game.stadium}
                      {game.time && ` • ${game.time}`}
                      <span className="ml-auto text-blue-400">
                        {game.dataSource}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {searchQuery && (
          <div className="mt-3 text-sm text-blue-200">
            Found {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
