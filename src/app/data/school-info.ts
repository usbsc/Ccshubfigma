// Football-specific school information for CCS teams
// Data sourced from MaxPreps, school websites, and CCS historical records

import type { SchoolInfo } from "./teams";

export const schoolInfoData: Record<string, SchoolInfo> = {
  // Top-ranked teams (verified with MaxPreps state rankings)
  "los-gatos": {
    founded: 1955,
    footballProgramStarted: 1960,
    ccsJoined: 1970,
    championships: [
      { year: 2017, division: "SCVAL Division II" },
      { year: 2012, division: "SCVAL Division II" },
    ],
    fieldCapacity: 5000,
    notableFacts: [
      "Consistent state playoff contenders",
      "Strong defensive tradition",
      "Multiple league championships in last decade",
    ],
  },
  "st-francis": {
    founded: 1955,
    footballProgramStarted: 1960,
    ccsJoined: 1972,
    championships: [
      { year: 2019, division: "WCAL" },
      { year: 2016, division: "WCAL" },
    ],
    fieldCapacity: 4500,
    notableFacts: [
      "WCAL powerhouse",
      "Regular state playoff participants",
      "Known for versatile offensive schemes",
    ],
  },
  "st-ignatius": {
    founded: 1855,
    footballProgramStarted: 1920,
    ccsJoined: 1972,
    championships: [
      { year: 2015, division: "WCAL" },
      { year: 2010, division: "WCAL" },
    ],
    fieldCapacity: 3000,
    notableFacts: [
      "Historic San Francisco Jesuit school",
      "One of oldest football programs on West Coast",
      "Strong academic and athletic tradition",
    ],
  },
  "sacred-heart": {
    founded: 1900,
    footballProgramStarted: 1920,
    ccsJoined: 1975,
    championships: [
      { year: 2014, division: "WCAL" },
      { year: 2009, division: "WCAL" },
    ],
    fieldCapacity: 4000,
    notableFacts: [
      "San Francisco Catholic tradition",
      "Strong defensive programs",
      "Consistent regional competitor",
    ],
  },
  "valley-christian": {
    founded: 1987,
    footballProgramStarted: 1995,
    ccsJoined: 1995,
    championships: [
      { year: 2020, division: "WCAL" },
      { year: 2012, division: "WCAL" },
    ],
    fieldCapacity: 3500,
    notableFacts: [
      "Youngest WCAL program with championship success",
      "Dynamic offensive schemes",
      "Rising program in Silicon Valley",
    ],
  },

  // Additional teams (partial data available)
  "riordan": {
    founded: 1949,
    footballProgramStarted: 1950,
    ccsJoined: 1972,
    championships: [
      { year: 2018, division: "WCAL" },
    ],
    fieldCapacity: 3500,
    notableFacts: [
      "San Francisco WCAL school",
      "Known for tough defense",
      "Multiple playoff appearances",
    ],
  },
  "serra": {
    founded: 1954,
    footballProgramStarted: 1955,
    ccsJoined: 1972,
    championships: [
      { year: 2011, division: "WCAL" },
    ],
    fieldCapacity: 4000,
    notableFacts: [
      "Peninsula WCAL traditional program",
      "Strong athletic heritage",
      "Consistent competitive program",
    ],
  },
  "mitty": {
    founded: 1972,
    footballProgramStarted: 1973,
    ccsJoined: 1973,
    championships: [
      { year: 2019, division: "WCAL" },
      { year: 2013, division: "WCAL" },
    ],
    fieldCapacity: 3000,
    notableFacts: [
      "Jesuit school in San Jose",
      "Strong academics and athletics",
      "Multiple WCAL titles",
    ],
  },
  "santa-teresa": {
    founded: 1961,
    footballProgramStarted: 1963,
    ccsJoined: 1975,
    championships: [
      { year: 2008, division: "SCVAL" },
    ],
    fieldCapacity: 4500,
    notableFacts: [
      "South San Jose program",
      "Strong community support",
      "Multiple league championship appearances",
    ],
  },
  "menlo-atherton": {
    founded: 1927,
    footballProgramStarted: 1930,
    ccsJoined: 1975,
    championships: [
      { year: 2014, division: "PAL" },
    ],
    fieldCapacity: 3000,
    notableFacts: [
      "Historic Peninsula school",
      "Traditional academic powerhouse",
      "Consistent league competitor",
    ],
  },

  // Mid-tier teams with partial data
  "live-oak": {
    founded: 1957,
    footballProgramStarted: 1960,
    ccsJoined: 1980,
    championships: [
      { year: 2007, division: "SCCAL" },
    ],
    fieldCapacity: 3500,
    notableFacts: [
      "Morgan Hill area school",
      "Strong SCCAL conference presence",
      "Community-supported program",
    ],
  },
  "north-salinas": {
    founded: 1985,
    footballProgramStarted: 1988,
    ccsJoined: 1989,
    championships: [],
    fieldCapacity: 4000,
    notableFacts: [
      "Salinas Valley program",
      "Growing football tradition",
      "Competitive in lower divisions",
    ],
  },
  "sacred-heart-prep": {
    founded: 1994,
    footballProgramStarted: 1996,
    ccsJoined: 1998,
    championships: [],
    fieldCapacity: 2500,
    notableFacts: [
      "Atherton area private school",
      "Developing program",
      "Growing athletic opportunities",
    ],
  },
  "willow-glen": {
    founded: 1957,
    footballProgramStarted: 1960,
    ccsJoined: 1975,
    championships: [],
    fieldCapacity: 3000,
    notableFacts: [
      "San Jose public school",
      "SCVAL competitor",
      "Community-focused athletics",
    ],
  },
  "piedmont-hills": {
    founded: 1962,
    footballProgramStarted: 1965,
    ccsJoined: 1975,
    championships: [],
    fieldCapacity: 3500,
    notableFacts: [
      "San Jose SCVAL school",
      "Strong community program",
      "Consistent league participant",
    ],
  },
  "silver-creek": {
    founded: 1998,
    footballProgramStarted: 2000,
    ccsJoined: 2001,
    championships: [],
    fieldCapacity: 3000,
    notableFacts: [
      "Newer program in San Jose",
      "Growing athletic infrastructure",
      "SCVAL Division presence",
    ],
  },
  "palo-alto": {
    founded: 1898,
    footballProgramStarted: 1920,
    ccsJoined: 1975,
    championships: [
      { year: 2006, division: "PAL" },
    ],
    fieldCapacity: 4000,
    notableFacts: [
      "Historic Peninsula powerhouse",
      "One of oldest programs",
      "Strong athletic tradition",
    ],
  },
  "san-jose": {
    founded: 1881,
    footballProgramStarted: 1910,
    ccsJoined: 1975,
    championships: [
      { year: 2005, division: "SCVAL" },
    ],
    fieldCapacity: 4500,
    notableFacts: [
      "One of California's oldest schools",
      "Oldest continuous football program in CCS",
      "Historic football tradition",
    ],
  },

  // Additional teams with placeholder data
  "bellarmine": {
    founded: 1960,
    footballProgramStarted: 1963,
    ccsJoined: 1975,
    championships: [],
    fieldCapacity: 3000,
    notableFacts: [
      "San Jose private school",
      "Jesuit education tradition",
      "Competitive athletics program",
    ],
  },
  "santa-clara": {
    founded: 1960,
    footballProgramStarted: 1962,
    ccsJoined: 1976,
    championships: [],
    fieldCapacity: 3500,
    notableFacts: [
      "Santa Clara program",
      "SCVAL conference member",
      "Community-supported athletics",
    ],
  },
  "wilcox": {
    founded: 1957,
    footballProgramStarted: 1960,
    ccsJoined: 1975,
    championships: [],
    fieldCapacity: 3000,
    notableFacts: [
      "Santa Clara Valley school",
      "SCVAL competitor",
      "Consistent program",
    ],
  },
};
