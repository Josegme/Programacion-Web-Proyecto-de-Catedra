/* ===================================
   SISTEMA DE FILTROS PARA HÉROES
   =================================== */

// Variable para filtro activo
let activeFilter = "todos";

// Función para aplicar filtros
function applyFilters() {
  const heroCards = document.querySelectorAll(".hero-card");
  let visibleCount = 0;

  heroCards.forEach((card) => {
    const cardTeam = card.getAttribute("data-team");
    const cardName = card.getAttribute("data-name").toLowerCase();
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    // Verificar si cumple con el filtro de equipo
    const matchesFilter =
      activeFilter === "todos" ||
      activeFilter === "all" ||
      cardTeam === activeFilter;

    // Verificar si cumple con la búsqueda
    const matchesSearch = searchTerm === "" || cardName.includes(searchTerm);

    // Mostrar u ocultar tarjeta
    if (matchesFilter && matchesSearch) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  // Actualizar contador de resultados
  updateResultsCount(visibleCount);
}

// Función para actualizar contador
function updateResultsCount(count) {
  const resultsCount = document.querySelector(".results-count");
  const noResults = document.querySelector(".no-results");

  if (resultsCount) {
    const heroCards = document.querySelectorAll(".hero-card");
    const totalCards = heroCards.length;
    resultsCount.innerHTML = `Mostrando <span>${count}</span> de <span>${totalCards}</span> héroes`;
  }

  // Mostrar mensaje de no resultados
  if (noResults) {
    if (count === 0) {
      noResults.classList.add("show");
    } else {
      noResults.classList.remove("show");
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Event listeners para botones de filtro
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Quitar clase active de todos los botones
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Agregar clase active al botón clickeado
      button.classList.add("active");

      // Obtener el filtro seleccionado
      activeFilter = button.getAttribute("data-filter");

      // Aplicar filtro
      applyFilters();
    });
  });

  // Inicializar contador
  const heroCards = document.querySelectorAll(".hero-card");
  if (heroCards.length > 0) {
    updateResultsCount(heroCards.length);
  }
});
