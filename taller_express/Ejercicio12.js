import express from 'express';

const app = express();
const puerto = 1984;

// Simulamos nuestra base de datos de Buscando Huellas
const perritosPerdidos = [
    { id: 1, nombre: "Milaneso", raza: "Pug", zona: "Centro" },
    { id: 2, nombre: "Cheems", raza: "Shiba Inu", zona: "Zapopan" },
    { id: 3, nombre: "Firulais", raza: "Mestizo", zona: "Tlaquepaque" },
    { id: 4, nombre: "Canela", raza: "Pug", zona: "Tonalá" }
];

// -------------------------------------------------------------------
// RUTA 1: Buscar un perrito específico por su ID
// El símbolo ":" le dice a Express que "id" es una variable, no una palabra fija.
// -------------------------------------------------------------------
app.get('/api/perritos/:id', (req, res) => {
    // 1. Extraemos el parámetro de la URL. 
    // Todo lo que viene de la URL es texto (String), por eso usamos parseInt()
    const idPerrito = parseInt(req.params.id);

    // 2. Buscamos en nuestro arreglo usando el método .find() de JavaScript
    const perritoEncontrado = perritosPerdidos.find(p => p.id === idPerrito);

    // 3. Evaluamos el resultado
    if (perritoEncontrado) {
        // Si lo encuentra, enviamos un 200 y los datos
        res.status(200).json(perritoEncontrado);
    } else {
        // Si no lo encuentra, enviamos un 404
        res.status(404).json({ 
            error: "Perrito no encontrado", 
            mensaje: `No tenemos ningún reporte con el ID ${idPerrito}` 
        });
    }
});

// Arrancamos el servidor
app.listen(puerto, () => {
    console.log(`Servidor de Buscando Huellas activo en el puerto ${puerto} 🐕`);
});