const fs = require('fs');

// Ruta y nombre del archivo a crear
const saludo = 'Saludo.txt';
const contenido = 'Hola Mundo!';

// Crear el archivo con el método writeFile
fs.writeFile(saludo, contenido, (error) => {
    if (error) {
        console.log('Error al crear el archivo:', error);
    } else {
        console.log('Archivo creado exitosamente.');

        // Leer el contenido del archivo con el método readFile
        fs.readFile(saludo, 'utf8', (error, data) => {
            if (error) {
                console.log('Error al leer el archivo:', error);
            } else {
                console.log('Contenido del archivo:', data);
            }
        });
    }
});