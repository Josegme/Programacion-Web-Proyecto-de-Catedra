# Documentación del Proyecto 3: Developer Capibara

Este documento detalla la estructura y los componentes del `Proyecto3`, explicando la lógica detrás de los archivos `index.html` y `style.css`. El objetivo es que sirva como una guía clara para entender la arquitectura y el diseño del sitio.

## Estructura del Archivo HTML (`index.html`)

El `index.html` es el esqueleto de la página. Es una "single-page" o página de una sola vista, donde la navegación desplaza al usuario a diferentes secciones en lugar de cargar nuevas páginas.

### 1. Cabecera del Documento (`<head>`)

Contiene metadatos e importaciones esenciales:

- **`<meta>` tags**: Incluyen `charset="UTF-8"` para la correcta visualización de caracteres, y `name="viewport"` para asegurar que el diseño sea responsivo y se adapte a dispositivos móviles.
- **`<title>`**: "Developer Capibara", el título que aparece en la pestaña del navegador.
- **`<link rel="stylesheet" href="style.css">`**: Vincula la hoja de estilos principal que define toda la apariencia del sitio.

### 2. Cuerpo del Documento (`<body>`)

Contiene todo el contenido visible, estructurado semánticamente.

#### 2.1. Encabezado (`<header>`)

- **Función**: Es la barra de navegación superior. Gracias a `position: sticky` en el CSS, se mantiene fija en la parte superior de la pantalla cuando el usuario hace scroll, mejorando la experiencia de navegación.
- **Estructura**:
  - `<div class="logo-container">`: Agrupa el logo (`.header-logo`) y el título principal (`<h1>`), alineados con Flexbox.
  - `<nav class="main-nav">`: Contiene la lista de enlaces (`.nav-list`) que apuntan a las diferentes secciones de la página mediante anclas (ej: `href="#about"`).

#### 2.2. Contenido Principal (`<main>`)

Agrupa todas las secciones principales del sitio.

- **`<section id="hero">`**: La sección de bienvenida. Ocupa casi toda la altura de la pantalla (`min-height: 90vh`) y utiliza una imagen de fondo con una capa oscura (`linear-gradient`) para asegurar que el texto blanco sea legible.
- **`<section id="about">`**: La sección "Sobre mi".
  - **Fondo de Video**: Utiliza la etiqueta `<video>` para mostrar un fondo dinámico en bucle.
  - **Layout de 2 Columnas**: `.about-layout` usa Flexbox para dividir el espacio entre el texto (`.about-text`) y la imagen (`.about-image`).
  - **Tarjeta de Cristal (Glassmorphism)**: El contenedor `.about-text` tiene un fondo semitransparente y un `backdrop-filter: blur()`, creando un efecto de cristal esmerilado sobre el video.
- **`<section id="services">`**: La sección de servicios.
  - **Layout Alternado**: También usa un layout de 2 columnas, pero con `flex-direction: row-reverse` para alternar la posición de la imagen y el texto, creando un diseño más dinámico.
  - **Lista de Enlaces**: Cada servicio es un enlace (`<a>`) que dirige al portfolio del desarrollador.
- **`<section class="blog">`**: Contiene un artículo principal y un carrusel de tarjetas (`.carousel-item`) que simulan otras entradas del blog.
- **`<section id="contact">`**: El formulario de contacto.
  - **Fondo de Video**: Al igual que la sección "Sobre mi", tiene un video de fondo con una capa oscura para garantizar la legibilidad.
  - **Formulario Estilizado**: Los campos (`<input>`, `<textarea>`) están agrupados en `.form-group` para un mejor control del diseño.

#### 2.3. Pie de Página (`<footer>`)

- Contiene la información de copyright y los enlaces a redes sociales, representados por imágenes (`<img>`). Está diseñado con Flexbox para alinear los elementos.

#### 2.4. Script

- **`<script src="script.js">`**: Se coloca al final del `<body>`. Aunque actualmente está vacío, está preparado para añadir interactividad con JavaScript, como la conexión del formulario con n8n.

---

## Estructura del Archivo CSS (`style.css`)

El `style.css` está organizado de forma modular, desde reglas generales a estilos específicos de cada sección.

### 1. Base y Globales

- **`@import`**: Importa la fuente "Poppins" desde Google Fonts.
- **`:root`**: Define las variables de CSS (Custom Properties) para la paleta de colores (ej: `--background-dark`, `--primary-accent`). Esto permite mantener la consistencia y facilita los cambios de diseño.
- **Reseteo (`*`) y `body`**: Se eliminan los márgenes y paddings por defecto y se establece la fuente y los colores base para toda la página.
- **`html { scroll-behavior: smooth; }`**: Hace que el desplazamiento al hacer clic en los enlaces de ancla sea suave en lugar de un salto brusco.

### 2. Estilos de Componentes y Secciones

- **`header`**: Se usa `position: sticky` y `z-index` para mantenerlo visible y por encima de todo. Flexbox se usa para distribuir el logo y la navegación.
- **Layouts de 2 Columnas (`.about-layout`, `.services-layout`)**: Se basan en `display: flex`. La propiedad `gap` controla el espacio entre columnas y `flex: 1` (o `1.5`) distribuye el espacio disponible.
- **Efectos 3D en Imágenes**: Se usa un pseudo-elemento `::after` para crear una "sombra" sólida detrás de la imagen. En el `:hover`, se mueven la imagen y la sombra en direcciones opuestas para crear una ilusión de profundidad.
- **Fondos de Video**: Se posicionan de forma absoluta (`position: absolute`) para cubrir toda la sección, con un `z-index` negativo para enviarlos detrás del contenido. Una capa de color semitransparente (usando `::before`) se coloca encima del video para mejorar la legibilidad del texto.
- **Efecto Glassmorphism (`.about-text`)**: La clave es la propiedad `backdrop-filter: blur(10px);` combinada con un `background` semitransparente.
- **Formulario (`.contact form`)**: Se estilizan los `input` y `textarea` para que tengan un aspecto moderno, con un cambio de color en el borde al enfocarlos (`:focus`).
- **Tarjetas del Blog (`.carousel-item`)**: Usan `background-image` para mostrar las imágenes. El efecto de resaltado en `:hover` combina `transform: scale() translateY()` y un cambio en el `box-shadow` para dar una sensación de elevación.
- **Footer**: Usa Flexbox para alinear el texto de copyright y los logos de redes sociales.

Este enfoque modular y el uso de técnicas modernas como Flexbox, CSS Variables y pseudo-elementos hacen que el código sea mantenible, escalable y visualmente atractivo.

---

## Documentación: Registro de DNI con JavaScript

El archivo `script.js` permite simular el registro de un DNI sin necesidad de una base de datos. Cuando el usuario completa el formulario y lo envía:

- El envío real del formulario se detiene (`preventDefault`).
- Se obtienen los valores de los campos: Nombres, Apellido, DNI, Fecha de Nacimiento y Domicilio.
- Se muestra un mensaje emergente (`alert`) con todos los datos ingresados.
- El formulario se limpia automáticamente después de mostrar el mensaje.

Este comportamiento es útil para pruebas y demostraciones, permitiendo visualizar los datos ingresados por el usuario sin almacenarlos en un servidor.

**Ejemplo de uso:**

1. Completa el formulario de registro.
2. Haz clic en "Registrar".
3. Aparecerá un mensaje con los datos ingresados.
4. El formulario se vacía para un nuevo registro.
