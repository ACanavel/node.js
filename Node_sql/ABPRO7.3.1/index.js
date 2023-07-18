const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

// configuramos la conexion a la base de datos, usando variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// conectamos con base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// funcion para manejar las solicitudes del servidor
const handleRequest = async (req, res) => {
  const { method, url, headers } = req;

  if (method === 'POST' && url === '/usuario') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body);

        // Insertar el nuevo usuario en la base de datos
        const insertQuery = 'INSERT INTO usuario (email, password) VALUES (?, ?)';
        await connection.promise().query(insertQuery, [email, password]);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mensaje: 'Usuario creado exitosamente' }));
      } catch (error) {
        console.error('Error al crear el usuario: ', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mensaje: 'Error al crear el usuario' }));
      }
    });
  } else if (method === 'POST' && url === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body);

        // Verificar que el correo y la contraseña estén presentes
        if (!email || !password) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ mensaje: 'Se requiere el correo electrónico y la contraseña' }));
          return;
        }

        // Verificar el correo y la contraseña en la base de datos
        const selectQuery = 'SELECT * FROM usuario WHERE email = ? AND password = ?';
        const [result] = await connection.promise().query(selectQuery, [email, password]);

        if (result.length > 0) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ mensaje: 'Inicio de sesión exitoso' }));
        } else {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ mensaje: 'Correo o contraseña incorrectos' }));
        }
      } catch (error) {
        console.error('Error al realizar el inicio desesión: ', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mensaje: 'Error al realizar el inicio de sesión' }));
      }
    });
  } else if (method === 'GET' && url === '/usuarios') {
    try {
      // obtenemos todos los usuarios de la base de datos
      const selectQuery = 'SELECT * FROM usuario';
      const [result] = await connection.promise().query(selectQuery);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error('Error al obtener los usuarios: ', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ mensaje: 'Error al obtener los usuarios' }));
    }
  } else {
    // si la ruta no es encontrada se intenta servir al archivo estatico
    let filePath = path.join(__dirname, 'public', url);
    if (url === '/') {
      filePath = path.join(__dirname, 'public', 'index.html');
    }
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Archivo no encontrado');
        } else {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Error interno del servidor');
        }
      } else {
        // se determina el tipo de contenido según la extensión del archivo
        const extension = path.extname(filePath);
        let contentType = 'text/plain';

        if (extension === '.html') {
          contentType = 'text/html';
        } else if (extension === '.css') {
          contentType = 'text/css';
        } else if (extension === '.js') {
          contentType = 'text/javascript';
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
      }
    });
  }
};

// Iniciar el servidor en el puerto 3000
http.createServer(handleRequest).listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
