const http = require('http');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

const PORT = 8080;
const registeredUsers = [];

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    const usersWithNumbers = registeredUsers.map((user, index) => ({ ...user, userNumber: index + 1 }));
    res.end(JSON.stringify(usersWithNumbers));

    console.log(chalk.white.bgBlue('Lista de usuarios registrados:'));
    console.log(chalk.white.bgBlue(JSON.stringify(usersWithNumbers)));
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Ruta no encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

async function registerUser() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const userData = response.data.results[0];
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const newUser = {
      id: uuidv4(),
      firstName: userData.name.first,
      lastName: userData.name.last,
      timestamp: timestamp
    };
    registeredUsers.push(newUser);
    console.log(chalk.white.bgBlue(` ${registeredUsers.length} - Nombre: ${newUser.firstName} - Apellido: ${newUser.lastName}- ID: ${newUser.id}- TimeStamp: ${newUser.timestamp}`));
  } catch (error) {
    console.error('Error al registrar nuevo usuario:', error.message);
  }
}

//simulamos el registro de usuario cada 5 segundos 
setInterval(registerUser, 5000);
