/**
 * Application-wide constants and configuration
 */

// Routes
export const ROUTES = {
  HOME: "/",
  RANKINGS: "/rankings",
  SCHEDULE: "/schedule",
  SCORES: "/scores",
  PLAYERS: "/players",
  TEAM: "/team/:teamId",
  GAME: "/game/:gameId",
} as const;

// Auto-update intervals (in milliseconds)
export const UPDATE_INTERVALS = {
  LIVE_GAMES: 30000, // 30 seconds for live games
  SCORES: 60000, // 1 minute for scores
  RANKINGS: 300000, // 5 minutes for rankings
  CLOCK: 1000, // 1 second for clock updates
} as const;

// Game statuses
export const GAME_STATUS = {
  LIVE: "live",
  UPCOMING: "upcoming",
  FINAL: "final",
} as const;

// Game levels
export const GAME_LEVELS = {
  VARSITY: "Varsity",
  JV: "JV",
  FRESHMAN: "Freshman",
} as const;

// Image fallbacks
export const IMAGE_FALLBACKS = {
  PRIMARY_PLACEHOLDER:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80",
  GENERIC_LOGO:
    "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
  ABSOLUTE_FALLBACK:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEyYzAtNS41MjMtNC40NzctMTAtMTAtMTBTMiA2LjQ3NyAyIDEyczQuNDc3IDEwIDEwIDEwIDEwLTQuNDc3IDEwLTEwWiIvPjxwYXRoIGQ9Ik0xMiAydjIwTTIgMTJoMjAiLz48L3N2Zz4=",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  HOME_TEAM: "homeTeam",
  THEME: "theme",
  FAVORITES: "favorites",
  PREFERENCES: "preferences",
} as const;

// External URLs
export const EXTERNAL_URLS = {
  CIF_CCS_LOGO: "https://www.cifccs.org/images/logo.png",
  MAXPREPS_BASE: "https://www.maxpreps.com",
  HUDL_BASE: "https://www.hudl.com",
} as const;

// Display limits
export const DISPLAY_LIMITS = {
  TOP_RANKED_TEAMS: 5,
  UPCOMING_GAMES: 4,
  RECENT_GAMES: 3,
  PLAYERS_PER_PAGE: 20,
  GAMES_PER_PAGE: 10,
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

// App metadata
export const APP_METADATA = {
  TITLE: "CCSHUB - Central Coast Section Athletics",
  SHORT_TITLE: "CCSHUB",
  DESCRIPTION:
    "The premier digital destination for CIF Central Coast Section high school athletics.",
  VERSION: "0.0.1",
} as const;
