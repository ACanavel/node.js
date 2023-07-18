
//Primer paso importamos los modulos
const http = require('http'); //modulo http
const url = require('url'); //modulo url
const fs = require('fs'); //modulo fs
const path = require('path'); //modulo path (proporciona utilidades para trabajar rutas de archivos y directorios)

//creación del servidor
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); //manejo de rutas
  const { pathname, query } = parsedUrl;

  if (pathname === '/crear' && req.method === 'GET') { // condición que se utiliza para verificar si la ruta de la solicitud es "/crear" y si el método de solicitud es GET.
    const { archivo, contenido } = query;

    const fechaActual = obtenerFechaActual();
    const contenidoArchivo = `${fechaActual}\n${contenido}`;
// lo utilizamos para crear el archivo
    fs.writeFile(archivo, contenidoArchivo, (err) => {
      if (err) {
        res.statusCode = 500;//errores del servidor
        res.end(`Error al crear el archivo: ${err.message}`);
      } else {
        res.statusCode = 200;
        res.end(`Archivo creado exitosamente: ${archivo}`);
      }
    });
  } else if (pathname === '/leer' && req.method === 'GET') {
    const { archivo } = query;
// lo utilizamos para leer el archivo
    fs.readFile(archivo, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;// error que indica que no se encuentra el servidor
        res.end(`Error al leer el archivo: ${err.message}`);
      } else {
        res.statusCode = 200; //indica que la solicitud fue exitosa
        res.end(data);
      }
    });
  } else if (pathname === '/renombrar' && req.method === 'GET') { // condición que se utiliza para verificar si la ruta de la solicitud es "/renombrar" y si el método de solicitud es GET.
    const { nombre, nuevoNombre } = query;
// lo utilizamos para renombrar el archivo
    fs.rename(nombre, nuevoNombre, (err) => {
      if (err) {
        res.statusCode = 500; //errores del servidor
        res.end(`Error al renombrar el archivo: ${err.message}`);
      } else {
        res.statusCode = 200; //Indica que la solicitud fue exitosa
        res.end(`Archivo renombrado exitosamente. Nombre anterior: ${nombre}, Nuevo nombre: ${nuevoNombre}`);
      }
    });
  } else if (pathname === '/eliminar' && req.method === 'GET') { // condición que se utiliza para verificar si la ruta de la solicitud es "/eliminar" y si el método de solicitud es GET.
    const { archivo } = query;

    res.statusCode = 200; //Indica que la solicitud fue exitosa
    res.write(`Tu solicitud para eliminar el archivo ${archivo} se está procesando`);

    setTimeout(() => {
        //lo utilizamos para eliminar el archivo
      fs.unlink(archivo, (err) => {
        if (err) {
          console.log(`Error al eliminar el archivo: ${err.message}`);
        } else {
          console.log(`Archivo eliminado exitosamente: ${archivo}`);
          res.end(`\nArchivo eliminado exitosamente: ${archivo}`);
        }
      });
    }, 3000);
  } else {
    res.statusCode = 404;
    res.end('Ruta no encontrada');
  }
});
//configuración del puerto para escuchar el servidor
const port = 8080;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Función para obtener la fecha actual en formato dd/mm/yyyy
function obtenerFechaActual() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
