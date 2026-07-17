const API_BASE = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("minishop_token");
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "Errore del Server");
    return data;
}

export default request;