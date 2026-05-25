import type { Entry, Match } from "@/lib/types";

export const roundPoints = {
  R32: 2,
  R16: 3,
  QF: 4,
  SF: 5,
  FINAL: 6,
} as const;

export function isGroupLocked(settingsDeadline: string, manualLock: boolean, now = new Date()) {
  return manualLock || now >= new Date(settingsDeadline);
}

export function isKnockoutLocked(settingsDeadline?: string, manualLock = false, now = new Date()) {
  if (manualLock) return true;
  if (!settingsDeadline) return false;
  return now >= new Date(settingsDeadline);
}

export function calculateGroupScore(entry: Entry, matches: Match[]) {
  return matches.reduce((score, match) => {
    if (match.stage !== "group" || match.status !== "final" || !match.result) return score;
    return entry.groupPicks[match.id] === match.result ? score + 1 : score;
  }, 0);
}

export function calculateKnockoutScore(entry: Entry, matches: Match[]) {
  return matches.reduce((score, match) => {
    if (match.stage !== "knockout" || match.status !== "final" || !match.result || !match.round) return score;
    return entry.knockoutPicks[match.id] === match.result ? score + roundPoints[match.round] : score;
  }, 0);
}

export function scoreEntry(entry: Entry, matches: Match[]) {
  const groupScore = calculateGroupScore(entry, matches);
  const knockoutScore = calculateKnockoutScore(entry, matches);
  return {
    groupScore,
    knockoutScore,
    totalScore: groupScore + knockoutScore,
  };
}

export function compareEntries(a: Entry, b: Entry) {
  return b.totalScore - a.totalScore || b.knockoutScore - a.knockoutScore || a.displayName.localeCompare(b.displayName);
}
