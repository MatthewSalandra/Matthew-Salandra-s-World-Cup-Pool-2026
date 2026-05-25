"use client";

import type { GroupPick, KnockoutPick, Match } from "@/lib/types";

type Props = {
  match: Match;
  locked: boolean;
  selected?: GroupPick | KnockoutPick;
  onPick: (pick: GroupPick | KnockoutPick) => void;
};

export default function MatchCard({ match, locked, selected, onPick }: Props) {
  const options =
    match.stage === "group"
      ? [
          { label: match.homeTeam, value: "HOME" },
          { label: "Draw", value: "DRAW" },
          { label: match.awayTeam, value: "AWAY" },
        ]
      : [
          { label: match.homeTeam, value: "HOME" },
          { label: match.awayTeam, value: "AWAY" },
        ];

  return (
    <article className="match-card">
      <div className="match-meta">
        Match {match.matchNumber}
        {match.group ? ` · Group ${match.group}` : ""}
        {match.round ? ` · ${match.round}` : ""}
      </div>
      <div className="teams">
        <strong>{match.homeTeam}</strong>
        <span>vs</span>
        <strong>{match.awayTeam}</strong>
      </div>
      <div className={`pick-options ${match.stage === "knockout" ? "two" : ""}`}>
        {options.map((option) => (
          <button
            className={selected === option.value ? "selected" : ""}
            disabled={locked}
            key={option.value}
            onClick={() => onPick(option.value as GroupPick | KnockoutPick)}
            title={option.label}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </article>
  );
}
