/* Requisito de Actividad 2: Lógica para el menú hamburguesa */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("navbar--visible");

      // Cambiar el aria-label para accesibilidad
      if (navbar.classList.contains("navbar--visible")) {
        menuToggle.setAttribute("aria-label", "Cerrar menú");
      } else {
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }
  }

});

  // --- Requisito de Actividad 4: DOM y Eventos ---

  // Ejercicio 1: Seleccionar y modificar un elemento
  const infoTitle = document.querySelector(".info-txt h2");
  if (infoTitle) {
    infoTitle.textContent = "Información (DOM Modificado)";
  }

  // Ejercicio 2: Botón que cambia contenido y color
  const changeStyleBtn = document.getElementById("change-style-btn");
  if (changeStyleBtn && infoTitle) {
    changeStyleBtn.addEventListener("click", function () {
      infoTitle.textContent = "¡Estilo Cambiado!";
      infoTitle.style.color = "#DB241B";
    });
  }

  // Inicializar Swiper si está presente (previene errores si la librería carga después)
  try {
    if (typeof Swiper !== "undefined") {
      // Slider principal
      new Swiper(".mySwiper-1", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });

      // Sliders secundarios (productos)
      document.querySelectorAll(".mySwiper-2").forEach(function (el) {
        new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          navigation: {
            nextEl: el.querySelector(".swiper-button-next"),
            prevEl: el.querySelector(".swiper-button-prev"),
          },
          breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          },
        });
      });
    }
  } catch (err) {
    // si Swiper no está disponible no hacemos nada, evitamos errores en consola
    console.warn("Swiper init skipped:", err);
  }

  // --- Manejo del formulario promocional en la tarjeta (envío al backend) ---
  const promoForm = document.getElementById('promo-form');
  const promoFeedback = document.querySelector('.form-feedback');
  if (promoForm) {
    promoForm.addEventListener('submit', async function (ev) {
      ev.preventDefault();
      const nombre = document.getElementById('promo-nombre').value.trim();
      const apellido = document.getElementById('promo-apellido').value.trim();
      const dni = document.getElementById('promo-dni').value.trim();
      const mail = document.getElementById('promo-mail').value.trim();

      // payload
      const payload = { nombre, apellido, dni, mail };

      try {
        const resp = await fetch('http://localhost:3000/api/promo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (resp.ok && data.ok) {
          if (promoFeedback) promoFeedback.textContent = 'Registro recibido. ¡Gracias! ID: ' + data.id;
          promoForm.reset();
        } else {
          if (promoFeedback) promoFeedback.textContent = 'Error: ' + (data.error || 'no se pudo registrar');
        }
      } catch (err) {
        if (promoFeedback) promoFeedback.textContent = 'Error de red, intenta más tarde.';
        console.error('Promo submit error:', err);
      }
    });
  }
