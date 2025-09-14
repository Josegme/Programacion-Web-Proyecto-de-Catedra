# Documentación del Proyecto 1: Comidas Rápidas

Este documento detalla la estructura y los componentes del `Proyecto1`, con un enfoque en el archivo `index.html`. El objetivo es que cualquier persona pueda leer y entender la arquitectura del sitio y el propósito de cada elemento.

## Estructura del Archivo HTML (`index.html`)

El archivo `index.html` es el esqueleto de la página web. A continuación, se desglosa su estructura y se explica la función de sus etiquetas principales.

### 1. Declaración Inicial

```html
<!DOCTYPE html>
```

- **Función:** Esta es la primera línea obligatoria en cualquier documento HTML5. No es una etiqueta HTML, sino una "declaración" que le indica al navegador que el documento que está a punto de procesar es HTML5. Esto asegura que el navegador renderice la página en modo estándar y no en "modo quirks" (un modo de compatibilidad para páginas antiguas).

### 2. Elemento Raíz

```html
<html lang="es"></html>
```

- **Función:** Es la etiqueta raíz que envuelve todo el contenido de la página.
- **Atributo `lang="es"`:** Especifica que el idioma principal del contenido de la página es español ("es"). Esto es crucial para:
  - **Accesibilidad:** Los lectores de pantalla lo utilizan para pronunciar correctamente el texto.
  - **SEO:** Ayuda a los motores de búsqueda a clasificar la página y dirigirla al público de habla hispana.

### 3. Cabecera del Documento (`<head>`)

El `<head>` contiene metadatos sobre el documento, que no son visibles directamente en la página, pero son importantes para el navegador, los motores de búsqueda y otros servicios web.

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Proyecto 1: Comidas Rápidas</title>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
  />
  <link rel="stylesheet" href="style.css" />
</head>
```

- **`<meta charset="UTF-8">`**: Define el conjunto de caracteres que utiliza el documento. `UTF-8` es el estándar universal y permite mostrar correctamente casi cualquier carácter o símbolo, incluyendo acentos y caracteres especiales del español.
- **`<meta http-equiv="X-UA-Compatible" content="IE=edge">`**: Es una directiva específica para Internet Explorer. Le indica que debe usar su motor de renderizado más moderno (`edge`), asegurando una mejor compatibilidad y evitando problemas de visualización en versiones antiguas de ese navegador.
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Es fundamental para el diseño web responsivo (adaptable a móviles).
  - `width=device-width`: Establece el ancho de la página para que siga el ancho de la pantalla del dispositivo.
  - `initial-scale=1.0`: Fija el nivel de zoom inicial cuando la página se carga por primera vez.
- **`<title>`**: Define el título del documento que se muestra en la pestaña o en la barra de título del navegador. Es muy importante para el SEO y la usabilidad.
- **`<link>`**: Se utiliza para vincular recursos externos.
  - El primer `link` importa la hoja de estilos CSS de la librería **Swiper.js** desde una CDN (Content Delivery Network), necesaria para los carruseles de imágenes.
  - El segundo `link` vincula nuestra propia hoja de estilos, `style.css`, que contiene los estilos personalizados del sitio.

### 4. Cuerpo del Documento (`<body>`)

El `<body>` contiene todo el contenido visible de la página web: texto, imágenes, enlaces, etc.

#### 4.1. Encabezado (`<header>`)

Representa el contenido introductorio de la página. En este proyecto, contiene el logo, la navegación principal y un carrusel de imágenes (slider).

- **`<nav class="navbar">`**: Etiqueta semántica que define una sección de navegación. Agrupa los enlaces principales del sitio.
- **`<input type="checkbox" id="menu">` y `<label for="menu">`**: Este es un truco común conocido como "Checkbox Hack". Se utiliza para crear un menú de hamburguesa para móviles sin necesidad de JavaScript. Al hacer clic en el `label` (el ícono de menú), se activa o desactiva el `checkbox`, y mediante CSS se muestra u oculta el menú de navegación (`.navbar`).
- **`<div class="swiper mySwiper-1">`**: Contenedor para el carrusel principal, utilizando la librería Swiper.js.

#### 4.2. Contenido Principal (`<main>`)

La etiqueta `<main>` envuelve el contenido principal y más importante de la página. Solo debe haber un `<main>` por página.

- **`<div class="tabs container">`**: Esta sección implementa un sistema de pestañas para mostrar diferentes categorías de productos (Hamburguesas, Burritos, etc.).
- **`<input type="radio" name="tabs" ...>` y `<label for="tab1">`**: Similar al "Checkbox Hack", este sistema utiliza botones de radio para controlar qué pestaña está activa. Al seleccionar un `label`, se marca el `input` de radio correspondiente, y CSS se encarga de mostrar solo el contenido (`<div class="tab">`) asociado a esa pestaña.

#### 4.3. Secciones Adicionales (`<section>`)

Se utilizan para agrupar contenido temáticamente.

- **`<section class="info container">`**: Una sección con información general sobre el negocio.
- **`<section class="horario">`**: Muestra la dirección, horarios y datos de contacto.
- **`<section>` con `<iframe>`**: Esta sección contiene un mapa de Google Maps incrustado mediante una etiqueta `<iframe>`. El `iframe` permite mostrar una página web dentro de otra.

#### 4.4. Pie de Página (`<footer>`)

Contiene la información que suele ir al final de una página: enlaces secundarios, información de copyright, redes sociales, etc.

### 5. Scripts (`<script>`)

Estas etiquetas se usan para incluir código JavaScript.

```html
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
<script src="script.js"></script>
```

- Se colocan al final del `<body>` por una razón de rendimiento: el navegador primero carga y muestra todo el contenido HTML y CSS (la parte visual), y luego procesa los scripts. Esto evita que la carga de JavaScript bloquee la renderización de la página, mejorando la percepción de velocidad para el usuario.
- El primer `script` carga la librería **Swiper.js** desde su CDN.
- El segundo `script` vincula nuestro archivo `script.js`, que contendrá la lógica personalizada para inicializar los carruseles y cualquier otra interactividad.

========================================================================

## Estructura del Archivo CSS (`style.css`)

El archivo `style.css` contiene todas las reglas de estilo que definen la apariencia visual de la página. A continuación, se explica la teoría básica de CSS y la estructura de este archivo.

### 1. Teoría Básica de CSS y Especificidad

**CSS (Cascading Style Sheets)**, u Hojas de Estilo en Cascada, es el lenguaje que usamos para describir la presentación de un documento HTML. Funciona seleccionando elementos en el HTML y aplicándoles "reglas" de estilo (color, tamaño, posición, etc.).

La "cascada" es un concepto fundamental. Significa que los estilos pueden provenir de diferentes fuentes (hoja de estilos del navegador, del usuario y del autor) y se aplican en un orden determinado. Cuando varias reglas apuntan al mismo elemento, el navegador utiliza la **especificidad** para decidir cuál aplicar.

#### Escala de Especificidad (de menor a mayor poder):

1.  **Selectores de tipo y pseudo-elementos:** (Ej: `div`, `p`, `::before`). Son los menos específicos.
2.  **Selectores de clase, de atributo y pseudo-clases:** (Ej: `.container`, `[type="radio"]`, `:hover`). Tienen un peso medio.
3.  **Selectores de ID:** (Ej: `#menu`). Son muy específicos, ya que un ID debe ser único en la página.
4.  **Estilos en línea:** (Ej: `<div style="color: red;">`). Tienen una especificidad aún mayor.
5.  **`!important`:** (Ej: `color: red !important;`). Esta declaración anula cualquier otra. Se debe usar con mucha precaución, ya que puede dificultar el mantenimiento del CSS.

El navegador calcula un "puntaje" para cada regla basado en estos selectores, y la regla con el puntaje más alto "gana" y se aplica.

### 2. Análisis de la Estructura de `style.css`

El archivo está organizado de una manera lógica y secuencial, desde reglas generales hasta estilos más específicos y adaptaciones para móviles.

- **`@import`**: La primera línea importa una fuente (`Lato`) desde Google Fonts. Esto permite usar tipografías personalizadas en el sitio.

- **Reseteo Básico (`*`)**:

  ```css
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* ... */
  }
  ```

  Se utiliza el selector universal (`*`) para aplicar un reseteo a todos los elementos.

  - `margin: 0; padding: 0;`: Elimina los márgenes y rellenos que los navegadores aplican por defecto.
  - `box-sizing: border-box;`: Cambia el modelo de caja. Con esta regla, el `padding` y el `border` se incluyen dentro del ancho y alto total del elemento, lo que facilita mucho la creación de layouts.

- **Estilos Globales (`body`, `.container`)**: Se definen estilos base para toda la página, como el color de fondo, la fuente principal (`font-family`) y una clase `.container` para centrar el contenido y limitar su ancho máximo.

- **Estilos de Componentes Externos (Swiper)**: Se personalizan los estilos de la librería Swiper.js. Por ejemplo, se cambia el color y tamaño de las flechas de navegación (`.swiper-button-next`, `.swiper-button-prev`) y los indicadores de paginación (`.swiper-pagination-bullet`).

- **Layout Principal y Secciones**:

  - **`header` y `nav` (`.menu`, `.navbar`)**: Contiene los estilos para el encabezado, la barra de navegación, los logos y los menús. Aquí también se encuentran los estilos para el "Checkbox Hack" que controla el menú móvil.
  - **Slider (`.slider`, `.slider-txt`, `.slider-img`)**: Define la apariencia del carrusel principal, organizando el texto y la imagen en dos columnas.
  - **Productos y Pestañas (`.products`, `.tabs`)**: Estilos para la sección de productos. Incluye la lógica visual para el sistema de pestañas basado en `input[type="radio"]`, donde solo la pestaña seleccionada (`:checked`) muestra su contenido.
  - **Secciones de Información (`.info`, `.horario`)**: Estilos para las secciones de "Información" y "Horario".
  - **Mapa (`.map`)**: Se aplica un filtro CSS (`filter`) al `<iframe>` de Google Maps para cambiar su apariencia (escala de grises, inversión de color) y que se integre mejor con el diseño oscuro de la página.
  - **Footer (`.footer`)**: Estilos para el pie de página, organizando los enlaces y elementos.

- **Diseño Responsivo (`@media`)**:
  `css
    @media(max-width: 991px) {
        /* ... */
    }
    `
  Esta es una **Media Query**. Todas las reglas dentro de este bloque solo se aplicarán en dispositivos cuya pantalla tenga un ancho máximo de 991 píxeles. Es la clave para que el sitio sea adaptable. - **Cambios principales en móvil**: - Se oculta el menú de escritorio (`.menu-2`) y se muestra el ícono de hamburguesa (`.menu label`). - La barra de navegación (`.navbar`) se convierte en un menú desplegable vertical. - Los layouts que eran de dos columnas (como el slider o la sección de información) pasan a ser de una sola columna (`flex-direction: column`), apilando los elementos verticalmente. - Se ajustan tamaños de fuente, paddings y márgenes para optimizar el espacio en pantallas pequeñas.
  ========================================================================
