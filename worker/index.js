// benefits-gap counter worker.
// Stores four anonymous daily counters and nothing else: no IP, no user agent, no cookies, no IDs.
const EVENTS = new Set(["open", "calc", "src", "return"]);

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === "/api/e") {
      if (req.method !== "POST") return new Response("method", { status: 405 });
      let ev = "";
      try { ev = String((await req.json()).ev || ""); } catch { /* ignore */ }
      if (!EVENTS.has(ev)) return new Response("bad event", { status: 400 });
      const day = new Date().toISOString().slice(0, 10);
      await env.DB.prepare(
        "INSERT INTO counts(day, ev, n) VALUES (?1, ?2, 1) ON CONFLICT(day, ev) DO UPDATE SET n = n + 1"
      ).bind(day, ev).run();
      return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
    }

    if (url.pathname === "/api/stats") {
      // Aggregate daily counts for the last 90 days. Public on purpose: there is nothing personal in it.
      const since = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
      const { results } = await env.DB.prepare(
        "SELECT day, ev, n FROM counts WHERE day >= ?1 ORDER BY day, ev"
      ).bind(since).all();
      return Response.json({ since, rows: results }, { headers: { "cache-control": "no-store" } });
    }

    return env.ASSETS.fetch(req);
  },
};
