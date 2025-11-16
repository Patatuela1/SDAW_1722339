// Importar los módulos necesarios
const http = require('http');
const fs = require('fs');
const path = require('path');

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    console.log(`Solicitud recibida: ${req.url}`);

    // Determinar la ruta del archivo solicitado
    let filePath = '.' + req.url;

    if (filePath === './' || filePath === './index') {
        filePath = './index.html';
    }

    // Determinar tipo de contenido según la extensión del archivo
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    // Leer el archivo solicitado y enviarlo como respuesta
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Recurso no encontrado</h1>', 'utf-8');
            } else {
                // Otro tipo de error
                res.writeHead(500);
                res.end(`Error interno del servidor: ${error.code}`);
            }
        } else {
            // Respuesta exitosa
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});