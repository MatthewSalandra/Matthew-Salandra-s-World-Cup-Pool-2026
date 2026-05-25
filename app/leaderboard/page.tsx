import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";

export default function LeaderboardPage() {
  return (
    <main>
      <Header />
      <section className="page-head">
        <div>
          <p className="eyebrow">Visible after picks lock</p>
          <h1>Leaderboard</h1>
        </div>
      </section>
      <Leaderboard />
    </main>
  );
}
