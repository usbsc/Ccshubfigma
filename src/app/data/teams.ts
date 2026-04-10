import { maxprepsTeamData } from "./teams.maxpreps.generated";

export interface Team {
  uniforms?: {
    home?: { primary: string; secondary: string; description?: string };
    away?: { primary: string; secondary: string; description?: string };
    alternate?: { primary: string; secondary: string; description?: string };
  };
  id: string;
  name: string;
  mascot: string;
  colors: { primary: string; secondary: string };
  league: string;
  division: string;
  record: { wins: number; losses: number };
  ranking: number; // CCS ranking
  stateRank?: number; // California state ranking from MaxPreps
  pointsFor?: number; // Varsity PF (MaxPreps)
  pointsAgainst?: number; // Varsity PA (MaxPreps)
  streak?: string; // e.g. "W3" / "L1" (MaxPreps)
  image: string;
  stadium: string;
  headCoach: string;
  offensiveCoordinator: string;
  defensiveCoordinator: string;
  offensiveSystem: string;
  defensiveSystem: string;
  commonPlays: string[];
  strengths: string[];
  keyPlayers: string[];
  levels: {
    varsity: { wins: number; losses: number };
    jv: { wins: number; losses: number };
    freshman: { wins: number; losses: number };
  };
  socials?: {
    twitter?: string;
    instagram?: string;
    maxpreps?: string;
    hudl?: string;
    youtube?: string;
    website?: string;
  };
  lastUpdated?: string; // ISO timestamp of last MaxPreps update
}

const GENERIC_LOGO =
  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80";

export const baseTeams: Team[] = [
  {
    id: "riordan",
    name: "Archbishop Riordan",
    mascot: "Crusaders",
    colors: {
      primary: "#8B0000",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFD700", description: "Red jersey with gold accents" },
      away: { primary: "#FFFFFF", secondary: "#000000", description: "White jersey with maroon trim" },
      alternate: { primary: "#FFD700", secondary: "#8B0000", description: "Gold jersey (rare)" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 1,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/7/c/0/7c0500a1-8d07-4e31-9252-87063d898492.gif",
    stadium: "Mayer Family Field",
    headCoach: "Adhir Ravipati",
    offensiveCoordinator: "Steve Nicoletti",
    defensiveCoordinator: "Ray Calcagno",
    offensiveSystem: "Pro-Style Offense",
    defensiveSystem: "4-3 Defense",
    commonPlays: ["Power Run", "Deep Post", "Screen Pass", "Boot Action"],
    strengths: ["Tough defense", "Physical play", "Elite skill players"],
    keyPlayers: ["QB Michael Mitchell Jr. #10", "WR Wesley Winn #1", "WR Chris Lawson #2"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "RiordanFootball",
      instagram: "riordanfootball",
      maxpreps: "https://www.maxpreps.com/ca/san-francisco/archbishop-riordan-crusaders/football/",
      hudl: "https://www.hudl.com/team/8129/Archbishop-Riordan-High-School",
      youtube: "@riordanhs",
      website: "https://www.riordanhs.org/athletics",
    },
  },
  {
    id: "serra",
    name: "Junipero Serra",
    mascot: "Padres",
    colors: {
      primary: "#000080",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#004B87", secondary: "#FFFFFF", description: "Dark gray jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#004B87", description: "White jersey with gray trim" },
      alternate: { primary: "#FFFFFF", secondary: "#004B87", description: "Gold jersey" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 8,
      losses: 6,
    },
    ranking: 2,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/f/d/4/fd407484-95cb-4351-a188-466d6d7e974e.gif",
    stadium: "Brady Family Stadium",
    headCoach: "Patrick Walsh",
    offensiveCoordinator: "Mike Crist",
    defensiveCoordinator: "Brian Loncar",
    offensiveSystem: "Multiple Offense",
    defensiveSystem: "3-3-5 Defense",
    commonPlays: ["Pistol Formation", "Jet Sweep", "Curl Route", "Draw Play"],
    strengths: ["Versatile schemes", "Fast linebackers", "Red zone efficiency"],
    keyPlayers: ["RB Iziah Singleton #22", "TE Jace Cannon #88", "WR Jaiden Tinson #1"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "PadreFootball",
      instagram: "serra_football",
      maxpreps: "https://www.maxpreps.com/ca/san-mateo/junipero-serra-padres/football/",
      hudl: "https://www.hudl.com/team/3724/Serra-High-School",
      youtube: "@SerraHighSchool",
      website: "https://www.serrahs.com/athletics",
    },
  },
  {
    id: "st-francis",
    name: "Saint Francis",
    mascot: "Lancers",
    colors: {
      primary: "#0033A0",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#0033A0", secondary: "#FFFFFF", description: "Blue jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0033A0", description: "White jersey with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#0033A0", description: "Gray alternate" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 5,
      losses: 6,
    },
    ranking: 4,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/c/8/c/c8cf2438-517f-4458-97f3-181588691f16.gif",
    stadium: "Ron Calcagno Stadium",
    headCoach: "Greg Calcagno",
    offensiveCoordinator: "Brandon Gamble",
    defensiveCoordinator: "Mark Grieb",
    offensiveSystem: "Pro-Style Offense",
    defensiveSystem: "3-4 Defense",
    commonPlays: ["Power Run", "Deep Post", "Screen Pass", "Boot Action"],
    strengths: ["Physical run game", "Strong defensive line", "Special teams excellence"],
    keyPlayers: ["RB Kingston Keanaaina #22", "OL John Fifita #77", "QB Trent Knight #12"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "SF_LancerFB",
      instagram: "sfhslancerfootball",
      maxpreps: "https://www.maxpreps.com/ca/mountain-view/saint-francis-lancers/football/",
      hudl: "https://www.hudl.com/team/2476/St-Francis-High-School",
      youtube: "@StFrancisLancers",
      website: "https://www.sfhs.com/athletics",
    },
  },
  {
    id: "st-ignatius",
    name: "St. Ignatius",
    mascot: "Wildcats",
    colors: {
      primary: "#990033",
      secondary: "#FFCC00",
    },
    uniforms: {
      home: { primary: "#990033", secondary: "#FFCC00", description: "Maroon jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#990033", description: "White jersey with maroon" },
      alternate: { primary: "#FFCC00", secondary: "#990033", description: "Gold jersey" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 5,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/b/1/e/b1e7f7b2-039c-4861-9c32-e0c90967885b.gif",
    stadium: "J.B. Murphy Field",
    headCoach: "Lenny Vandermade",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-2-5",
    commonPlays: ["Inside Zone", "RPO"],
    strengths: ["Balanced attack", "Strong line play"],
    keyPlayers: ["QB Soren Hummel #18", "RB Jarious Hogan #6", "OLB Daniel Leupold #7"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "SI_Football",
      instagram: "si_football",
      maxpreps: "https://www.maxpreps.com/ca/san-francisco/st-ignatius-wildcats/football/",
      hudl: "https://www.hudl.com/team/3834/St-Ignatius-College-Preparatory",
      youtube: "@StIgnatiusSF",
      website: "https://www.siprep.org/athletics",
    },
  },
  {
    id: "mitty",
    name: "Archbishop Mitty",
    mascot: "Monarchs",
    colors: {
      primary: "#FF6600",
      secondary: "#000000",
    },
    uniforms: {
      home: { primary: "#FF6600", secondary: "#000000", description: "Orange jersey with black" },
      away: { primary: "#FFFFFF", secondary: "#FF6600", description: "White jersey with orange" },
      alternate: { primary: "#000000", secondary: "#FF6600", description: "Black jersey" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 6,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/5/5/3/553381a1-94d9-4d37-8e6d-e46538968492.gif",
    stadium: "Mitty Field",
    headCoach: "Danny Sullivan",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Multiple",
    defensiveSystem: "4-3",
    commonPlays: ["Inside Zone", "Power"],
    strengths: ["Disciplined execution", "Strong tradition"],
    keyPlayers: [
      "RB Lazaro Faraj-Washington #21",
      "QB Jonah Kroenung #10",
      "RB/DL Caden Eagleson #24",
    ],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "MittyFootball",
      instagram: "mittyfootball",
      maxpreps: "https://www.maxpreps.com/ca/san-jose/archbishop-mitty-monarchs/football/",
      hudl: "https://www.hudl.com/team/2427/Archbishop-Mitty-High-School",
      youtube: "@ArchbishopMittyHS",
      website: "https://www.mitty.com/athletics",
    },
  },
  {
    id: "valley-christian",
    name: "Valley Christian",
    mascot: "Warriors",
    colors: {
      primary: "#0066CC",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White jersey with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Gold alternate" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 10,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/c/4/c/c4c6e9a1-067a-4d37-8e6d-e46538968492.gif",
    stadium: "Valley Christian Stadium",
    headCoach: "Mike Machado",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Multiple",
    defensiveSystem: "4-2-5",
    commonPlays: ["Power", "Counter"],
    strengths: ["Physicality", "Strong defense"],
    keyPlayers: ["OL Champ Taulealea #75", "TE/DE Colton Hider #88", "RB/DB Micah Mosley #5"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "VC_Football",
      instagram: "vchsfbc",
      maxpreps: "https://www.maxpreps.com/ca/san-jose/valley-christian-warriors/football/",
      hudl: "https://www.hudl.com/team/2500/Valley-Christian-High-School",
      youtube: "@ValleyChristianSchools",
      website: "https://www.vcs.net/athletics",
    },
  },
  {
    id: "bellarmine",
    name: "Bellarmine",
    mascot: "Bells",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon trim" },
      alternate: { primary: "#FFFFFF", secondary: "#8B0000", description: "Gold jersey" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 16,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/2/8/0/280049a1-77d9-4d37-8e6d-e46538968492.gif",
    stadium: "Memorial Field",
    headCoach: "Jalal Beauchman",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["Zone Read", "Slant"],
    strengths: ["Passing game", "Athleticism"],
    keyPlayers: ["QB Dominic Sotelo #7", "LB/RB Nico Tatom #4", "OT Richard Steele #77"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "BellsFootball",
      instagram: "bellarminefootball",
      maxpreps: "https://www.maxpreps.com/ca/san-jose/bellarmine-college-prep-bells/football/",
      hudl: "https://www.hudl.com/team/2429/Bellarmine-College-Preparatory",
      youtube: "@BellarmineCollegePrep",
      website: "https://www.bcp.org/athletics",
    },
  },
  {
    id: "sacred-heart",
    name: "Sacred Heart Cathedral",
    mascot: "Fighting Irish",
    colors: {
      primary: "#228B22",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFCC00", description: "Red jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with red trim" },
      alternate: { primary: "#FFCC00", secondary: "#8B0000", description: "Gold jersey" },
    },
    league: "West Catholic Athletic League",
    division: "Bay Foothill League - Division I",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 8,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/b/9/a/b9af99a1-8f7a-4d37-8e6d-e46538968492.gif",
    stadium: "Kezar Stadium",
    headCoach: "Antoine Evans",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["RPO", "Bubble Screen"],
    strengths: ["Speed", "Athleticism"],
    keyPlayers: ["QB Michael Sargent #15", "RB/SS Legend Williams #6", "DE/TE Mickey Williams #8"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "SHC_Football",
      instagram: "shc_football",
      maxpreps:
        "https://www.maxpreps.com/ca/san-francisco/sacred-heart-cathedral-prep-fighting-irish/football/",
      hudl: "https://www.hudl.com/team/3836/Sacred-Heart-Cathedral-Preparatory",
      youtube: "@SacredHeartCathedralPrep",
      website: "https://www.shcp.edu/athletics",
    },
  },
  {
    id: "los-gatos",
    name: "Los Gatos",
    mascot: "Wildcats",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Dark blue with white" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Orange alternate" },
    },
    league: "Peninsula Athletic League - Bay",
    division: "Peninsula Athletic League - Bay",
    record: {
      wins: 11,
      losses: 3,
    },
    ranking: 3,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/5/8/4/584f2438-517f-4458-97f3-181588691f16.gif",
    stadium: "Helm Field",
    headCoach: "Mark Krail",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "West Coast",
    defensiveSystem: "4-3",
    commonPlays: ["Quick Slant", "Sprint Out"],
    strengths: ["Precision", "Tradition"],
    keyPlayers: ["RB Grayson Doslak #24", "WR Max Thomas #8", "QB Luca Salimi #10"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "LG_Football",
      instagram: "lgwildcatfootball",
      maxpreps: "https://www.maxpreps.com/ca/los-gatos/los-gatos-wildcats/football/",
    },
  },
  {
    id: "wilcox",
    name: "Wilcox",
    mascot: "Chargers",
    colors: {
      primary: "#000066",
      secondary: "#FFCC00",
    },
    uniforms: {
      home: { primary: "#000066", secondary: "#FFCC00", description: "Navy jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#000066", description: "White jersey with navy trim" },
      alternate: { primary: "#FFCC00", secondary: "#000066", description: "Gold alternate" },
    },
    league: "Peninsula Athletic League - Bay",
    division: "Peninsula Athletic League - Bay",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 13,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/6/8/4/684f2438-517f-4458-97f3-181588691f16.gif",
    stadium: "Wilcox High Stadium",
    headCoach: "Paul Rosa",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Double Wing",
    defensiveSystem: "5-2",
    commonPlays: ["Power", "Counter"],
    strengths: ["Run game", "Physicality"],
    keyPlayers: ["RB/FS Brayden Rosa #2", "CB/WR Jeremiah Arevalos #8", "QB Kai Imahara #11"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "WilcoxFootball",
      instagram: "wilcox_football",
      maxpreps: "https://www.maxpreps.com/ca/santa-clara/wilcox-chargers/football/",
      hudl: "https://www.hudl.com/team/2494/Wilcox-High-School",
      youtube: "@WilcoxHS",
      website: "https://wilcox.scusd.net/athletics",
    },
  },
  {
    id: "palo-alto",
    name: "Palo Alto",
    mascot: "Vikings",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy trim" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Orange alternate" },
    },
    league: "Peninsula Athletic League - Bay",
    division: "Peninsula Athletic League - Bay",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 31,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/7/8/4/784f2438-517f-4458-97f3-181588691f16.gif",
    stadium: "Viking Stadium",
    headCoach: "Danny Sullivan",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["Inside Zone", "Slant"],
    strengths: ["Balanced attack", "Strong secondary"],
    keyPlayers: ["QB Justin Fung #2", "WR Kacey Washington #3", "TE Malcolm Phillips #22"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "PalyFootball",
      instagram: "palyfootball",
      maxpreps: "https://www.maxpreps.com/ca/palo-alto/palo-alto-vikings/football/",
      hudl: "https://www.hudl.com/team/2486/Palo-Alto-High-School",
      youtube: "@palyathletics",
      website: "https://paly.net/athletics",
    },
  },
  {
    id: "menlo-atherton",
    name: "Menlo-Atherton",
    mascot: "Bears",
    colors: {
      primary: "#003366",
      secondary: "#FFCC00",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFCC00", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFCC00", secondary: "#003366", description: "Gold jersey" },
    },
    league: "Peninsula Athletic League - Bay",
    division: "Peninsula Athletic League - Bay",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 12,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/4/8/4/484f2438-517f-4458-97f3-181588691f16.gif",
    stadium: "Coach Parks Field",
    headCoach: "Chris Saunders",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-2-5",
    commonPlays: ["Zone Read", "Deep Post"],
    strengths: ["Athleticism", "Speed"],
    keyPlayers: ["QB Teddy Dacey #10", "WR Jacob Roeder #2", "RB Monty Turner #33"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "MA_Football",
      instagram: "ma_football",
      maxpreps: "https://www.maxpreps.com/ca/atherton/menlo-atherton-bears/football/",
    },
  },
  {
    id: "christopher",
    name: "Christopher",
    mascot: "Cougars",
    colors: {
      primary: "#000080",
      secondary: "#00BFFF",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Orange jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 22,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/2/c/3/2c3381a1-94d9-4d37-8e6d-e46538968492.gif",
    stadium: "Christopher High Stadium",
    headCoach: "Darren Yafai",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["Inside Zone", "Bubble Screen"],
    strengths: ["Athletic playmakers", "Strong defense"],
    keyPlayers: ["QB John Schalesky #12", "MLB Josiah Orta #8", "OLB Aiden Swann #4"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "CHS_CougarFB",
      instagram: "christopherhighfootball",
      maxpreps: "https://www.maxpreps.com/ca/gilroy/christopher-cougars/football/",
    },
  },
  {
    id: "leigh",
    name: "Leigh",
    mascot: "Longhorns",
    colors: {
      primary: "#8B4513",
      secondary: "#FFA500",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 21,
    image: "https://vcloud.blueframe.com/secure/image/628151",
    stadium: "Leigh High Stadium",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["Zone Read"],
    strengths: ["Speed", "Versatility"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "LeighFootball",
      instagram: "leighfootball",
    },
  },
  {
    id: "leland",
    name: "Leland",
    mascot: "Chargers",
    colors: {
      primary: "#000080",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFD700", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFD700", secondary: "#003366", description: "Gold jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 32,
    image: "https://vcloud.blueframe.com/secure/image/628153",
    stadium: "Leland High Stadium",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "4-3",
    commonPlays: ["Pass-heavy"],
    strengths: ["Quarterback play"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "LelandFootball",
      instagram: "lelandfootball",
    },
  },
  {
    id: "oak-grove",
    name: "Oak Grove",
    mascot: "Eagles",
    colors: {
      primary: "#000080",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#228B22", secondary: "#FFFFFF", description: "Forest green with white" },
      away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green trim" },
      alternate: { primary: "#FFFFFF", secondary: "#228B22", description: "Gold jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 38,
    image:
      "https://dw3jhbqsbya58.cloudfront.net/fit-in/256x256/school-mascot/4/c/3/4c3381a1-94d9-4d37-8e6d-e46538968492.gif",
    stadium: "Oak Grove Stadium",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Power Run",
    defensiveSystem: "5-2",
    commonPlays: ["Power", "Blast"],
    strengths: ["Physicality", "Tradition"],
    keyPlayers: ["QB Jordan McCoy #5", "RB Aaron Wiley #7", "RB Kaleb Fries #10"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "OG_Football",
      instagram: "oakgrovefootball",
      maxpreps: "https://www.maxpreps.com/ca/san-jose/oak-grove-eagles/football/",
    },
  },
  {
    id: "salinas",
    name: "Salinas",
    mascot: "Cowboys",
    colors: {
      primary: "#8B0000",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Orange-red with black" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with orange trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "PCAL - Gabilan",
    division: "PCAL - Gabilan",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 9,
    image: "https://vcloud.blueframe.com/secure/image/628193",
    stadium: "Salinas High Stadium",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Multiple",
    defensiveSystem: "4-3",
    commonPlays: ["Balanced"],
    strengths: ["Strong program", "Physical play"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "SalinasFootball",
      instagram: "salinasfootball",
    },
  },
  {
    id: "palma",
    name: "Palma",
    mascot: "Chieftains",
    colors: {
      primary: "#8B0000",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#228B22", secondary: "#FFD700", description: "Green jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#228B22", description: "White jersey with green" },
      alternate: { primary: "#FFD700", secondary: "#228B22", description: "Gold jersey" },
    },
    league: "PCAL - Gabilan",
    division: "PCAL - Gabilan",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 7,
    image: "https://vcloud.blueframe.com/secure/image/628173",
    stadium: "Rabobank Stadium",
    headCoach: "Jeff Carnazzo",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Power Run",
    defensiveSystem: "4-3",
    commonPlays: ["Power", "Toss"],
    strengths: ["Discipline", "Physical line play"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "PalmaFootball",
      instagram: "palmafootball",
    },
  },
  {
    id: "aptos",
    name: "Aptos",
    mascot: "Mariners",
    colors: {
      primary: "#000080",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon with white" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon" },
      alternate: { primary: "#FFFFFF", secondary: "#8B0000", description: "Gold jersey" },
    },
    league: "SCCAL",
    division: "SCCAL",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 27,
    image: "https://vcloud.blueframe.com/secure/image/628111",
    stadium: "Trevethan Field",
    headCoach: "Randy Blankenship",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Wing-T",
    defensiveSystem: "4-3",
    commonPlays: ["Buck Sweep", "Trap"],
    strengths: ["Precision", "Run game"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "AptosFootball",
      instagram: "aptosfootball",
    },
  },
  {
    id: "sacred-heart-prep",
    name: "Sacred Heart Prep",
    mascot: "Gators",
    colors: {
      primary: "#006400",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFCC00", description: "Red jersey with gold" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with red trim" },
      alternate: { primary: "#FFCC00", secondary: "#8B0000", description: "Gold jersey" },
    },
    league: "PAL - Bay",
    division: "PAL - Bay",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://vcloud.blueframe.com/secure/image/628101",
    stadium: "SHP Stadium",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "Spread",
    defensiveSystem: "3-4",
    commonPlays: ["Inside Zone"],
    strengths: ["Coaching", "Execution"],
    keyPlayers: ["N/A"],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
    socials: {
      twitter: "SHP_Football",
      instagram: "shpfootball",
    },
  },
  {
    id: "andrew-hill",
    name: "Andrew Hill",
    mascot: "Falcons",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#000000", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#000000", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 48,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "branham",
    name: "Branham",
    mascot: "Bruins",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#8B3A00", secondary: "#FFFFFF", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#8B3A00", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#8B3A00", description: "Gold jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 18,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "del-mar",
    name: "Del Mar",
    mascot: "Dons",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Navy jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 40,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "evergreen-valley",
    name: "Evergreen Valley",
    mascot: "Cougars",
    colors: {
      primary: "Green",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#228B22", secondary: "#FFFFFF", description: "Green jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green trim" },
      alternate: { primary: "#FFFFFF", secondary: "#228B22", description: "Gold jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 43,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "gunderson",
    name: "Gunderson",
    mascot: "Grizzlies",
    colors: {
      primary: "Green",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 25,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "independence",
    name: "Independence",
    mascot: "76ers",
    colors: {
      primary: "Red",
      secondary: "Blue",
    },
    uniforms: {
      home: { primary: "#228B22", secondary: "#FFFFFF", description: "Green jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#228B22", description: "White with green trim" },
      alternate: { primary: "#FFFFFF", secondary: "#228B22", description: "Gold jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 42,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "james-lick",
    name: "James Lick",
    mascot: "Comets",
    colors: {
      primary: "Orange",
      secondary: "Black",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 47,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "lincoln",
    name: "Lincoln",
    mascot: "Lions",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#000066", secondary: "#FFCC00", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#000066", description: "White with navy" },
      alternate: { primary: "#FFCC00", secondary: "#000066", description: "Gold jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 14,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "live-oak",
    name: "Live Oak",
    mascot: "Acorns",
    colors: {
      primary: "Green",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Orange jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 15,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "mt-pleasant",
    name: "Mt. Pleasant",
    mascot: "Cardinals",
    colors: {
      primary: "Red",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#FF6600", secondary: "#FFFFFF", description: "Orange-red with white" },
      away: { primary: "#FFFFFF", secondary: "#FF6600", description: "White with orange trim" },
      alternate: { primary: "#FFFFFF", secondary: "#FF6600", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 45,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "overfelt",
    name: "Overfelt",
    mascot: "Royals",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 29,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "piedmont-hills",
    name: "Piedmont Hills",
    mascot: "Pirates",
    colors: {
      primary: "Maroon",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFD700", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFD700", secondary: "#003366", description: "Gold jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 23,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "pioneer",
    name: "Pioneer",
    mascot: "Mustangs",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Orange jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 28,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "prospect",
    name: "Prospect",
    mascot: "Panthers",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFD700", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFD700", secondary: "#003366", description: "Gold jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 39,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "san-jose",
    name: "San Jose",
    mascot: "Bulldogs",
    colors: {
      primary: "Red",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 33,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "santa-teresa",
    name: "Santa Teresa",
    mascot: "Saints",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#2D5016", secondary: "#FFD700", description: "Green with gold" },
      away: { primary: "#FFFFFF", secondary: "#2D5016", description: "White with green" },
      alternate: { primary: "#FFD700", secondary: "#2D5016", description: "Gold jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 11,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "silver-creek",
    name: "Silver Creek",
    mascot: "Raiders",
    colors: {
      primary: "Silver",
      secondary: "Blue",
    },
    uniforms: {
      home: { primary: "#C0C0C0", secondary: "#000000", description: "Silver with black" },
      away: { primary: "#FFFFFF", secondary: "#C0C0C0", description: "White with silver" },
      alternate: { primary: "#000000", secondary: "#C0C0C0", description: "Black jersey" },
    },
    league: "BVAL - Mt. Hamilton",
    division: "BVAL - Mt. Hamilton",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 30,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "sobrato",
    name: "Sobrato",
    mascot: "Bulldogs",
    colors: {
      primary: "Maroon",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#8B4513", secondary: "#FFFFFF", description: "Brown with white" },
      away: { primary: "#FFFFFF", secondary: "#8B4513", description: "White with brown" },
      alternate: { primary: "#FFFFFF", secondary: "#8B4513", description: "Gold jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 24,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "westmont",
    name: "Westmont",
    mascot: "Warriors",
    colors: {
      primary: "Red",
      secondary: "Blue",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Orange jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 35,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "willow-glen",
    name: "Willow Glen",
    mascot: "Rams",
    colors: {
      primary: "Red",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Red jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "White with red trim" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Black jersey" },
    },
    league: "BVAL - Santa Teresa",
    division: "BVAL - Santa Teresa",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 20,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "yerba-buena",
    name: "Yerba Buena",
    mascot: "Aztecs",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFD700", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFD700", secondary: "#003366", description: "Gold jersey" },
    },
    league: "BVAL - West Valley",
    division: "BVAL - West Valley",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 36,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "cupertino",
    name: "Cupertino",
    mascot: "Pioneers",
    colors: {
      primary: "Red",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Gold jersey" },
    },
    league: "SCVAL - El Camino",
    division: "SCVAL - El Camino",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 46,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "fremont",
    name: "Fremont",
    mascot: "Firebirds",
    colors: {
      primary: "Red",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#FF6600", secondary: "#000000", description: "Orange with black" },
      away: { primary: "#FFFFFF", secondary: "#FF6600", description: "White with orange" },
      alternate: { primary: "#000000", secondary: "#FF6600", description: "Black jersey" },
    },
    league: "SCVAL - El Camino",
    division: "SCVAL - El Camino",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 37,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "gunn",
    name: "Gunn",
    mascot: "Titans",
    colors: {
      primary: "Red",
      secondary: "Black",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Orange jersey" },
    },
    league: "SCVAL - El Camino",
    division: "SCVAL - El Camino",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 44,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "homestead",
    name: "Homestead",
    mascot: "Mustangs",
    colors: {
      primary: "Green",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Gold jersey" },
    },
    league: "SCVAL - De Anza",
    division: "SCVAL - De Anza",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 26,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "los-altos",
    name: "Los Altos",
    mascot: "Eagles",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFFFFF", description: "Maroon with white" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "White with maroon" },
      alternate: { primary: "#FFFFFF", secondary: "#8B0000", description: "Gold jersey" },
    },
    league: "SCVAL - De Anza",
    division: "SCVAL - De Anza",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 34,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "monta-vista",
    name: "Monta Vista",
    mascot: "Matadors",
    colors: {
      primary: "Green",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#4B0082", secondary: "#FFFFFF", description: "Purple jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#4B0082", description: "White with purple trim" },
      alternate: { primary: "#FFFFFF", secondary: "#4B0082", description: "Gold jersey" },
    },
    league: "SCVAL - De Anza",
    division: "SCVAL - De Anza",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 41,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "north-salinas",
    name: "North Salinas",
    mascot: "Vikings",
    colors: {
      primary: "Purple",
      secondary: "White",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Navy with gold" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "White with navy" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Gold jersey" },
    },
    league: "PCAL - Gabilan",
    division: "PCAL - Gabilan",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 17,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "santa-clara-high",
    name: "Santa Clara High",
    mascot: "Bruins",
    colors: {
      primary: "Blue",
      secondary: "Gold",
    },
    uniforms: {
      home: { primary: "#0066CC", secondary: "#FFFFFF", description: "Blue jersey with white" },
      away: { primary: "#FFFFFF", secondary: "#0066CC", description: "White with blue trim" },
      alternate: { primary: "#FFFFFF", secondary: "#0066CC", description: "Gold jersey" },
    },
    league: "SCVAL - Santa Clara Valley Athletic League",
    division: "SCVAL",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: GENERIC_LOGO,
    stadium: "N/A",
    headCoach: "N/A",
    offensiveCoordinator: "N/A",
    defensiveCoordinator: "N/A",
    offensiveSystem: "N/A",
    defensiveSystem: "N/A",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "gilroy",
    name: "Gilroy",
    mascot: "Mustangs",
    colors: {
      primary: "#FF0000",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#CC0000", secondary: "#FFFFFF", description: "Gilroy home uniform" },
      away: { primary: "#FFFFFF", secondary: "#CC0000", description: "Gilroy away uniform" },
      alternate: { primary: "#FFFFFF", secondary: "#CC0000", description: "Gilroy alternate uniform" },
    },
    league: "PCAL - Cypress",
    division: "PCAL - Cypress",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
    stadium: "Gavilan College",
    headCoach: "TBD",
    offensiveCoordinator: "TBD",
    defensiveCoordinator: "TBD",
    offensiveSystem: "TBD",
    defensiveSystem: "TBD",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "morgan-hill",
    name: "Morgan Hill",
    mascot: "Nobles",
    colors: {
      primary: "#003366",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#003366", secondary: "#FFFFFF", description: "Morgan Hill home uniform" },
      away: { primary: "#FFFFFF", secondary: "#003366", description: "Morgan Hill away uniform" },
      alternate: { primary: "#FFFFFF", secondary: "#003366", description: "Morgan Hill alternate uniform" },
    },
    league: "PCAL - Cypress",
    division: "PCAL - Cypress",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
    stadium: "Morgan Hill High",
    headCoach: "TBD",
    offensiveCoordinator: "TBD",
    defensiveCoordinator: "TBD",
    offensiveSystem: "TBD",
    defensiveSystem: "TBD",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "san-martin",
    name: "San Martin",
    mascot: "Eagles",
    colors: {
      primary: "#2E7D32",
      secondary: "#FFFFFF",
    },
    uniforms: {
      home: { primary: "#2D5016", secondary: "#FFFFFF", description: "San Martin home uniform" },
      away: { primary: "#FFFFFF", secondary: "#2D5016", description: "San Martin away uniform" },
      alternate: { primary: "#FFFFFF", secondary: "#2D5016", description: "San Martin alternate uniform" },
    },
    league: "PCAL - Cypress",
    division: "PCAL - Cypress",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
    stadium: "San Martin High",
    headCoach: "TBD",
    offensiveCoordinator: "TBD",
    defensiveCoordinator: "TBD",
    offensiveSystem: "TBD",
    defensiveSystem: "TBD",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "tennessee-williams",
    name: "Tennessee Williams",
    mascot: "Wildcats",
    colors: {
      primary: "#FFD700",
      secondary: "#000000",
    },
    uniforms: {
      home: { primary: "#FFD700", secondary: "#000000", description: "Tennessee Williams home uniform" },
      away: { primary: "#FFFFFF", secondary: "#FFD700", description: "Tennessee Williams away uniform" },
      alternate: { primary: "#000000", secondary: "#FFD700", description: "Tennessee Williams alternate uniform" },
    },
    league: "PCAL - Cypress",
    division: "PCAL - Cypress",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
    stadium: "Tennessee Williams High",
    headCoach: "TBD",
    offensiveCoordinator: "TBD",
    defensiveCoordinator: "TBD",
    offensiveSystem: "TBD",
    defensiveSystem: "TBD",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
  {
    id: "east-palo-alto",
    name: "East Palo Alto",
    mascot: "Jaguars",
    colors: {
      primary: "#8B0000",
      secondary: "#FFD700",
    },
    uniforms: {
      home: { primary: "#8B0000", secondary: "#FFD700", description: "East Palo Alto home uniform" },
      away: { primary: "#FFFFFF", secondary: "#8B0000", description: "East Palo Alto away uniform" },
      alternate: { primary: "#FFD700", secondary: "#8B0000", description: "East Palo Alto alternate uniform" },
    },
    league: "PAL",
    division: "PAL",
    record: {
      wins: 0,
      losses: 0,
    },
    ranking: 999,
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=200&h=200&q=80",
    stadium: "Ravenswood High",
    headCoach: "TBD",
    offensiveCoordinator: "TBD",
    defensiveCoordinator: "TBD",
    offensiveSystem: "TBD",
    defensiveSystem: "TBD",
    commonPlays: [],
    strengths: [],
    keyPlayers: [],
    levels: {
      varsity: {
        wins: 0,
        losses: 0,
      },
      jv: {
        wins: 0,
        losses: 0,
      },
      freshman: {
        wins: 0,
        losses: 0,
      },
    },
  },
];

function getTeamInitials(teamName: string) {
  const words = teamName
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 2) {
    const first = words[0]?.[0] ?? "";
    const second = words[1]?.[0] ?? "";
    return (first + second).toUpperCase() || "CC";
  }

  if (words.length === 1) return (words[0]?.slice(0, 2) ?? "CC").toUpperCase();
  return "CC";
}

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createTeamPlaceholderLogo(team: Pick<Team, "name" | "colors">) {
  const primary = team.colors?.primary || "#111827";
  const secondary = team.colors?.secondary || "#3b82f6";
  const initials = getTeamInitials(team.name);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${primary}"/>
      <stop offset="1" stop-color="${secondary}"/>
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="240" height="240" rx="48" fill="url(#g)"/>
  <rect x="16" y="16" width="224" height="224" rx="40" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="8"/>
  <text x="128" y="140" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="88" font-weight="900" fill="rgba(255,255,255,0.95)" letter-spacing="2">${initials}</text>
</svg>`;

  return svgToDataUri(svg);
}

const LEAGUE_NAME_ALIASES: Record<string, string> = {
  "West Catholic Athletic League": "WCAL",
  "West Catholic": "WCAL",

  "Peninsula Athletic League": "PAL",
  Peninsula: "PAL",

  "Pacific Coast": "PCAL",

  "Santa Teresa": "BVAL - Santa Teresa",
  "West Valley": "BVAL - West Valley",
  "Mount Hamilton": "BVAL - Mount Hamilton",
};

function normalizeLeagueName(name: string) {
  const trimmed = name.trim();
  return LEAGUE_NAME_ALIASES[trimmed] ?? trimmed;
}

function deriveLeagueAndDivision(leagueRaw: string): Pick<Team, "league" | "division"> {
  const raw = leagueRaw.trim();
  if (!raw) return { league: "Independent", division: "Independent" };

  const parts = raw
    .split(" - ")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const league = normalizeLeagueName(parts[0] ?? raw);
    const suffix = parts.slice(1).join(" - ");
    return { league, division: `${league} - ${suffix}` };
  }

  const league = normalizeLeagueName(raw);
  return { league, division: league };
}

export const teams: Team[] = baseTeams.map((team) => {
  const mp = maxprepsTeamData[team.id] ?? {};

  const { league, division } = deriveLeagueAndDivision(mp.leagueName ?? team.league);

  const mergedImage = mp.schoolMascotUrl ?? team.image;
  const image =
    !mergedImage || mergedImage === GENERIC_LOGO ? createTeamPlaceholderLogo(team) : mergedImage;

  return {
    ...team,
    league,
    division,
    image,
    socials: {
      ...team.socials,
      maxpreps: mp.maxprepsUrl ?? team.socials?.maxpreps,
    },
    stateRank: mp.stateRank ?? team.stateRank,
    record: mp.record ?? team.record,
    pointsFor: mp.pointsFor ?? team.pointsFor,
    pointsAgainst: mp.pointsAgainst ?? team.pointsAgainst,
    streak: mp.streak ?? team.streak,
    lastUpdated: mp.lastUpdated ?? team.lastUpdated,
  };
});
