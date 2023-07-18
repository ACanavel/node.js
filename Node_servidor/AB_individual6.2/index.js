
const moment = require('moment');
require('moment/locale/es');
const fechaActual = moment();

fechaPosterior = fechaActual.add(10, 'days').format('dddd');

console.log(fechaPosterior);

