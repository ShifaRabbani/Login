const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Send data to the backend as JSON and get the answer back
export async function postJSON(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
}