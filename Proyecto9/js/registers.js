const API_BASE = window.__API_BASE__ || "http://localhost:4000";

async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

async function registerFan(form) {
  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    edad: form.edad.value ? Number(form.edad.value) : undefined,
    fechaNacimiento: form.fechaNacimiento.value,
    documento: form.documento.value,
    email: form.email.value,
  };
  const res = await fetch(`${API_BASE}/api/fans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
}

async function registerHero(form) {
  // use FormData to upload file via multipart/form-data
  const fd = new FormData();
  fd.append("nombre", form.nombre.value);
  fd.append("alterEgo", form.alterEgo.value);
  fd.append("origen", form.origen.value);
  const fileInput = document.getElementById("heroImage");
  if (fileInput && fileInput.files && fileInput.files[0]) {
    fd.append("imagen", fileInput.files[0]);
  }
  const res = await fetch(`${API_BASE}/api/heroes/register-file`, {
    method: "POST",
    body: fd,
  });
  return res;
}

// attach handlers if forms exist
const fanForm = document.getElementById("fanRegisterForm");
if (fanForm) {
  fanForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = fanForm.querySelector('button[type="submit"]');
    const msg = document.getElementById("fanMsg");
    btn.disabled = true;
    msg.textContent = "Enviando...";
    try {
      const res = await registerFan(fanForm);
      if (!res.ok) {
        const txt = await res.text();
        msg.textContent = "Error: " + txt;
      } else {
        msg.textContent = "Registro recibido. ¡Gracias!";
        fanForm.reset();
      }
    } catch (err) {
      msg.textContent = "Error de conexión: " + err.message;
    } finally {
      btn.disabled = false;
    }
  });
}

const heroForm = document.getElementById("heroRegisterForm");
if (heroForm) {
  heroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = heroForm.querySelector('button[type="submit"]');
    const msg = document.getElementById("heroMsg");
    btn.disabled = true;
    msg.textContent = "Enviando...";
    try {
      const res = await registerHero(heroForm);
      if (!res.ok) {
        const txt = await res.text();
        msg.textContent = "Error: " + txt;
      } else {
        msg.textContent = "Registro de héroe recibido. ¡Gracias!";
        heroForm.reset();
      }
    } catch (err) {
      msg.textContent = "Error de conexión: " + err.message;
    } finally {
      btn.disabled = false;
    }
  });
}
