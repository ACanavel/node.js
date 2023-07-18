const nodemailer = require('nodemailer');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

async function handleRequest(req, res) {
  if (req.method === 'POST') {
    const { correos, asunto, mensaje } = req.body;

      try {
        const response = await axios.get('http://mindicador.cl/api');
        const apiData = response.data;

        const { dolar, euro, uf, utm } = apiData;

        const contentHTML = `
          <h1 style="text-align: center;">Informacion Cambiaria</h1>
          <p style="text-align: center;">¡Hola! Los indicadores económicos para hoy son:</p>
          <ul style="text-align: center; list-style-type: none; padding: 0;">
            <li>- El valor del dólar hoy es: ${dolar.valor}&#x1F4B5;</li>
            <li>- El valor del Euro hoy es: ${euro.valor}</li>
            <li>- El valor de la UF hoy es: ${uf.valor}</li>
            <li>- El valor de la UTM hoy es: ${utm.valor}</li>
          </ul>
        `;

        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: 'cursojs2023sur@outlook.es',
            pass: 'cursochile2023%',
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const info = await transporter.sendMail({
          from: 'cursojs2023sur@outlook.es',
          to: correos,
          subject: 'Cambio del Día',
          html: contentHTML,
        });

        console.log('Mensaje Enviados', info.messageId);

        const fileName = `${uuidv4()}.txt`;
        const filePath = path.join(__dirname, 'correos', fileName);
        fs.writeFileSync(filePath, contentHTML);

        res.statusCode = 302;
        res.setHeader('Location', '../public/success.html');
        res.end();
      } catch (error) {
        console.log('Error al realizar la solicitud a la API:', error);
        res.statusCode = 302;
        res.setHeader('Location', '../public/error.html');
        res.end();
      }
    
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}

module.exports = { handleRequest };
