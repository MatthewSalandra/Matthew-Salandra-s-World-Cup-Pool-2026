"use client";

import { useState } from "react";
import { getCurrentUser, saveTiebreakers } from "@/lib/database";
import { defaultPoolSettings, goldenBootOptions } from "@/lib/seed";

export default function TiebreakerPanel() {
  const [finalHomeScore, setFinalHomeScore] = useState<number | undefined>();
  const [finalAwayScore, setFinalAwayScore] = useState<number | undefined>();
  const [goldenBootWinner, setGoldenBootWinner] = useState("");

  async function persist(next = { finalHomeScore, finalAwayScore, goldenBootWinner }) {
    const user = await getCurrentUser();
    if (!user) return;
    await saveTiebreakers(defaultPoolSettings.poolCode, user.id, next);
  }

  return (
    <section className="tiebreaker-box">
      <h2>Tiebreakers</h2>
      <label>
        Final score
        <div className="score-inputs">
          <input
            aria-label="Final home score"
            min={0}
            onBlur={() => persist()}
            onChange={(event) => setFinalHomeScore(event.target.value === "" ? undefined : Number(event.target.value))}
            placeholder="2"
            type="number"
          />
          <span>-</span>
          <input
            aria-label="Final away score"
            min={0}
            onBlur={() => persist()}
            onChange={(event) => setFinalAwayScore(event.target.value === "" ? undefined : Number(event.target.value))}
            placeholder="1"
            type="number"
          />
        </div>
      </label>
      <label>
        Golden Boot winner
        <select
          defaultValue=""
          onChange={(event) => {
            setGoldenBootWinner(event.target.value);
            persist({ finalHomeScore, finalAwayScore, goldenBootWinner: event.target.value });
          }}
        >
          <option disabled value="">
            Select a player
          </option>
          {goldenBootOptions.map((player) => (
            <option key={player}>{player}</option>
          ))}
        </select>
      </label>
    </section>
  );
}
