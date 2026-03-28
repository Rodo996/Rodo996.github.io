import express from 'express';

// ¡Opinión sobre Express!: 
// Lo primero que se nota es que ya no necesitamos importar 'fs' ni 'http'.


const app = express();
const puerto = 1984;

// -------------------------------------------------------------------
// MAGIA DE EXPRESS: ARCHIVOS ESTÁTICOS
// -------------------------------------------------------------------
// "Si alguien pide una imagen, un CSS o un JS, búscalo en la carpeta actual 
// y envíalo automáticamente". Ya no tienes que programar una ruta para cada foto.
app.use(express.static(process.cwd()));


// -------------------------------------------------------------------
// RUTAS PARA PÁGINAS HTML
// -------------------------------------------------------------------
// Adiós a los 'if/else' infinitos. 
// Usar app.get() hace que el código sea semántico. Además, res.sendFile() 
app.get('/', (req, res) => {
    res.sendFile('bienvenida.html', { root: process.cwd() });
});

app.get('/mascotas', (req, res) => {
    res.sendFile('mascotas.html', { root: process.cwd() });
});

app.get('/adoptantes', (req, res) => {
    res.sendFile('adoptantes.html', { root: process.cwd() });
});

app.get('/equipo', (req, res) => {
    res.sendFile('equipo.html', { root: process.cwd() });
});

app.get('/opinion', (req, res) => {
    res.sendFile('opinion.html', { root: process.cwd() });
});

app.get('/perfil', (req, res) => {
    res.sendFile('perfil.html', { root: process.cwd() });
});


// -------------------------------------------------------------------
// RUTAS PARA APIs (JSON)
// -------------------------------------------------------------------
// Ya no tienes que usar 
// res.writeHead(200...) ni JSON.stringify(). Solo le pasas tu objeto 
// o arreglo a res.json() y Express hace toda la conversión por ti.

app.get('/api/mascotas', (req, res) => {
    const mascotas = [
        { "nombre": "Pikachu", "color": "Amarillo" },
        { "nombre": "Bulbasaur", "color": "Verde" }
    ];
    res.json(mascotas);
});

app.get('/api/adoptantes', (req, res) => {
    const adoptantes = [
        { "nombre": "Ash Ketchum", "edad": 10 },
        { "nombre": "Misty", "edad": 12 }
    ];
    res.json(adoptantes);
});


// -------------------------------------------------------------------
// MANEJO DE RUTA 404 (NO ENCONTRADO)
// -------------------------------------------------------------------
// En lugar de un 'else' al final de una cadena 
// gigante, Express usa un 'middleware' (app.use) al final de todo el archivo. 
// Si la petición del usuario no coincidió con ninguna de las rutas de arriba, 
// cae aquí por defecto.

app.use((req, res) => {
    res.status(404).send('La página esa que buscabas, pero así de que buscabas bien chido sabes qué pasó? la encontramos, nah no es cierto.');
});


// -------------------------------------------------------------------
// INICIAR EL SERVIDOR
// -------------------------------------------------------------------
app.listen(puerto, () => {
    console.log(`¡Servidor Express escuchando a todo vapor en el puerto ${puerto}! 🚀`);
});