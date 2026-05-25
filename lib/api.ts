import type { Match } from "@/lib/types";

type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  stage?: string;
  group?: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: {
    winner?: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
    fullTime: { home: number | null; away: number | null };
  };
};

export async function getWorldCupMatches(): Promise<Match[]> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  const competition = process.env.FOOTBALL_DATA_COMPETITION || "WC";

  if (!apiKey) {
    throw new Error("FOOTBALL_DATA_API_KEY is not configured.");
  }

  const response = await fetch(`https://api.football-data.org/v4/competitions/${competition}/matches`, {
    headers: { "X-Auth-Token": apiKey },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Football data request failed with ${response.status}.`);
  }

  const data = (await response.json()) as { matches: FootballDataMatch[] };
  return data.matches.map(normalizeMatch);
}

function normalizeMatch(match: FootballDataMatch): Match {
  const isGroup = match.stage === "GROUP_STAGE" || Boolean(match.group);
  const result = match.score.winner
    ? match.score.winner === "HOME_TEAM"
      ? "HOME"
      : match.score.winner === "AWAY_TEAM"
        ? "AWAY"
        : "DRAW"
    : undefined;

  return {
    id: String(match.id),
    matchNumber: match.matchday || match.id,
    stage: isGroup ? "group" : "knockout",
    group: match.group,
    kickoff: match.utcDate,
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    homeScore: match.score.fullTime.home ?? undefined,
    awayScore: match.score.fullTime.away ?? undefined,
    result,
    status: match.status === "FINISHED" ? "final" : match.status === "IN_PLAY" ? "live" : "scheduled",
  };
}
