//Escribe un comentario explicando para qué sirve http
// http es un módulo de Node.js que permite crear servidores web y manejar solicitudes HTTP. Es fundamental para construir aplicaciones web, ya que proporciona las herramientas necesarias para recibir y responder a las peticiones de los clientes, como navegadores web, y servir contenido dinámico o estático.
import http from 'http';
//Escribe un comentario explicando para qué sirve fs
import fs from 'fs';
// fs es un módulo de Node.js que proporciona una API para interactuar con el sistema de archivos. Permite leer, escribir, actualizar y eliminar archivos y directorios en el sistema operativo, lo que es esencial para manejar contenido dinámico en un servidor web.

    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
       
      
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //Escribe qué significa el 500 
          res.writeHead(500, { 'Content-Type': 'text/plain' }); //500 Internal Server Error indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
          res.end('Oh no!!!!');
          return;
        }
        //Escribe qué significa el 200
        res.writeHead(200, { 'Content-Type': 'text/html' }); // 200 ok indicates that the request has succeeded.
        res.end(data);
    });
    }


    //Esta función deberá enviar un json con los datos de las mascotas
    function getMascotas(req, res) {
        //Esto representa un objeto JSON de una mascota
        //Agrega otra mascota
        const mascotas = [
    { "nombre": "Pikachu", "color": "Amarillo" },
    { "nombre": "Bulbasaur", "color": "Verde" }
]; 
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      res.end(JSON.stringify(mascotas));
      // la funcion stringify convierte un objeto JavaScript en una cadena JSON. La usamos para enviar datos estructurados a través de la red, ya que JSON es un formato de texto que puede ser fácilmente interpretado por diferentes lenguajes de programación.
    }

  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

     
      function mostrarAdoptantes(req, res) {
        //Construye una página básica adpotantes.html
        fs.readFile('adoptantes.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Oh no!!!! Error interno del servidor.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }
      function mostrarOpinion(req, res) {
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Oh no!!!! Error interno del servidor.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }
    //Esta función deberá enviar un json con los datos de las adoptantes
    function getAdoptantes(req, res) {
      adoptantes=[
    { "nombre": "Ash Ketchum", "edad": 10 },
    { "nombre": "Misty", "edad": 12 }
      ]
    //Tienes que corregir varias cosas en esta sección
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(adoptantes));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //Cambia el mensaje por algo más divertido
      res.end('la Página  esa que buscabas, pero asi de que buscabas bien chido sabes que paso? la encontramos, nah no cierto.');
    }

    //incluye el enlace a la documentación de createServer
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/mascotas') {
        getMascotas(req, res);
      } else if (url === '/api/adoptantes') {
        getAdoptantes(req, res);
      } 
      else if (url === '/mascotas') {
        mostrarMascotas(req, res);
      } 
      else if (url === '/adoptantes') {
        mostrarAdoptantes(req, res);
      } else if (url === '/equipo') {
        mostrarEquipo(req, res);
      } else if (url === '/opinion') {
        mostrarOpinion(req, res);
      }
      else {
    // Aquí debería ir tu manejarRuta404(req, res) si ninguna ruta coincide
    manejarRuta404(req, res);
    }
      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

      /* La imagen no se puede ver en el archivo HTML 
      Esto sucede porque el servidor no tiene una ruta /foto-equipo.jpg, asi que no sabe cómo entregar ese archivo y terminará cayendo en tu función manejarRuta404.
      por estar hardcodeado no se puede.
      */ 

      //Agrega una ruta /opinion
      // Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      //¿Qué es el freedombox?
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html