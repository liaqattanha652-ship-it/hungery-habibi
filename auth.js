// Very simple shared-secret check for manager-only routes. Good enough for a
// small internal restaurant tool — not meant to replace real user auth.
export function requireManager(req, res) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;
  const expected = process.env.MANAGER_TOKEN || "hh-manager-secret";
  if (!token || token !== expected) {
    res.status(401).json({ error: "Manager authentication required" });
    return false;
  }
  return true;
}
