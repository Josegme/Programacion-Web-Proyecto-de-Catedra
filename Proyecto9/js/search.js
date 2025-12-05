/* ===================================
   BÚSQUEDA EN TIEMPO REAL
   =================================== */

// Selección de elementos
const searchInput = document.getElementById('searchInput');

// Event listener para búsqueda
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    performSearch(searchTerm);
  });
}

// Función de búsqueda
function performSearch(searchTerm) {
  let visibleCount = 0;
  
  heroCards.forEach(card => {
    const cardName = card.getAttribute('data-name').toLowerCase();
    const cardTeam = card.getAttribute('data-team');
    
    // Verificar si cumple con el filtro de equipo activo
    const matchesFilter = activeFilter === 'todos' || cardTeam === activeFilter;
    
    // Verificar si cumple con el término de búsqueda
    const matchesSearch = searchTerm === '' || cardName.includes(searchTerm);
    
    // Mostrar u ocultar tarjeta
    if (matchesFilter && matchesSearch) {
      card.classList.remove('hidden');
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
      
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });
  
  // Actualizar contador
  updateResultsCount(visibleCount);
}

// Limpiar búsqueda con tecla Escape
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
    }
  });
}
