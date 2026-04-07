export type GameVideoProvider = "nfhs" | "youtube" | "hudl" | "maxpreps" | "other";

export interface GameVideo {
  provider: GameVideoProvider;
  /** URL suitable for embedding in an <iframe> (for NFHS this is typically an embed URL). */
  embedUrl: string;
  /** Optional canonical page URL to open in a new tab (e.g. NFHS event page). */
  pageUrl?: string;
}

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  stadium: string;
  status: "live" | "upcoming" | "final";
  level: "Varsity" | "JV" | "Freshman";
  dataSource?: string;
  quarter?: string;
  timeRemaining?: string;
  /** @deprecated Prefer `video.embedUrl` */
  videoUrl?: string;
  video?: GameVideo;
  highlights?: string[];
  attendance?: number;
}

import { games2004 } from "./games/2004";
import { games2005 } from "./games/2005";
import { games2006 } from "./games/2006";
import { games2007 } from "./games/2007";
import { games2008 } from "./games/2008";
import { games2009 } from "./games/2009";
import { games2010 } from "./games/2010";
import { games2011 } from "./games/2011";
import { games2012 } from "./games/2012";
import { games2013 } from "./games/2013";
import { games2014 } from "./games/2014";
import { games2015 } from "./games/2015";
import { games2016 } from "./games/2016";
import { games2017 } from "./games/2017";
import { games2018 } from "./games/2018";
import { games2019 } from "./games/2019";
import { games2020 } from "./games/2020";
import { games2021 } from "./games/2021";
import { games2022 } from "./games/2022";
import { games2023 } from "./games/2023";
import { games2024 } from "./games/2024";
import { games2025 } from "./games/2025";
import { games2026 } from "./games/2026";

export const GAME_YEARS = [
  2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
  2020, 2021, 2022, 2023, 2024, 2025, 2026,
] as const;

export type GameYear = (typeof GAME_YEARS)[number];

export const DEFAULT_GAMES_YEAR: GameYear = 2025;

export function seasonLabel(year: number) {
  return `${year}-${String(year + 1).slice(-2)}`;
}

export const gamesByYear: Record<GameYear, Game[]> = {
  2004: games2004,
  2005: games2005,
  2006: games2006,
  2007: games2007,
  2008: games2008,
  2009: games2009,
  2010: games2010,
  2011: games2011,
  2012: games2012,
  2013: games2013,
  2014: games2014,
  2015: games2015,
  2016: games2016,
  2017: games2017,
  2018: games2018,
  2019: games2019,
  2020: games2020,
  2021: games2021,
  2022: games2022,
  2023: games2023,
  2024: games2024,
  2025: games2025,
  2026: games2026,
};

export const games = gamesByYear[DEFAULT_GAMES_YEAR];
export const allGames = Object.values(gamesByYear).flat();
