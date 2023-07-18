const yargs = require('yargs');

// Definir el comando "adulto" con el argumento "edad"
yargs.command({
  command: 'adulto',
  describe: 'Verificar si una persona es mayor de edad',
  builder: {
    edad: {
      describe: 'Edad de la persona',
      demandOption: true,
      type: 'number'
    }
  },
  handler: function (argv) {
    // Evaluar si el valor del argumento "edad" es mayor a 18
    if (argv.edad >= 18) {
      console.log('Mayor de edad');
    } else {
      console.log('Menor de edad');
    }
  }
});

// Parsear los argumentos de la línea de comando
yargs.parse();
