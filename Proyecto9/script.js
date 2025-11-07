// Tarea 1: Identificación de Scope (Ámbito)

const nombre = "Gemini";
console.log("El nombre es:", nombre);

try {
  nombre = "Google";
} catch (error) {
  console.error("Error al intentar reasignar 'nombre':", error.message);
}

if (true) {
  var contador = 50;
  console.log("Dentro del bloque if, 'contador' es:", contador);
}
console.log("Fuera del bloque if, 'contador' es:", contador);

if (true) {
  let mensaje = "Variable de bloque";
  console.log("Dentro del bloque if, 'mensaje' es:", mensaje);
}

try {
  console.log("Fuera del bloque if, 'mensaje' es:", mensaje);
} catch (error) {
  console.error(
    "Error al intentar acceder a 'mensaje' fuera del bloque:",
    error.message
  );
}
