// Array para guardar los datos de los usuarios
let arrayDatos = [];

//Array para guardar unos usuarios predefinidos
let usuarios = [
  { email: "uf1306@uf1306.com", dni: "22993081G" },
  { email: "user@mysite.com", dni: "X2720486T" },
  { email: "federioter@gmail.com", dni: "49901049L" }
];
//Objeto donde pondremos todos los datos en falso para ir activando uno a uno según la validación 
let objetoFiltros = {
  nombre: false,
  apellido: false,
  fechaNac: false,
  dni: false,
  tel: false,
  email: false,
  postal: false,
  direccion: false,
  poblacion: false,
};

// Hay dos modos de trabajo: envío y modificación(edición)
let modoTrabajo = "envio";

// Función para recibir los datos del formulario
function enviarDatos() {
  // Creamos un objeto con los datos recogidos del formulario
  const datosAlumno = new Object();
  datosAlumno.nombre = corregirInicialNombre("nombre");
  datosAlumno.apellido = corregirInicialNombre("apellido");
  datosAlumno.fechaNac = reformateoFecha(
    document.getElementById("fecha-nac").value
  );
  datosAlumno.dni = document.getElementById("dni").value;
  datosAlumno.tel = document.getElementById("tel").value;
  datosAlumno.email = document.getElementById("email").value;
  datosAlumno.postal = document.getElementById("postal").value;
  datosAlumno.direccion = document.getElementById("direccion").value;
  datosAlumno.poblacion = document.getElementById("poblacion").value;

  // Añadimos el objeto al array
  // Cada vez que se ejecute la función añadirá un objeto nuevo
  // Cada objeto es por tanto una entrada del formulario y equivale a una fila de la tabla
  arrayDatos.push(datosAlumno);

  // Ejecutamos la función que crea y actualiza la tabla

  comprobarUsuarios()
  
  mostrarTabla();

  
}

// Función para rehacer textos en el caso que el usuario los escriba mal
// Por ejemplo mARia -> Maria
function corregirInicialNombre(id) {
  // De entrada, vaciamos el mensaje de advertencia al usuario, si lo hay
  document.getElementById("mensaje-" + id).innerHTML = "";

  // Quitar espacios al principio y al final de lo que venga por el input
  let sinEspacios = document.getElementById(id).value.trim();

  // Convertir texto en array por los espacios
  let arrayNombre = sinEspacios.split(" ");

  // Variable para construir el nombre correctamente
  let nombreFinal = "";

  // Accedemos a cada palabra del nombre
  for (let i = 0; i < arrayNombre.length; i++) {
    // Caso que no cumpla la validación
    // por haber introducido números por ejemplo
    if (!validarPalabra(arrayNombre[i])) {
      // Hay que poner el filtro en false por si acaso
      // antes estaba en true
      if (id == "nombre") {
        objetoFiltros.nombre = false;
      } else if (id == "apellido") {
        objetoFiltros.apellido = false;
      }
      // Mensaje para el usario
      document.getElementById("mensaje-" + id).innerHTML = "Texto inválido";

      // activamos o desactivamos el botón de envío
      activarBotonEnvio(modoTrabajo);

      // Salimos de la función
      return false;
    }

    // Construimos el texto correctamente:
    if (id == "nombre" || id == "apellido") {
      document.getElementById("mensaje-" + id).innerHTML = "✅";
    }

    // Construimos el texto correctamente:
    // inicial en mayúscula
    // el resto en minúsculas
    let nombreProv =
      arrayNombre[i].charAt(0).toUpperCase() +
      arrayNombre[i].slice(1).toLowerCase() +
      " ";

    // Excepciones habituales
    if (
      nombreProv == "Del " ||
      nombreProv == "De " ||
      nombreProv == "La " ||
      nombreProv == "Los " ||
      nombreProv == "Las " ||
      nombreProv == "Dels " ||
      nombreProv == "Les "
    ) {
      nombreFinal += arrayNombre[i].toLowerCase() + " ";
    } else {
      nombreFinal += nombreProv;
    }
  }

  // trim quita los espacios al principio y final del string
  nombreFinal = nombreFinal.trim();

  // Envíamos el nombre correctamente al input
  document.getElementById(id).value = nombreFinal;

  // Ponemos el "semáforo en verde"
  if (id == "nombre") {
    objetoFiltros.nombre = true;
  } else if (id == "apellido") {
    objetoFiltros.apellido = true;
  }

  // Comprobamos si se puede activar el botón de envío
  activarBotonEnvio(modoTrabajo);

  // devolvemos el nombre correcto y finalizamos la función
  return nombreFinal;
}

// Función para comprobar si un usuario es mayor de edad
function mayorEdad(fecha) {
  objetoFiltros.fechaNac = false;

  document.getElementById("mensaje-fecha-nac").innerHTML = "";
  //console.log("Fecha", fecha)
  const hoy = new Date(); // fecha actual
  const cumpleanos = new Date(fecha); // fecha introducida por el usuario
  let edad = hoy.getFullYear() - cumpleanos.getFullYear(); // diferencia
  let diferenciaMes = hoy.getMonth() - cumpleanos.getMonth();
  if (
    diferenciaMes < 0 ||
    (diferenciaMes === 0 && hoy.getDate() < cumpleanos.getDate())
  ) {
    edad--;
  }

  if (edad < 18) {
    document.getElementById("mensaje-fecha-nac").innerHTML =
      "<p>Debes ser mayor de edad</p>";
    activarBotonEnvio(modoTrabajo);

    return false;
  } else {
    objetoFiltros.fechaNac = true;
    document.getElementById("mensaje-fecha-nac").innerHTML = "✅";
    activarBotonEnvio(modoTrabajo);
  }
}

// Función para pasar del formato "año-mes-día" a "día-mes-año"
function reformateoFecha(fecha) {
  let nuevaFecha = fecha.split("-").reverse();
  return nuevaFecha.join("-");
}

// Función para contruir una tabla a partir de un array con objetos
function mostrarTabla() {
  if (arrayDatos.length == 0) {
    document.getElementById("tabla").innerHTML = "";
    return false;
  }

  let tabla = `
      <table>
      <thead>
          <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nac.</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Codigo Postal</th>
              <th>Direccion</th>
              <th>Poblacion</th>
              <th>Borrar</th>
              <th>Editar</th>
          </tr>
      </thead>
      <tbody>
      `;

  for (let i = 0; i < arrayDatos.length; i++) {
    tabla += `
          <tr>
          <td>${arrayDatos[i].nombre}</td>
          <td>${arrayDatos[i].apellido}</td>
          <td>${arrayDatos[i].fechaNac}</td>
          <td>${arrayDatos[i].dni}</td>
          <td>${arrayDatos[i].tel}</td>
          <td>${arrayDatos[i].email}</td>
          <td>${arrayDatos[i].postal}</td>
          <td>${arrayDatos[i].direccion}</td>
          <td>${arrayDatos[i].poblacion}</td>
          <td><span id="botonEliminar" onclick="eliminarFila(${i})">Eliminar</td>
          <td><span id="botonEditar" onclick="editarFila(${i})">Editar</td>
          </tr>
          `;
  }

  tabla += "</tbody></table>";

  document.getElementById("tabla").innerHTML = tabla;
}

// Función para eliminar una fila de la tabla
// debe mostrar otra vez la tabla sin el elemento borrado
function eliminarFila(pos) {
  arrayDatos.splice(pos, 1);
  mostrarTabla();
}

// Edita la fila de la tabla:
// recuperamos los datos edl objeto
// modificamos el botón de envío para que sea de edición
function editarFila(pos) {
  modoTrabajo = "edicion";

  document.getElementById("nombre").value = arrayDatos[pos].nombre;
  document.getElementById("apellido").value = arrayDatos[pos].apellido;
  document.getElementById("fecha-nac").value = reformateoFecha(
    arrayDatos[pos].fechaNac
  );
  document.getElementById("dni").value = arrayDatos[pos].dni;
  document.getElementById("tel").value = arrayDatos[pos].tel;
  document.getElementById("email").value = arrayDatos[pos].email;
  document.getElementById("postal").value = arrayDatos[pos].postal;
  document.getElementById("direccion").value = arrayDatos[pos].direccion;
  document.getElementById("poblacion").value = arrayDatos[pos].poblacion;

  document.getElementById(
    "div-enviar"
  ).innerHTML = `<button id="editarFila" type="button" onclick="editarDatos(${pos});" >Guardar Cambios</button>`;
}

// Función para modificar los datos del formulario:
// envía los datos modificados (o no) al objeto
// vuelve a poner el botón de enviar en su estado inicial
// vuelve a mostrar la tabla con los cambios
// vacía los datos del formulario
function editarDatos(pos) {
  arrayDatos[pos].nombre = corregirInicialNombre("nombre");
  arrayDatos[pos].apellido = corregirInicialNombre("apellido");
  arrayDatos[pos].fechaNac = reformateoFecha(
    document.getElementById("fecha-nac").value
  );
  arrayDatos[pos].dni = document.getElementById("dni").value;
  arrayDatos[pos].tel = document.getElementById("tel").value;
  arrayDatos[pos].email = document.getElementById("email").value;
  arrayDatos[pos].postal = document.getElementById("postal").value;
  arrayDatos[pos].direccion = document.getElementById("direccion").value;
  arrayDatos[pos].poblacion = document.getElementById("poblacion").value;

  document.getElementById(
    "div-enviar"
  ).innerHTML = `<button id="enviar" type="button" onclick="enviarDatos()" disabled>Enviar Datos</button>`;
  document.getElementById("mensaje-fecha-nac").innerHTML =
    "<p><sup>*</sup> Tienes que ser mayor de edad</p>";

  mostrarTabla();

  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("fecha-nac").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("email").value = "";
  document.getElementById("postal").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("poblacion").value = "";

  modoTrabajo = "trabajo";
}

// Validaremos si una palabra cumple los requisitos esperados
function validarPalabra(palabra) {
  // No vamos a aceptar nombres menores de dos letras
  if (palabra.length < 2) {
    return false;
  } else {
  }

  // Patrón de validación
  const patron = /^[ ·a-zA-ZñÑçÇáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙüÚïÏâêîôû]+$/;

  // devolverá true si se cumple el patrón
  return patron.test(palabra);
}

// Cuando los "semáforos" estén en verde (true) se activará el botón de envío
// pero se desactivará en caso contrario
function activarBotonEnvio(modoTrabajo) {
  if (modoTrabajo == "envio") {
    for (let nombrePropiedad in objetoFiltros) {
      if (objetoFiltros[nombrePropiedad] == false) {
        document.getElementById("enviar").setAttribute("disabled", "");
        return false;
      }
    }

    document.getElementById("enviar").removeAttribute("disabled");
    
  document.getElementById("formulario-aceptado").innerHTML = `<p id="formAceptado">Formulario aceptado</p>`
  

  
  } else {
    for (let nombrePropiedad in objetoFiltros) {
      if (objetoFiltros[nombrePropiedad] == false) {
        document.getElementById("editarFila").setAttribute("disabled", "");
        return false;
      }
    }
    document.getElementById("editarFila").removeAttribute("disabled");
  }
}

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).

// Acepta DNIs y NIEs (con X, Y o Z al principio)
// Para pruebas:
// X2720486T
// 22993081G

// Función que nos dice si el dni o nie es correcto, si nos faltan caracteres, si nos sobran caracteres y si nos faltara la letra. 
function validaDniNie(dni) {
  let numero, letr, letra;
  const patronDniNie = /^[XYZ]?\d{5,8}[A-Z]$/;

  dni = dni.toUpperCase();

  if (patronDniNie.test(dni) === true) {
    numero = dni.substr(0, dni.length - 1);
    numero = numero.replace("X", 0);
    numero = numero.replace("Y", 1);
    numero = numero.replace("Z", 2);
    letr = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    letra = "TRWAGMYFPDXBNJZSQVHLCKET";
    letra = letra.substring(numero, numero + 1);
    if (letra != letr) {
      document.getElementById("mensaje-dni").innerHTML =
        "Dni o Nie erróneo, formato no válido ";
      objetoFiltros.dni = false;
      activarBotonEnvio(modoTrabajo);
    } else {
      document.getElementById("mensaje-dni").innerHTML = "✅";
      objetoFiltros.dni = true;
      activarBotonEnvio(modoTrabajo);
    }
  } else {
    document.getElementById("mensaje-dni").innerHTML =
      "Dni o Nie erróneo, formato no válido";
    objetoFiltros.dni = false;
    activarBotonEnvio(modoTrabajo);
    if (dni.length > 9) {
      document.getElementById(
        "mensaje-dni"
      ).innerHTML = `<p>El dni tiene ${dni.length} debe tener 9 caracteres</p>`; 
      activarBotonEnvio(modoTrabajo);
    } else if (dni.length < 9) {
      document.getElementById("mensaje-dni").innerHTML =
      `<p>El dni tiene ${dni.length} debe tener 9 caracteres</p>
      <p>Falta la letra (dni) o letras (nie) </p>`;
      activarBotonEnvio(modoTrabajo);
    } else {
      document.getElementById("mensaje-dni").innerHTML =
        "Dni o Nie erróneo, letra faltante o incorrecta";
      activarBotonEnvio(modoTrabajo);
    }
  }
}

//Función para validar el teléfono solo admite numeros
function validaTel(tel) {
  let patron = /^[0-9]{9}$/;
  if (patron.test(tel) === true) {
    document.getElementById("mensaje-tel").innerHTML = "✅";
    objetoFiltros.tel = true;
    activarBotonEnvio(modoTrabajo);
  } else {
    document.getElementById("mensaje-tel").innerHTML =
      "Teléfono inválido (9 cifras sin prefijo)";
    objetoFiltros.tel = false;
    activarBotonEnvio(modoTrabajo);
  }
}
//Función para validar el email con un mensaje si nos faltara el arroba

function validaEmail(email) {
  let patron =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let mensajeEmail = document.getElementById("mensaje-email");
 
  if (patron.test(email)) {
    mensajeEmail.innerHTML = "✅";
    objetoFiltros.email = true;
  } else {
    mensajeEmail.innerHTML = "Email inválido";
    objetoFiltros.email = false;
  }

  if (email.indexOf("@") === -1) {
    mensajeEmail.innerHTML = "Falta el arroba";
    objetoFiltros.email = false;
  } else if (email.indexOf("@") === 0) {
    mensajeEmail.innerHTML = "El email no puede comenzar con arroba";
    objetoFiltros.email = false;
  }
    activarBotonEnvio(modoTrabajo);

}

//Función que nos va a reiniciar todos los campos de mensajes

function borrarMensajes() {
  document.getElementById("mensaje-nombre").innerHTML = "";
  document.getElementById("mensaje-apellido").innerHTML = "";
  document.getElementById("mensaje-fecha-nac").innerHTML = "";
  document.getElementById("mensaje-dni").innerHTML = "";
  document.getElementById("mensaje-tel").innerHTML = "";
  document.getElementById("mensaje-email").innerHTML = "";
  document.getElementById("mensaje-poblacion").innerHTML = "";
  document.getElementById("mensaje-direccion").innerHTML = "";
  document.getElementById("mensaje-postal").innerHTML = "";
  document.getElementById("formulario-aceptado").innerHTML = "";
  document.getElementById("usuario-aceptado").innerHTML = "";
}

function validaCodigoPostal(codigoPostal) {
  // Expresión regular para validar el código postal (formato: XXXXX o XXXXX-XXXX)
  const patron = /^\d{5}(?:-\d{4})?$/;

  // Comprobamos si el código postal coincide con la expresión regular
  if (patron.test(codigoPostal)) {
    document.getElementById("mensaje-postal").innerHTML = "✅";
    objetoFiltros.postal = true;
    activarBotonEnvio(modoTrabajo);
  } else {
    document.getElementById("mensaje-postal").innerHTML =
      "Código postal inválido";
    objetoFiltros.postal = false;
    activarBotonEnvio(modoTrabajo);
  }
}

//Función para validar el campo de la  población

function validaPoblacion(poblacion) {
  const patron = /^[a-zA-Z\s-]+$/;

  if (patron.test(poblacion) && poblacion.length >= 2) {
    document.getElementById("mensaje-poblacion").innerHTML = "✅";
    objetoFiltros.poblacion = true;
    activarBotonEnvio(modoTrabajo);
  } else {
    document.getElementById("mensaje-poblacion").innerHTML =
      "Texto inválido";
    objetoFiltros.poblacion = false;
    activarBotonEnvio(modoTrabajo);
  }
}

// Expresión regular para validar la dirección (ejemplo básico)
function validaDireccion(direccion) {
  const patron = /^[a-zA-Z0-9\s.,#-]+$/;

  if (patron.test(direccion)) {
    document.getElementById("mensaje-direccion").innerHTML = "✅";
    objetoFiltros.direccion = true;
    activarBotonEnvio(modoTrabajo);
  } else {
    document.getElementById("mensaje-direccion").innerHTML =
      "Texto inválido";
    objetoFiltros.direccion = false;
    activarBotonEnvio(modoTrabajo);
  }
}



//Función que recorre el array usuarios con dos objetos para que nos muestre al enviar los datos que se ha encontrado un usuario existente
function comprobarUsuarios(){
  let dni = document.getElementById("dni").value
  let email = document.getElementById("email").value

  for (let i = 0 ; i < usuarios.length; i++){
      if(dni == usuarios[i].dni && email == usuarios[i].email){
        document.getElementById("usuario-aceptado").innerHTML = `<p id="usuarioAceptado">Usuario aceptado</p>`
        
  }

}
}

