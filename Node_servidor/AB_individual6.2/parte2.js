const yargs = require('yargs');

const argv = yargs
  .command('saludo', 'Saluda a alguien', {
    nombre: {
      describe: 'Nombre de la persona',
      demand: true,
      alias: 'n'
    }
  })
  .help()
  .argv;

function saludar(args) {
  console.log(`¡Hola ${args.nombre}! ¡Que tengas un excelente día!`);
}

if (argv._[0] === 'saludo') {
  saludar(argv);
}
