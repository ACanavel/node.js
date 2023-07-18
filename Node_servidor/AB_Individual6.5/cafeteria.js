const fs = require('fs');
const readline = require('readline');

//creamos la interfaz que va a interactuar con el usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//funcion para consultar y mostrar el menú en consola
async function mostrarCafeteria () {
  try {
    const data = await fs.promises.readFile('cafeteria.json', 'utf8');
    const cafeteria = JSON.parse(data);
    console.log(JSON.stringify(cafeteria,null,4));    
  } catch (error) {
    console.error(error);
  }
}

//funcion para agregar un nuevo cafe
async function agregarCafe() {
  try {
    const nombreCafe = await pregunta('Ingrese el nombre del café: ');
    const precioCafe = await pregunta('Ingrese el precio del café: ');

    if (!nombreCafe || !precioCafe) { //validación para evitar que se agregue en blanco
      console.log('Los campos no pueden estar en blanco. Intente nuevamente.');
      return;
    }

    const nuevoCafe = {
      nombre: nombreCafe,
      precio: parseFloat(precioCafe)
    };

    const data = await fs.promises.readFile('cafeteria.json', 'utf8');
    const cafeteria = JSON.parse(data);
    cafeteria.cafes.push(nuevoCafe);

    await fs.promises.writeFile('cafeteria.json', JSON.stringify(cafeteria, null, 4), 'utf8');
    console.log('¡Café agregado con éxito!');
  } catch (error) {
    console.error(error);
  }
}


//función para eliminar café de la cafeteria
async function eliminarCafe () {
try {
  const nombreCafe = await pregunta('Ingrese el nombre del café que desea eliminar: ');

  const data = await fs.promises.readFile('cafeteria.json', 'utf8');
  const cafeteria = JSON.parse(data);
  const cafes = cafeteria.cafes;
  const indice = cafes.findIndex((cafe) => cafe.nombre === nombreCafe);

  if (indice !== -1) {
    cafes.splice(indice, 1);
    await fs.promises.writeFile('cafeteria.json', JSON.stringify(cafeteria,null,4),'utf8');
    console.log('El café se ha eliminado');
  } else {
    console.log('No se encontró el café en la lista');
  }
} catch (error) {
  console.log('error');
  
}

}
//funcion pregunta 
function pregunta(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
    
   }); 

  }
//Ejemplo de uso

async function gestionarCafeteria() {
  console.log(' -----Cafeteria Dolce Gusto----');
  console.log('1. Mostrar Lista de Café');
  console.log('2. Agregar Café');
  console.log('3. Eliminar Café');
  console.log('0. Salir');

  
  const opcion = await pregunta('Seleccione una opción: ');
  switch (opcion) {
    case '1':
      await mostrarCafeteria ();
      break;
      case '2':
        await agregarCafe();
        break;
        case '3':
        await eliminarCafe ();
        break;
        case '0':
       rl.close();
       return;
    default:
      console.log('Opción Inválida');
      
  }
  console.log('\n');
  await gestionarCafeteria()

}

gestionarCafeteria();