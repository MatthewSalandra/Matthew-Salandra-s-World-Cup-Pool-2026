import Link from "next/link";
import { Lock, Trophy, Users } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Private pool code: SALANDRA2026</p>
          <h1>Matthew Salandra's World Cup Pool</h1>
          <p>
            Make every group-stage pick before kickoff, come back for the knockout bracket, and follow the
            leaderboard once everyone is locked in.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/group-stage">
              Enter Pool
            </Link>
            <Link className="button secondary" href="/leaderboard">
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-grid" aria-label="Pool rules">
        <article>
          <Lock />
          <h2>Picks Stay Hidden</h2>
          <p>Everyone can edit until the deadline. Other entries become visible only after picks lock.</p>
        </article>
        <article>
          <Trophy />
          <h2>Round Scoring</h2>
          <p>Group games are 1 point. Knockout rounds increase from 2 through 6 points.</p>
        </article>
        <article>
          <Users />
          <h2>One Entry Each</h2>
          <p>Email login keeps the pool clean, prevents duplicate entries, and supports password reset.</p>
        </article>
      </section>
    </main>
  );
}
