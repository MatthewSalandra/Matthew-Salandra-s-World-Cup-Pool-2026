import type { Match, PoolSettings } from "@/lib/types";

export const defaultPoolSettings: PoolSettings = {
  poolCode: process.env.NEXT_PUBLIC_POOL_CODE || "SALANDRA2026",
  groupPickDeadline: "2026-06-11T15:00:00-04:00",
  knockoutPickDeadline: undefined,
  groupLocked: false,
  knockoutLocked: false,
  picksVisible: false,
};

const groups = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Switzerland", "Qatar", "Bosnia and Herzegovina"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["United States", "Paraguay", "Australia", "Turkiye"],
  E: ["Germany", "Curacao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Tunisia", "Sweden"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Norway", "Iraq"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "Uzbekistan", "Colombia", "DR Congo"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

const pairings = [
  [0, 1],
  [2, 3],
  [0, 2],
  [1, 3],
  [0, 3],
  [1, 2],
];

export const seedGroupMatches: Match[] = Object.entries(groups).flatMap(([group, teams], groupIndex) =>
  pairings.map(([homeIndex, awayIndex], matchIndex) => ({
    id: `group-${group}-${matchIndex + 1}`,
    matchNumber: groupIndex * 6 + matchIndex + 1,
    stage: "group",
    group,
    homeTeam: teams[homeIndex],
    awayTeam: teams[awayIndex],
    status: "scheduled",
  })),
);

export const seedKnockoutMatches: Match[] = [
  ...Array.from({ length: 16 }, (_, index) => makeKnockoutMatch("R32", index + 1, 73 + index)),
  ...Array.from({ length: 8 }, (_, index) => makeKnockoutMatch("R16", index + 1, 89 + index)),
  ...Array.from({ length: 4 }, (_, index) => makeKnockoutMatch("QF", index + 1, 97 + index)),
  ...Array.from({ length: 2 }, (_, index) => makeKnockoutMatch("SF", index + 1, 101 + index)),
  makeKnockoutMatch("FINAL", 1, 104),
];

export const seedMatches = [...seedGroupMatches, ...seedKnockoutMatches];

function makeKnockoutMatch(round: Match["round"], index: number, matchNumber: number): Match {
  const priorRound = round === "R16" ? "R32" : round === "QF" ? "R16" : round === "SF" ? "QF" : "SF";
  return {
    id: `${round}-${index}`,
    matchNumber,
    stage: "knockout",
    round,
    homeTeam: round === "R32" ? `Qualifier ${index * 2 - 1}` : `Winner ${priorRound} ${index * 2 - 1}`,
    awayTeam: round === "R32" ? `Qualifier ${index * 2}` : `Winner ${priorRound} ${index * 2}`,
    status: "scheduled",
  };
}

export const goldenBootOptions = [
  "Kylian Mbappe",
  "Erling Haaland",
  "Lionel Messi",
  "Harry Kane",
  "Vinicius Junior",
  "Cristiano Ronaldo",
  "Jude Bellingham",
  "Lautaro Martinez",
  "Other",
];
