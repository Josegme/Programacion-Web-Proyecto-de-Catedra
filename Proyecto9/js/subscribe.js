document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = window.__API_BASE__ || "http://localhost:4000";
  const form = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("subscribeEmail");
  const btn = document.getElementById("subscribeBtn");
  const msg = document.getElementById("subscribeMessage");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    const email = emailInput.value.trim();
    if (!email) {
      msg.textContent = "Introduce un correo válido.";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando...";

    try {
      const res = await fetch(`${API_BASE}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok) {
        msg.textContent = json.message || "Gracias por suscribirte.";
        form.reset();
      } else {
        msg.textContent = json.error || "Error al suscribirse.";
      }
    } catch (err) {
      console.error(err);
      msg.textContent = "No se pudo conectar con el servidor.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Suscribirme";
    }
  });
});
