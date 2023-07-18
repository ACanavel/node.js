//Importacion de los modulos 
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const serverKey = '12345';
//Creacion del servidor
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const queryParams = querystring.parse(query);


  if (req.method === 'GET' && pathname === '/') { 
    const formHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
      <h1>Black and White Spa</h1>
      <form action="/process-image" method="POST">
        <label for="image-url">Ingresa la URL de la imagen:</label><br>
        <input type="text" id="image-url" name="imageURL" required><br><br>
        <input type="submit" value="Procesar imagen">
      </form>
    </body>
    </html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);
  } else if (req.method === 'POST' && pathname === '/process-image') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { imageURL } = querystring.parse(body);
      
      try {
        const image = await jimp.read(imageURL);
        image
          .greyscale()
          .quality(60)
          .resize(350, jimp.AUTO)
          .write('newImage.jpg');
  
        fs.readFile('newImage.jpg', (err, data) => {
          if (err) {
            console.error(err);
            res.writeHead(500);
            res.end('Ocurrió un error al procesar la imagen.');
          } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
          }
        });
      } catch (error) {
        console.error(error);
        res.writeHead(500);
        res.end('Ocurrió un error al procesar la imagen.');
      }
    });
  } else if (req.method === 'GET' && pathname === '/style.css') {
    fs.readFile('style.css', (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end('Error al cargar el archivo de estilos.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        }
    });
  } else {
    res.writeHead(404);
    res.end('Página no encontrada');
  }
});

const port = 3000; 
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
