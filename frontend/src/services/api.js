const API_BASE = '/api';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("minishop_token");
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) throw new Error(data?.message || "Errore del Server");
    return data;
}

export default request;