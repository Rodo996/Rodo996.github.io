const express = require('express');
const path = require('path');
const app = express(); // express es un framework de Node.js que facilita la creación de servidores web y APIs. 
// Proporciona una estructura y herramientas para manejar rutas, solicitudes HTTP, middleware, y más, lo que simplifica el desarrollo de aplicaciones web y servicios RESTful.
const PORT = 3000;

// Configurar Express para servir archivos estáticos (tu HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Crear nuestro propio endpoint que el cliente consumirá
app.get('/api/artista/:nombre', async (req, res) => {
    const artista = req.params.nombre;
    
    try {
        // 1. El servidor consume la API externa
        const respuesta = await fetch(`https://www.theaudiodb.com/api/v1/json/123/search.php?s=${artista}`);
        const datos = await respuesta.json();

        // 2. Procesamiento: Seleccionamos SOLO los datos que el cliente necesita
        if (datos.artists && datos.artists.length > 0) {
            const infoArtista = datos.artists[0];
            
            const datosProcesados = {
                biografia: infoArtista.strBiographyEN,
                imagen: infoArtista.strArtistThumb
            };
            
            // 3. Entregar los datos procesados al cliente
            res.json(datosProcesados);
        } else {
            res.status(404).json({ error: 'Artista no encontrado' });
        }
    } catch (error) {
        console.error('Error al consumir la API:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});