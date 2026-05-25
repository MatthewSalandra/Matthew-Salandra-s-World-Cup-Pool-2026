"use client";

import { useMemo, useState } from "react";
import Bracket from "@/components/Bracket";
import Header from "@/components/Header";
import SignInPanel from "@/components/SignInPanel";
import { defaultPoolSettings, seedKnockoutMatches } from "@/lib/seed";
import { isKnockoutLocked } from "@/lib/scoring";
import type { KnockoutPick } from "@/lib/types";
import { getCurrentUser, saveKnockoutPick } from "@/lib/database";

export default function KnockoutPage() {
  const [picks, setPicks] = useState<Record<string, KnockoutPick>>({});
  const locked = useMemo(
    () => isKnockoutLocked(defaultPoolSettings.knockoutPickDeadline, defaultPoolSettings.knockoutLocked),
    [],
  );
  const poolCode = defaultPoolSettings.poolCode;

  async function pickMatch(nextPicks: Record<string, KnockoutPick>) {
    const changed = Object.entries(nextPicks).find(([matchId, pick]) => picks[matchId] !== pick);
    setPicks(nextPicks);
    const user = await getCurrentUser();
    if (user && changed) await saveKnockoutPick(poolCode, user.id, changed[0], changed[1]);
  }

  return (
    <main>
      <Header />
      <section className="page-head">
        <div>
          <p className="eyebrow">Second entry after groups</p>
          <h1>Knockout Bracket</h1>
        </div>
        <div className="deadline-pill">{locked ? "Bracket locked" : "Opens after group stage"}</div>
      </section>
      <div className="content-grid">
        <aside className="panel">
          <SignInPanel />
          <div className="note">
            The Round of 32 teams will replace these placeholders once the group stage is complete.
          </div>
        </aside>
        <Bracket matches={seedKnockoutMatches} locked={locked} picks={picks} onPick={pickMatch} />
      </div>
    </main>
  );
}
