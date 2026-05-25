"use client";

import MatchCard from "@/components/MatchCard";
import type { KnockoutPick, Match } from "@/lib/types";
import { roundPoints } from "@/lib/scoring";

type Props = {
  matches: Match[];
  locked: boolean;
  picks: Record<string, KnockoutPick>;
  onPick: (picks: Record<string, KnockoutPick>) => void;
};

const labels = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarterfinals",
  SF: "Semifinals",
  FINAL: "Final",
};

export default function Bracket({ matches, locked, picks, onPick }: Props) {
  return (
    <section className="bracket">
      {(["R32", "R16", "QF", "SF", "FINAL"] as const).map((round) => (
        <div className="bracket-round" key={round}>
          <h2>
            {labels[round]} <span>{roundPoints[round]} pts</span>
          </h2>
          {matches
            .filter((match) => match.round === round)
            .map((match) => (
              <MatchCard
                key={match.id}
                locked={locked}
                match={match}
                selected={picks[match.id]}
                onPick={(pick) => onPick({ ...picks, [match.id]: pick as KnockoutPick })}
              />
            ))}
        </div>
      ))}
    </section>
  );
}
