const https = require('https');
const fs = require('fs');

const cantidadPesos = process.argv[2];

if (!cantidadPesos) {
    console.log('Proporcione la cantidad de pesos que requiere convertir');
    process.exit(1);
}

const url = 'https://api.exchangerate-api.com/v4/latest/USD';

https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        try {
            const apiResponse = JSON.parse(data);
            const valorDolar = apiResponse.rates && apiResponse.rates.CLP;

            if (valorDolar) {
                const totalDolares = cantidadPesos / valorDolar;

                const fecha = new Date().toString();
                const contenidoArchivo = `A la fecha: ${fecha}\n` +
                    `Fue realizada cotización con los siguientes datos:\n` +
                    `Cantidad de pesos a convertir: ${cantidadPesos} pesos\n` +
                    `Convertido a "dólar" da un total de:\n$${totalDolares.toFixed(2)}`;

                const nombreArchivo = 'cotizacion.txt';
                fs.writeFile(nombreArchivo, contenidoArchivo, (error) => {
                    if (error) {
                        console.log('Error al escribir el archivo:', error);
                    } else {
                        console.log(`El archivo ${nombreArchivo} ha sido generado exitosamente.`);
                    }
                });
            } else {
                console.log('No se pudo obtener el valor del dólar de la respuesta de la API.');
            }
        } catch (error) {
            console.log('Error al procesar la respuesta de la API:', error);
        }
    });
}).on('error', (error) => {
    console.log('Error al realizar la solicitud a la API:', error);
});

