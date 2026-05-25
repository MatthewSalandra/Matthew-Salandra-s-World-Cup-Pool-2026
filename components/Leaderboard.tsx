import { compareEntries } from "@/lib/scoring";
import type { Entry } from "@/lib/types";

const sampleEntries: Entry[] = [
  {
    id: "sample-1",
    userId: "sample-1",
    displayName: "Matt",
    email: "matt@example.com",
    poolCode: "SALANDRA2026",
    paid: true,
    groupPicks: {},
    knockoutPicks: {},
    tiebreakers: { finalHomeScore: 2, finalAwayScore: 1, goldenBootWinner: "Kylian Mbappe" },
    groupScore: 0,
    knockoutScore: 0,
    totalScore: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Leaderboard() {
  const entries = [...sampleEntries].sort(compareEntries);

  return (
    <section className="leaderboard-panel">
      <div className="leaderboard-row header">
        <span>Rank</span>
        <span>Name</span>
        <span>Total</span>
        <span>Group</span>
        <span>Knockout</span>
      </div>
      {entries.map((entry, index) => (
        <div className="leaderboard-row" key={entry.id}>
          <span>{index + 1}</span>
          <strong>{entry.displayName}</strong>
          <span>{entry.totalScore}</span>
          <span>{entry.groupScore}</span>
          <span>{entry.knockoutScore}</span>
        </div>
      ))}
      <p className="muted">Real entries will replace this sample row after Firestore is connected.</p>
    </section>
  );
}
