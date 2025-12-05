# 🦸 MARVEL HEROES DATABASE - Guía de Estudio Completa

## 📋 Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Arquitectura HTML](#arquitectura-html)
5. [Estilos CSS Explicados](#estilos-css-explicados)
6. [JavaScript y Funcionalidad](#javascript-y-funcionalidad)
7. [Conceptos Clave](#conceptos-clave)
8. [Cómo Personalizar](#cómo-personalizar)

---

## 📖 Descripción del Proyecto

Este es un sitio web interactivo de base de datos de superhéroes de Marvel. Presenta tarjetas de información detallada sobre héroes, con un menú hamburguesa lateral y diseño responsive inspirado en Marvel Studios.

### Características Principales:
- ✅ Diseño responsive (se adapta a móviles y desktop)
- ✅ Menú hamburguesa animado
- ✅ Tarjetas de héroes con información detallada
- ✅ Efectos hover y animaciones
- ✅ Tema visual de Marvel Studios

---

## 📁 Estructura del Proyecto

```
Proyecto9/
│
├── tarjeta.html          # Archivo principal (HTML + CSS + JS)
├── README.md             # Este archivo de documentación
│
└── img/                  # Carpeta de imágenes
    ├── logo.png         # Logo de Marvel
    ├── fondo.jpg        # Imagen de fondo
    └── otros.jpg        # Imágenes de héroes
```

---

## 🛠️ Tecnologías Utilizadas

### 1. **HTML5**
- Estructura semántica del contenido
- Elementos modernos como `<header>`, `<nav>`, `<section>`

### 2. **CSS3**
- Flexbox y Grid para layouts
- Gradientes y sombras
- Transiciones y animaciones
- Media queries para responsive design

### 3. **JavaScript (Vanilla)**
- Manipulación del DOM
- Event Listeners
- Intersection Observer API
- Toggle de clases

### 4. **Google Fonts**
- Bebas Neue (estilo Marvel)
- Roboto Condensed (texto general)

---

## 🏗️ Arquitectura HTML

### Estructura del Documento

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- Metadatos y fuentes -->
  </head>
  <body>
    <!-- Overlay (capa oscura) -->
    <!-- Header con logo y menú -->
    <!-- Navegación lateral -->
    <!-- Contenedor principal con tarjetas -->
    <!-- JavaScript -->
  </body>
</html>
```

### Componentes Principales:

#### 1. **Header (Cabecera)**
```html
<header>
  <div class="logo">
    <img src="img/logo.png" alt="Marvel Logo">
    <h1>HEROES DATABASE</h1>
  </div>
  <div class="hamburger" id="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</header>
```

**Función:** 
- Contiene el logo de Marvel
- Muestra el título del sitio
- Incluye el botón hamburguesa (3 líneas)

#### 2. **Menú Hamburguesa**
```html
<nav class="nav-menu" id="navMenu">
  <ul>
    <li><a href="#avengers">AVENGERS</a></li>
    <li><a href="#x-men">X-MEN</a></li>
    <li><a href="#guardians">GUARDIANS</a></li>
  </ul>
</nav>
```

**Función:**
- Menú lateral que se desliza desde la derecha
- Contiene enlaces de navegación
- Inicialmente está oculto (fuera de pantalla)

#### 3. **Tarjetas de Héroes**
```html
<div class="hero-card">
  <div class="hero-image">
    <img src="img/otros.jpg" alt="Iron Man">
  </div>
  <div class="hero-content">
    <h2 class="hero-name">IRON MAN</h2>
    <!-- Características físicas -->
    <!-- Poderes -->
    <!-- Personalidad -->
  </div>
</div>
```

**Función:**
- Muestra información organizada del héroe
- Imagen principal con efectos
- Secciones de información categorizadas

---

## 🎨 Estilos CSS Explicados

### 1. **Reset y Base**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**¿Qué hace?**
- Elimina márgenes y padding predeterminados del navegador
- `box-sizing: border-box` hace que padding y border se incluyan en el ancho total

### 2. **Background del Body**

```css
body {
  font-family: 'Roboto Condensed', sans-serif;
  background: #0a0a0a url('img/fondo.jpg') center/cover fixed;
  background-blend-mode: overlay;
}
```

**Conceptos:**
- `background: color url() position/size attachment`
- `center/cover` = centrado y cubre toda el área
- `fixed` = la imagen no se mueve al hacer scroll (efecto parallax)
- `background-blend-mode` = mezcla la imagen con el color

### 3. **Pseudo-elemento ::before**

```css
body::before {
  content: '';
  position: fixed;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%);
}
```

**¿Qué hace?**
- Crea una capa semi-transparente sobre el fondo
- `radial-gradient` = gradiente circular (oscuro en bordes, transparente al centro)
- Da profundidad visual al diseño

### 4. **Flexbox en Header**

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Conceptos de Flexbox:**
- `display: flex` = activa flexbox
- `justify-content: space-between` = elementos en extremos opuestos
- `align-items: center` = centra verticalmente

### 5. **CSS Grid para Tarjetas**

```css
.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}
```

**Conceptos de Grid:**
- `display: grid` = activa CSS Grid
- `repeat(auto-fit, minmax(350px, 1fr))` = crea columnas que:
  - Se ajustan automáticamente (`auto-fit`)
  - Mínimo 350px, máximo 1 fracción disponible
  - Se adaptan según el espacio disponible
- `gap: 30px` = espacio entre elementos

### 6. **Transiciones y Animaciones**

```css
.hero-card {
  transition: all 0.4s ease;
}

.hero-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(237, 29, 36, 0.6);
}
```

**Conceptos:**
- `transition` = suaviza cambios de propiedades
- `transform: translateY(-10px)` = mueve 10px hacia arriba
- `scale(1.02)` = aumenta tamaño 2%
- `:hover` = aplica estilos al pasar el mouse

### 7. **Position Fixed para Menú**

```css
.nav-menu {
  position: fixed;
  right: -100%;
  transition: right 0.4s ease;
}

.nav-menu.active {
  right: 0;
}
```

**Conceptos:**
- `position: fixed` = posición fija respecto al viewport
- `right: -100%` = está fuera de pantalla a la derecha
- `.active` = cuando tiene esta clase, se mueve a `right: 0` (visible)

### 8. **Overlay (Capa Oscura)**

```css
.overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}
```

**Conceptos:**
- `opacity: 0` = totalmente transparente
- `visibility: hidden` = no es clickeable ni visible
- Al activarse, aparece gradualmente

---

## ⚡ JavaScript y Funcionalidad

### 1. **Selección de Elementos del DOM**

```javascript
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");
```

**¿Qué hace?**
- `getElementById()` = selecciona elementos por su ID
- Guarda referencias en variables para usarlas después

### 2. **Event Listener para el Menú**

```javascript
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});
```

**Conceptos:**
- `addEventListener("click", función)` = ejecuta función al hacer click
- `e.stopPropagation()` = evita que el evento se propague a otros elementos
- `classList.toggle("active")` = agrega/quita la clase "active"
  - Si tiene la clase → la quita
  - Si no la tiene → la agrega

### 3. **Cerrar Menú al Hacer Click en Enlaces**

```javascript
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});
```

**Conceptos:**
- `querySelectorAll()` = selecciona TODOS los elementos que coincidan
- `forEach()` = itera sobre cada elemento
- `classList.remove()` = quita una clase específica

### 4. **Intersection Observer (Animación al Scroll)**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);
```

**¿Qué hace?**
- **Intersection Observer API** = detecta cuando un elemento entra en el viewport
- Cuando una tarjeta es visible:
  - Cambia `opacity` de 0 a 1 (aparece)
  - Cambia `transform` para moverla a posición original
- Crea efecto de "fade in" al hacer scroll

**Opciones:**
```javascript
const observerOptions = {
  threshold: 0.1,        // Se activa cuando 10% del elemento es visible
  rootMargin: "0px 0px -100px 0px"  // Margen adicional
};
```

---

## 💡 Conceptos Clave

### 1. **Box Model**
```
┌─────────────────────────────────┐
│         MARGIN                  │
│  ┌───────────────────────────┐  │
│  │      BORDER               │  │
│  │  ┌─────────────────────┐  │  │
│  │  │    PADDING          │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   CONTENT     │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 2. **Position**
- `static` = posición normal (por defecto)
- `relative` = relativo a su posición normal
- `absolute` = relativo al padre posicionado más cercano
- `fixed` = relativo al viewport (no se mueve al scroll)
- `sticky` = combinación de relative y fixed

### 3. **Flexbox vs Grid**

**Flexbox:**
- Para layouts en UNA dimensión (fila O columna)
- Ideal para: navegación, centrar elementos, distribuir espacio

**Grid:**
- Para layouts en DOS dimensiones (filas Y columnas)
- Ideal para: galerías, layouts complejos, cuadrículas

### 4. **CSS Specificity (Especificidad)**

Orden de prioridad:
1. `!important` (evitar usar)
2. Inline styles (`style="..."`)
3. IDs (`#id`)
4. Classes (`.class`), attributes, pseudo-classes
5. Elements (`div`, `p`)

### 5. **Event Bubbling**
```
HTML
 └─ BODY
     └─ HEADER
         └─ HAMBURGER (click aquí)
```

Sin `stopPropagation()`, el evento "burbujea" hacia arriba:
- Click en hamburger → se ejecuta handler
- Evento sube a header → se ejecuta handler si existe
- Evento sube a body → se ejecuta handler si existe

### 6. **Responsive Design**

```css
@media (max-width: 768px) {
  /* Estilos para pantallas pequeñas */
}
```

**Breakpoints comunes:**
- 320px - 480px: Móviles
- 481px - 768px: Tablets
- 769px - 1024px: Laptops pequeñas
- 1025px+: Desktop

---

## 🔧 Cómo Personalizar

### Cambiar Colores

Busca y reemplaza estos valores:
```css
#ed1d24  →  TU_COLOR_PRINCIPAL
rgba(237, 29, 36, ...)  →  rgba(R, G, B, ...)
```

### Agregar Más Héroes

1. Copia una tarjeta completa:
```html
<div class="hero-card">
  <!-- ... contenido ... -->
</div>
```

2. Cambia:
   - Imagen (`src="img/tu-imagen.jpg"`)
   - Nombre del héroe
   - Características
   - Poderes
   - Personalidad

### Cambiar Fuentes

Reemplaza en el `<head>`:
```html
<link href="URL_DE_GOOGLE_FONTS" rel="stylesheet">
```

Y en CSS:
```css
font-family: 'TU_FUENTE', sans-serif;
```

### Modificar Animaciones

Cambia valores de `transition`:
```css
transition: propiedad duración tipo-de-easing;

/* Ejemplos: */
transition: all 0.3s ease;        /* Rápida */
transition: all 1s ease-in-out;   /* Lenta */
transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* Rebote */
```

---

## 📚 Recursos para Seguir Aprendiendo

### HTML
- [MDN HTML Guide](https://developer.mozilla.org/es/docs/Web/HTML)
- [HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

### CSS
- [CSS Tricks - Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Garden](https://cssgridgarden.com/) - Juego para aprender Grid
- [MDN CSS Reference](https://developer.mozilla.org/es/docs/Web/CSS)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)

### Herramientas
- [Can I Use](https://caniuse.com/) - Compatibilidad de navegadores
- [CSS Gradient Generator](https://cssgradient.io/)
- [Google Fonts](https://fonts.google.com/)

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué usar `classList.toggle()` en lugar de cambiar estilos directamente?**  
R: Es mejor práctica usar clases porque:
- Separa lógica (JS) de presentación (CSS)
- Más fácil de mantener
- Permite usar transiciones CSS

**P: ¿Qué es `viewport`?**  
R: Es la parte visible de la página web en tu pantalla. En móviles es más pequeño que en desktop.

**P: ¿Por qué usar `const` en lugar de `var`?**  
R: 
- `const` = no se puede reasignar (más seguro)
- `let` = se puede reasignar, scope de bloque
- `var` = antiguo, evitar usar (tiene problemas de scope)

**P: ¿Qué significa `rgba(0, 0, 0, 0.8)`?**  
R:
- `rgb` = Red, Green, Blue (0-255)
- `a` = Alpha (opacidad, 0-1)
- `rgba(0, 0, 0, 0.8)` = negro con 80% opacidad

---

## 🎯 Ejercicios Propuestos

1. **Fácil:** Agrega un cuarto superhéroe a la galería
2. **Medio:** Crea un footer con información de contacto
3. **Medio:** Agrega un botón "Scroll to Top"
4. **Difícil:** Implementa un filtro para mostrar solo ciertos héroes
5. **Difícil:** Crea un modal (ventana emergente) al hacer click en una tarjeta

---

## 📝 Notas Finales

Este proyecto combina:
- **HTML** para estructura
- **CSS** para diseño visual
- **JavaScript** para interactividad

La clave está en entender cómo trabajan juntos estos 3 lenguajes. Practica modificando valores, experimentando con nuevos estilos y agregando funcionalidades.

¡Buena suerte con tu aprendizaje! 🚀

---

**Creado para:** Proyecto de Programación Web  
**Fecha:** Noviembre 2025  
**Tema:** Marvel Heroes Database
