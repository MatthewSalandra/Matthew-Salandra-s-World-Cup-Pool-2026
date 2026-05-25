"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import SignInPanel from "@/components/SignInPanel";
import TiebreakerPanel from "@/components/TiebreakerPanel";
import { defaultPoolSettings, seedGroupMatches } from "@/lib/seed";
import type { GroupPick } from "@/lib/types";
import { isGroupLocked } from "@/lib/scoring";
import { getCurrentUser, saveGroupPick } from "@/lib/database";

export default function GroupStagePage() {
  const [groupPicks, setGroupPicks] = useState<Record<string, GroupPick>>({});
  const locked = useMemo(
    () => isGroupLocked(defaultPoolSettings.groupPickDeadline, defaultPoolSettings.groupLocked),
    [],
  );
  const poolCode = defaultPoolSettings.poolCode;

  async function pickMatch(matchId: string, pick: GroupPick) {
    setGroupPicks((current) => ({ ...current, [matchId]: pick }));
    const user = await getCurrentUser();
    if (user) await saveGroupPick(poolCode, user.id, matchId, pick);
  }

  return (
    <main>
      <Header />
      <section className="page-head">
        <div>
          <p className="eyebrow">1 point per correct pick</p>
          <h1>Group Stage Predictions</h1>
        </div>
        <div className="deadline-pill">{locked ? "Group picks locked" : "Editable until Jun 11, 2026"}</div>
      </section>

      <div className="content-grid">
        <aside className="panel">
          <SignInPanel />
          <TiebreakerPanel />
        </aside>
        <section className="match-list">
          {Object.entries(
            seedGroupMatches.reduce<Record<string, typeof seedGroupMatches>>((grouped, match) => {
              const group = match.group || "Group";
              grouped[group] = [...(grouped[group] || []), match];
              return grouped;
            }, {}),
          ).map(([group, matches]) => (
              <section className="match-section" key={group}>
                <h2>Group {group}</h2>
                <div className="match-grid">
                  {matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      locked={locked}
                      selected={groupPicks[match.id]}
                      onPick={(pick) => pickMatch(match.id, pick as GroupPick)}
                    />
                  ))}
                </div>
              </section>
            ))}
        </section>
      </div>
    </main>
  );
}
