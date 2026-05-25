import Header from "@/components/Header";

export default function AdminPage() {
  return (
    <main>
      <Header />
      <section className="page-head">
        <div>
          <p className="eyebrow">Admin only</p>
          <h1>Pool Control Room</h1>
        </div>
      </section>
      <section className="admin-grid">
        <article className="panel">
          <h2>Deadlines</h2>
          <label>
            Group picks lock
            <input type="datetime-local" defaultValue="2026-06-11T15:00" />
          </label>
          <label>
            Knockout picks lock
            <input type="datetime-local" />
          </label>
          <button className="button primary">Save deadlines</button>
        </article>
        <article className="panel">
          <h2>Payments</h2>
          <p className="muted">Only the admin sees paid status. Players do not see who has paid.</p>
          <div className="empty-state">Entries will appear here after Firebase is connected.</div>
        </article>
        <article className="panel">
          <h2>Results Sync</h2>
          <p className="muted">The server-side API key will pull fixtures and results without exposing it to users.</p>
          <button className="button secondary">Sync results</button>
        </article>
      </section>
    </main>
  );
}
