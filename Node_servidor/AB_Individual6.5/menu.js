const fs = require('fs');
const readline = require('readline');

// se crea la interfase con la que interactua con el usuario
const rl = readline.createInterface({
  input: process.stdin, //para input
  output: process.stdout //para output
});

// Función para consultar y mostrar el menú en consola
async function mostrarMenu() {
  try {
    const data = await fs.promises.readFile('menu.json', 'utf8');
    const menu = JSON.parse(data);
    console.log(JSON.stringify(menu, null, 4));
  } catch (error) {
    console.error(error);
  }
}

// Función para agregar un nuevo plato al menú
async function agregarPlato() {
  try {
    const nombrePlato = await pregunta('Ingrese el nombre del plato: '); //se utiliza await para esperar el nombre del plato
    const precioPlato = await pregunta('Ingrese el precio del plato: ');// se utiliza await para esperar el precio
//una vez que el usuario ingresa el nombre del plato y precio plato se crea el nuevo objeto
    const nuevoPlato = {
      nombre: nombrePlato,
      precio: parseFloat(precioPlato)
    };

     /*aqui leemos el archivo menu.json, 
    se utiliza await para esperar a a que se lea todo el archivo*/ 
    const data = await fs.promises.readFile('menu.json', 'utf8'); 
    const menu = JSON.parse(data); //se utiliza Json.parse para convertir el contenido en un objeto javascript
    menu.almuerzos.push(nuevoPlato); //se  ingresa el nuevo plato al menu

    await fs.promises.writeFile('menu.json', JSON.stringify(menu, null, 4), 'utf8'); //Se escribe el nuevo plato al menu 
    console.log('Plato agregado al menú con éxito.');
  } catch (error) { //maneja los errores en el proceso
    console.error(error);
  }
}

// Función para eliminar un plato del menú
async function eliminarPlato() {
  try {
    const nombrePlato = await pregunta('Ingrese el nombre del plato a eliminar: ');

    const data = await fs.promises.readFile('menu.json', 'utf8');
    const menu = JSON.parse(data); //convierte a un objeto de javascript
    const platos = menu.almuerzos; //se obtiene el arreglo de platos a traves de menu.almuerzos
    const indice = platos.findIndex((plato) => plato.nombre === nombrePlato); //se utiliza findIndex para buscar entre el menu el plato ingresado

    if (indice !== -1) { // si el indice es diferente a -1
      platos.splice(indice, 1); // se procede a eliminar el plato del menu
      await fs.promises.writeFile('menu.json', JSON.stringify(menu, null, 4), 'utf8'); // el numero 4 se relaciona con la indentación al convertir el objeto javascript a un JSON
      console.log('Plato eliminado del menú con éxito.');
    } else {
      console.log('No se encontró el plato en el menú.'); //ocurre si el indice es igual a -1
    }
  } catch (error) { 
    console.error(error);
  }
}

// Función para realizar una pregunta al usuario y obtener su respuesta
function pregunta(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// Ejemplo de uso:
async function gestionarMenu() {
  console.log('--- MENÚ DEL RESTAURANTE ---');
  console.log('1. Mostrar menú');
  console.log('2. Agregar plato');
  console.log('3. Eliminar plato');
  console.log('0. Salir');

  const opcion = await pregunta('Seleccione una opción: ');

  switch (opcion) {
    case '1':
      await mostrarMenu();
      break;
    case '2':
      await agregarPlato();
      break;
    case '3':
      await eliminarPlato();
      break;
    case '0':
      rl.close();
      return;
    default:
      console.log('Opción inválida.');
  }

  console.log('\n');
  await gestionarMenu();
}

gestionarMenu();
