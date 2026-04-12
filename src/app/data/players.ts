import { maxprepsPlayers } from "./players.maxpreps.generated";

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  subPosition?: string;
  number: number;
  grade: number;
  height: string;
  weight: number;
  stats: {
    games: number;
    [key: string]: number | string;
  };
  image: string;
  highlights?: string[];
  source?: "manual" | "maxpreps";
  maxprepsUrl?: string;
}

const GENERIC_PLAYER = "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80";

export const manualPlayers: Player[] = [];

export const players: Player[] = (() => {
  return maxprepsPlayers.sort((a, b) =>
    (a.team + a.name).localeCompare(b.team + b.name)
  );
})();

function normalizePlayerName(name: string) {
  return (name || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function playerKey(player: Player) {
  return `${player.team}/${normalizePlayerName(player.name)}`;
}

export function getPlayersByTeam(team: string) {
  return players.filter((p) => p.team === team);
}

export function searchPlayers(query: string) {
  const normalized = normalizePlayerName(query);

  return players.filter((player) => {
    const playerNormalized = normalizePlayerName(player.name);
    const teamNormalized = normalizePlayerName(player.team);

    return playerNormalized.includes(normalized) || teamNormalized.includes(normalized);
  });
}
