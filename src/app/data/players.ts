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
}

export const players: Player[] = [
  {
    id: "player-riordan-1",
    name: "Michael Mitchell Jr.",
    team: "riordan",
    position: "QB",
    subPosition: "Dual-Threat",
    number: 10,
    grade: 11,
    height: "5'11\"",
    weight: 180,
    stats: {
      games: 0,
      yards: 0,
      touchdowns: 0,
      interceptions: 0,
    },
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=400&h=400&fit=crop",
    highlights: ["4-star recruit", "Elite speed and arm strength"],
  },
  {
    id: "player-riordan-2",
    name: "Wesley Winn",
    team: "riordan",
    position: "WR",
    subPosition: "Speedster",
    number: 1,
    grade: 10,
    height: "5'10\"",
    weight: 165,
    stats: {
      games: 0,
      yards: 0,
      touchdowns: 0,
    },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&fit=crop",
    highlights: ["Top ranked 2027 prospect", "Game-breaking speed"],
  },
  {
    id: "player-serra-1",
    name: "Jeovanni Henley",
    team: "serra",
    position: "RB",
    subPosition: "Powerback",
    number: 4,
    grade: 11,
    height: "5'11\"",
    weight: 195,
    stats: {
      games: 0,
      yards: 0,
      touchdowns: 0,
    },
    image: "https://images.unsplash.com/photo-1508962913221-80d085c6a281?q=80&w=400&h=400&fit=crop",
    highlights: ["Dynamic playmaker", "WCAL breakout candidate"],
  },
  {
    id: "player-sf-1",
    name: "Kingston Keanaaina",
    team: "st-francis",
    position: "RB",
    subPosition: "Workhorse",
    number: 22,
    grade: 12,
    height: "5'11\"",
    weight: 205,
    stats: {
      games: 0,
      yards: 0,
      touchdowns: 0,
    },
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=400&h=400&fit=crop",
    highlights: ["BYU Commit", "Physical downhill runner"],
  },
  {
    id: "player-lg-1",
    name: "Henry Masters",
    team: "los-gatos",
    position: "QB",
    subPosition: "Leader",
    number: 12,
    grade: 12,
    height: "6'2\"",
    weight: 190,
    stats: {
      games: 0,
      yards: 0,
      touchdowns: 0,
    },
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400&h=400&fit=crop",
    highlights: ["Proven winner", "Exceptional decision making"],
  },
];
