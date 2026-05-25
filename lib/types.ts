export type Stage = "group" | "knockout";

export type GroupPick = "HOME" | "DRAW" | "AWAY";

export type KnockoutRound = "R32" | "R16" | "QF" | "SF" | "FINAL";

export type KnockoutPick = "HOME" | "AWAY";

export type MatchResult = GroupPick | KnockoutPick;

export type Match = {
  id: string;
  matchNumber: number;
  stage: Stage;
  round?: KnockoutRound;
  group?: string;
  kickoff?: string;
  venue?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  result?: MatchResult;
  status: "scheduled" | "live" | "final";
};

export type Entry = {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  poolCode: string;
  paid: boolean;
  groupPicks: Record<string, GroupPick>;
  knockoutPicks: Record<string, KnockoutPick>;
  tiebreakers: {
    finalHomeScore?: number;
    finalAwayScore?: number;
    goldenBootWinner?: string;
  };
  groupScore: number;
  knockoutScore: number;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
};

export type PoolSettings = {
  poolCode: string;
  groupPickDeadline: string;
  knockoutPickDeadline?: string;
  groupLocked: boolean;
  knockoutLocked: boolean;
  picksVisible: boolean;
};
