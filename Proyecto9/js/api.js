// api.js - funciones para interactuar con el backend
const API_BASE = window.__API_BASE__ || "http://localhost:4000";

async function handleRes(res, errMsg) {
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(errMsg + (text ? " - " + text : ""));
  }
  return res.json().catch(() => null);
}

export async function fetchHeroes() {
  const res = await fetch(`${API_BASE}/api/heroes`);
  return await handleRes(res, "No se pudo obtener la lista de héroes");
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await handleRes(res, "Login fallido");
}

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await handleRes(res, "Registro fallido");
}

export async function getMe(token) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: "Bearer " + token },
  });
  return await handleRes(res, "No se pudo obtener el usuario");
}

export async function createHero(hero, token) {
  const res = await fetch(`${API_BASE}/api/heroes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(hero),
  });
  return await handleRes(res, "No se pudo crear el héroe");
}

export async function deleteHero(id, token) {
  const res = await fetch(`${API_BASE}/api/heroes/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  return await handleRes(res, "No se pudo borrar el héroe");
}

export async function updateHero(id, hero, token) {
  const res = await fetch(`${API_BASE}/api/heroes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(hero),
  });
  return await handleRes(res, "No se pudo actualizar el héroe");
}

export async function fetchSubscribers(token) {
  const res = await fetch(`${API_BASE}/api/subscribers`, {
    headers: { Authorization: "Bearer " + token },
  });
  return await handleRes(res, "No se pudo obtener la lista de suscriptores");
}
