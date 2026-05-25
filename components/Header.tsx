import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        Matthew Salandra's World Cup Pool
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/group-stage">Group Stage</Link>
        <Link href="/knockout">Knockout</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
