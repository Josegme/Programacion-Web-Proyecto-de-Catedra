# 📖 TEORÍA Y CONCEPTOS - Marvel Heroes Project

## Tabla de Contenidos
1. [Flujo de Funcionamiento](#flujo-de-funcionamiento)
2. [Desglose Línea por Línea](#desglose-línea-por-línea)
3. [Conceptos Teóricos Detallados](#conceptos-teóricos-detallados)
4. [Comparaciones y Ejemplos](#comparaciones-y-ejemplos)

---

## 🔄 Flujo de Funcionamiento

### ¿Cómo funciona el proyecto paso a paso?

```
1. CARGA DE PÁGINA
   └─> Navegador lee HTML de arriba hacia abajo
   └─> Carga fuentes de Google Fonts
   └─> Lee y aplica estilos CSS
   └─> Ejecuta JavaScript al final

2. RENDERIZADO INICIAL
   └─> Header visible con logo y menú hamburguesa
   └─> Menú lateral OCULTO (right: -100%)
   └─> Overlay OCULTO (opacity: 0)
   └─> Tarjetas OCULTAS (opacity: 0)

3. USUARIO HACE SCROLL
   └─> Intersection Observer detecta tarjetas
   └─> Activa animación de aparición
   └─> Tarjetas se vuelven visibles gradualmente

4. USUARIO HACE CLICK EN HAMBURGUESA
   └─> JavaScript agrega clase "active"
   └─> Menú se desliza (right: -100% → right: 0)
   └─> Overlay aparece (opacity: 0 → 1)
   └─> Hamburguesa se transforma en X

5. USUARIO HACE CLICK EN OVERLAY O ENLACE
   └─> JavaScript quita clase "active"
   └─> Menú se oculta (right: 0 → right: -100%)
   └─> Overlay desaparece (opacity: 1 → 0)
   └─> Hamburguesa vuelve a 3 líneas
```

---

## 🔍 Desglose Línea por Línea

### SECCIÓN 1: HEAD - Configuración Inicial

```html
<!DOCTYPE html>
```
**Teoría:** Declara que este es un documento HTML5. SIEMPRE debe ser la primera línea.

```html
<html lang="es">
```
**Teoría:** 
- Elemento raíz que contiene todo
- `lang="es"` indica idioma español (ayuda a lectores de pantalla y SEO)

```html
<meta charset="UTF-8" />
```
**Teoría:** 
- Define codificación de caracteres
- UTF-8 soporta todos los idiomas y símbolos especiales (ñ, á, é, etc.)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
**Teoría:** CRÍTICO para diseño responsive
- `width=device-width` → ancho = ancho del dispositivo
- `initial-scale=1.0` → zoom inicial al 100%
- Sin esto, las páginas se ven mal en móviles

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```
**Teoría:** 
- Optimización de rendimiento
- Establece conexión anticipada con servidor de fuentes
- Reduce tiempo de carga

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet">
```
**Teoría:** 
- Importa fuentes de Google
- `Bebas+Neue` = fuente estilo Marvel
- `Roboto+Condensed:wght@400;700` = Roboto con pesos 400 (normal) y 700 (bold)
- `display=swap` = muestra texto inmediatamente con fuente por defecto, luego cambia

---

### SECCIÓN 2: CSS - Reset y Base

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Teoría del Selector Universal (*):**
- Selecciona TODOS los elementos
- Útil para resetear estilos predeterminados del navegador

**box-sizing: border-box explicado:**

```
EJEMPLO SIN border-box (content-box):
Elemento con width: 300px, padding: 20px, border: 5px

Real width = 300 + 20 + 20 + 5 + 5 = 350px
├─ content: 300px
├─ padding left: 20px
├─ padding right: 20px
├─ border left: 5px
└─ border right: 5px

EJEMPLO CON border-box:
Elemento con width: 300px, padding: 20px, border: 5px

Real width = 300px (¡SIEMPRE!)
├─ content: 250px
├─ padding left: 20px
├─ padding right: 20px
├─ border left: 5px
└─ border right: 5px
```

**Ventaja:** Más predecible, más fácil calcular layouts

---

### SECCIÓN 3: Background Avanzado

```css
body {
  background: #0a0a0a url('img/fondo.jpg') center/cover fixed;
  background-blend-mode: overlay;
}
```

**Desglose completo:**

```css
background: color url position/size attachment;
```

1. **Color:** `#0a0a0a` (casi negro)
2. **URL:** `url('img/fondo.jpg')` (imagen de fondo)
3. **Position:** `center` (centrada horizontal y verticalmente)
4. **Size:** `cover` (cubre todo el espacio, puede recortar)
5. **Attachment:** `fixed` (no se mueve con scroll - efecto parallax)

**Alternativas de size:**
```css
background-size: cover;    /* Cubre todo, puede recortar */
background-size: contain;  /* Cabe completa, puede dejar espacios */
background-size: 100% 100%; /* Estira (distorsiona) */
background-size: 50%;      /* Muestra a 50% */
```

**background-blend-mode:**
```css
overlay;    /* Mezcla colores (usado aquí) */
multiply;   /* Oscurece */
screen;     /* Aclara */
darken;     /* Solo oscurece */
lighten;    /* Solo aclara */
```

---

### SECCIÓN 4: Pseudo-elementos Explicados

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(...);
  pointer-events: none;
  z-index: 0;
}
```

**¿Qué es ::before?**

Cada elemento puede tener DOS pseudo-elementos:
- `::before` → se inserta ANTES del contenido
- `::after` → se inserta DESPUÉS del contenido

**Visualización:**
```html
<body>
  <!-- ::before va aquí (insertado por CSS) -->
  <header>...</header>
  <div>...</div>
  <!-- ::after iría aquí -->
</body>
```

**Propiedad por propiedad:**

```css
content: '';  /* OBLIGATORIO, aunque esté vacío */
```
Sin `content`, el pseudo-elemento no existe.

```css
position: fixed;
top: 0; left: 0; right: 0; bottom: 0;
```
Cubre toda la pantalla (viewport completo)

```css
pointer-events: none;
```
¡MUY IMPORTANTE! Los clicks pasan a través del elemento.
Sin esto, no podrías hacer click en nada debajo.

```css
z-index: 0;
```
Controla el apilamiento (qué está delante/detrás)
- Valores más altos = más adelante
- Valores negativos = más atrás

---

### SECCIÓN 5: Flexbox Detallado

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Ejes de Flexbox:**

```
Main Axis (eje principal) →
┌─────────────────────────────────┐
│  [Item 1]  [Item 2]  [Item 3]  │ ↑
└─────────────────────────────────┘ │ Cross Axis
                                    ↓ (eje cruzado)
```

**justify-content** - Alineación en MAIN AXIS (horizontal):

```css
justify-content: flex-start;
┌─────────────────────────────────┐
│ [1] [2] [3]                     │
└─────────────────────────────────┘

justify-content: center;
┌─────────────────────────────────┐
│          [1] [2] [3]            │
└─────────────────────────────────┘

justify-content: flex-end;
┌─────────────────────────────────┐
│                     [1] [2] [3] │
└─────────────────────────────────┘

justify-content: space-between;
┌─────────────────────────────────┐
│ [1]        [2]        [3]       │
└─────────────────────────────────┘

justify-content: space-around;
┌─────────────────────────────────┐
│  [1]      [2]      [3]          │
└─────────────────────────────────┘

justify-content: space-evenly;
┌─────────────────────────────────┐
│   [1]     [2]     [3]           │
└─────────────────────────────────┘
```

**align-items** - Alineación en CROSS AXIS (vertical):

```css
align-items: flex-start;    /* Arriba */
align-items: center;        /* Centro (usado) */
align-items: flex-end;      /* Abajo */
align-items: stretch;       /* Estira altura */
```

---

### SECCIÓN 6: CSS Grid Explicado

```css
.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}
```

**Desglose de repeat(auto-fit, minmax(350px, 1fr)):**

```
repeat(
  auto-fit,           // Ajusta automáticamente columnas
  minmax(350px, 1fr)  // Cada columna: mín 350px, máx 1fr
)
```

**¿Qué es 1fr?**
- fr = "fracción"
- 1fr = una parte del espacio disponible

**Ejemplo visual:**

```
Pantalla de 1200px con 3 elementos:

┌─────────────────────────────────────────┐
│  [350px]    [350px]    [350px]   espacio│
│  = 1fr      = 1fr      = 1fr     sobrante│
└─────────────────────────────────────────┘

Cada uno toma: 1200 / 3 = 400px

Pantalla de 800px con 3 elementos:
- 3 columnas no caben (350px × 3 = 1050px)
- auto-fit reorganiza a 2 columnas

┌─────────────────────────────────────────┐
│     [400px]         [400px]             │
└─────────────────────────────────────────┘
│     [400px]                             │
└─────────────────────────────────────────┘
```

**auto-fit vs auto-fill:**

```css
auto-fit:  /* Expande items para llenar espacio */
┌─────────────────────────────────────────┐
│  [───────]  [───────]  [───────]        │
└─────────────────────────────────────────┘

auto-fill: /* Mantiene tamaño, deja espacios */
┌─────────────────────────────────────────┐
│  [──]  [──]  [──]  [vacío]  [vacío]     │
└─────────────────────────────────────────┘
```

---

### SECCIÓN 7: Transform Explicado

```css
.hero-card:hover {
  transform: translateY(-10px) scale(1.02);
}
```

**Funciones de Transform:**

```css
/* TRANSLATE - Mover */
transform: translateX(50px);      /* Derecha 50px */
transform: translateY(-10px);     /* Arriba 10px */
transform: translate(50px, -10px); /* Ambos */

/* SCALE - Escalar */
transform: scale(1.5);            /* 150% tamaño */
transform: scale(0.5);            /* 50% tamaño */
transform: scale(1.2, 0.8);       /* X=120%, Y=80% */

/* ROTATE - Rotar */
transform: rotate(45deg);         /* 45 grados */
transform: rotate(-90deg);        /* -90 grados */

/* SKEW - Inclinar */
transform: skewX(20deg);          /* Inclina en X */

/* MÚLTIPLES - Se aplican en orden */
transform: translateY(-10px) scale(1.02) rotate(5deg);
```

**Visualización de scale:**

```
Original (scale: 1):
┌─────┐
│     │
│  1  │
│     │
└─────┘

scale(1.5):
┌──────────┐
│          │
│    1.5   │
│          │
└──────────┘

scale(0.5):
┌───┐
│0.5│
└───┘
```

---

### SECCIÓN 8: Transitions vs Animations

**TRANSITIONS:**
```css
.element {
  transition: property duration timing-function delay;
}
```

Requieren un **trigger** (hover, click, clase):

```css
.hero-card {
  background: black;
  transition: background 0.3s ease;
}

.hero-card:hover {
  background: red;  /* Trigger - cambia gradualmente */
}
```

**Timing Functions:**

```css
ease;           /* Lento-Rápido-Lento (por defecto) */
linear;         /* Velocidad constante */
ease-in;        /* Empieza lento */
ease-out;       /* Termina lento */
ease-in-out;    /* Lento inicio y fin */
cubic-bezier(); /* Control total */
```

**Visualización:**

```
ease:
velocidad ─┐     ╭─╮
           │   ╭─╯ ╰─╮
           └───╯     ╰──
         start      end

linear:
velocidad ─┐ ╭─────────
           │╱
           └╯
         start      end
```

---

### SECCIÓN 9: JavaScript - Event Listeners

```javascript
hamburger.addEventListener("click", (e) => {
  // código
});
```

**Anatomía de un Event Listener:**

```javascript
elemento.addEventListener(tipo_evento, función_callback);
```

**Tipos de eventos comunes:**

```javascript
// MOUSE
"click"         // Click con ratón
"dblclick"      // Doble click
"mouseenter"    // Mouse entra al elemento
"mouseleave"    // Mouse sale del elemento
"mousemove"     // Mouse se mueve sobre elemento

// TECLADO
"keydown"       // Tecla presionada
"keyup"         // Tecla liberada

// FORMULARIOS
"submit"        // Formulario enviado
"input"         // Input cambia (mientras escribes)
"change"        // Input cambia (al terminar)
"focus"         // Elemento recibe foco
"blur"          // Elemento pierde foco

// OTROS
"scroll"        // Scroll en la página
"load"          // Página/imagen carga
"resize"        // Ventana redimensionada
```

**Parámetro (e) - Event Object:**

```javascript
hamburger.addEventListener("click", (e) => {
  console.log(e.target);           // Elemento clickeado
  console.log(e.type);             // "click"
  console.log(e.clientX);          // Posición X del mouse
  console.log(e.clientY);          // Posición Y del mouse
  
  e.preventDefault();              // Previene acción por defecto
  e.stopPropagation();             // Detiene event bubbling
});
```

---

### SECCIÓN 10: classList Methods

```javascript
element.classList.toggle("active");
```

**Métodos de classList:**

```javascript
// ADD - Agregar clase
element.classList.add("active");
element.classList.add("active", "visible");  // Múltiples

// REMOVE - Quitar clase
element.classList.remove("active");

// TOGGLE - Cambiar (on/off)
element.classList.toggle("active");  // Si tiene→quita, si no→agrega

// CONTAINS - Verificar si tiene
if (element.classList.contains("active")) {
  console.log("Tiene la clase");
}

// REPLACE - Reemplazar
element.classList.replace("old-class", "new-class");
```

**Ejemplo práctico:**

```javascript
// HTML inicial:
<div class="card"></div>

// JavaScript:
card.classList.add("active");
// Resultado: <div class="card active"></div>

card.classList.toggle("visible");
// Resultado: <div class="card active visible"></div>

card.classList.remove("active");
// Resultado: <div class="card visible"></div>

card.classList.toggle("visible");
// Resultado: <div class="card"></div>
```

---

### SECCIÓN 11: Intersection Observer API

```javascript
const observer = new IntersectionObserver(callback, options);
```

**¿Para qué sirve?**
- Detectar cuando un elemento entra/sale del viewport
- Más eficiente que usar scroll events
- Casos de uso: lazy loading, animaciones al scroll, infinite scroll

**Callback function:**

```javascript
const callback = (entries) => {
  entries.forEach(entry => {
    console.log(entry.isIntersecting);  // true si es visible
    console.log(entry.target);          // El elemento observado
    console.log(entry.intersectionRatio); // Qué % es visible
  });
};
```

**Options:**

```javascript
const options = {
  root: null,              // null = viewport
  threshold: 0.5,          // 0-1 (0.5 = 50% visible)
  rootMargin: "0px"        // Margen adicional
};
```

**Ejemplo visual de threshold:**

```
threshold: 0 - Se activa cuando CUALQUIER píxel es visible
┌─────────────────┐
│   Viewport      │
│                 │
│  ┌──────┐       │ ← Trigger!
└──│──────│───────┘
   │ Elem │
   └──────┘

threshold: 0.5 - Se activa cuando 50% es visible
┌─────────────────┐
│   Viewport      │
│  ┌──────┐       │
│  │ Elem │       │ ← Trigger!
└──│──────│───────┘
   │      │
   └──────┘

threshold: 1 - Se activa cuando 100% es visible
┌─────────────────┐
│   Viewport      │
│  ┌──────┐       │
│  │ Elem │       │ ← Trigger!
│  └──────┘       │
└─────────────────┘
```

---

## 📊 Comparaciones y Ejemplos

### Display: flex vs grid vs block

```css
/* BLOCK - Por defecto en div, p, h1, etc */
.container {
  display: block;
}
```
```
┌─────────────┐
│   Block 1   │
└─────────────┘
┌─────────────┐
│   Block 2   │
└─────────────┘
┌─────────────┐
│   Block 3   │
└─────────────┘
```

```css
/* FLEX - Layout en una dimensión */
.container {
  display: flex;
}
```
```
┌────────────────────────────┐
│ [Flex1] [Flex2] [Flex3]    │
└────────────────────────────┘
```

```css
/* GRID - Layout en dos dimensiones */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```
```
┌──────────────┬──────────────┐
│   Grid 1     │   Grid 2     │
├──────────────┼──────────────┤
│   Grid 3     │   Grid 4     │
└──────────────┴──────────────┘
```

---

### Position Comparado

```html
<div class="container">
  <div class="box static">Static</div>
  <div class="box relative">Relative</div>
  <div class="box absolute">Absolute</div>
  <div class="box fixed">Fixed</div>
</div>
```

```css
/* STATIC - posición normal del flujo */
.static {
  position: static;
}
/* top, left, etc. NO funcionan */

/* RELATIVE - relativo a su posición normal */
.relative {
  position: relative;
  top: 20px;    /* 20px abajo de donde estaría */
  left: 30px;   /* 30px a la derecha */
}
/* Deja espacio en su posición original */

/* ABSOLUTE - relativo al padre posicionado */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}
/* NO deja espacio, se sale del flujo */

/* FIXED - relativo al viewport */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
/* Se mantiene visible al hacer scroll */
```

---

### Units (Unidades) Comparadas

```css
/* ABSOLUTE UNITS */
px   /* Píxeles - fijo, no cambia */
pt   /* Puntos (tipografía impresa) */
cm   /* Centímetros */

/* RELATIVE TO FONT SIZE */
em   /* Relativo al font-size del padre */
rem  /* Relativo al font-size del root (html) */

/* RELATIVE TO VIEWPORT */
vw   /* 1vw = 1% del ancho del viewport */
vh   /* 1vh = 1% del alto del viewport */
vmin /* El menor entre vw y vh */
vmax /* El mayor entre vw y vh */

/* PERCENTAGE */
%    /* Relativo al padre */
```

**Ejemplos:**

```css
/* EM vs REM */
html { font-size: 16px; }
.parent { font-size: 20px; }

.child-em {
  font-size: 2em;   /* 2 × 20px (padre) = 40px */
}

.child-rem {
  font-size: 2rem;  /* 2 × 16px (root) = 32px */
}

/* VIEWPORT */
.fullscreen {
  width: 100vw;   /* Ancho completo */
  height: 100vh;  /* Alto completo */
}

.half-screen {
  width: 50vw;    /* Mitad del ancho */
}
```

---

## 🎓 Conceptos Avanzados

### Stacking Context (Contexto de Apilamiento)

```css
/* Z-index solo funciona con position != static */

.layer-1 { z-index: 1; }
.layer-2 { z-index: 2; }
.layer-3 { z-index: 3; }
```

**Visualización:**

```
Vista lateral:
        ┌──────┐
       ┌┤layer3│ z-index: 3
      ┌─┤──────┤
     ┌──┤layer2│ z-index: 2
    ┌───┤──────┤
   ┌────┤layer1│ z-index: 1
───┴────┴──────┴─── z-index: 0 (base)
```

### Event Bubbling Detallado

```html
<div class="grandparent">
  <div class="parent">
    <button class="child">Click</button>
  </div>
</div>
```

```javascript
// Sin stopPropagation:
child.addEventListener("click", () => {
  console.log("1. Child clicked");
});

parent.addEventListener("click", () => {
  console.log("2. Parent clicked");
});

grandparent.addEventListener("click", () => {
  console.log("3. Grandparent clicked");
});

// Click en button → imprime:
// 1. Child clicked
// 2. Parent clicked
// 3. Grandparent clicked

// Con stopPropagation:
child.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("1. Child clicked");
});

// Click en button → imprime solo:
// 1. Child clicked
```

---

## ✅ Checklist de Estudio

- [ ] Entiendo qué es box-sizing y por qué usamos border-box
- [ ] Puedo explicar la diferencia entre Flexbox y Grid
- [ ] Sé cuándo usar cada tipo de position
- [ ] Entiendo cómo funciona el event bubbling
- [ ] Puedo crear transiciones y animaciones básicas
- [ ] Entiendo qué es el viewport y las unidades responsive
- [ ] Sé usar classList para manipular clases
- [ ] Entiendo cómo funciona Intersection Observer
- [ ] Puedo explicar qué es z-index y stacking context
- [ ] Entiendo la diferencia entre em, rem, px, y viewport units

---

## 🚀 Próximos Pasos

1. **Practica modificando el proyecto:**
   - Cambia colores
   - Agrega más héroes
   - Modifica animaciones

2. **Experimenta con DevTools:**
   - F12 en navegador
   - Inspecciona elementos
   - Modifica CSS en vivo

3. **Crea variaciones:**
   - Versión con tema oscuro/claro
   - Agregar modo nocturno
   - Crear diferentes layouts

4. **Aprende más sobre:**
   - CSS Variables (custom properties)
   - SASS/SCSS
   - JavaScript Modules
   - API Fetch para datos dinámicos

---

**¡Sigue practicando!** 💪

La programación se aprende haciendo. No te quedes solo leyendo, experimenta con el código.
