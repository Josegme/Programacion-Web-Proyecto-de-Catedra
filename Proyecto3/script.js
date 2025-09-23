document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío real

    // Obtiene los valores de los campos
    const nombres = document.getElementById("nombres").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const fecha = document.getElementById("fecha_nacimiento").value;
    const domicilio = document.getElementById("domicilio").value;

    // Muestra el mensaje
    alert(
      `Su DNI ha sido Registrado\n\nSus datos son:\nNombres: ${nombres}\nApellido: ${apellido}\nDNI: ${dni}\nFecha de Nacimiento: ${fecha}\nDomicilio: ${domicilio}`
    );

    form.reset(); // Opcional: limpia el formulario después
  });
});
