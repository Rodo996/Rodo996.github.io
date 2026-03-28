import http from 'http';
import url from 'url';

const servidor = http.createServer(async (req, res) => {
  console.log("Alguien me mandó una solicitud");
  
  const urlProcesada = url.parse(req.url, true);
  const queryParams = urlProcesada.query;
  
 // console.log(queryParams.x);
 // console.log(queryParams.y);

  // Configurar headers para JSON
  res.setHeader('Content-Type', 'application/json');
/*
  if (queryParams.x == 1945) {
    // ✅ Respuesta JSON exitosa (status 200)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.statusCode = 200;
    res.end(JSON.stringify({
      mensaje: "Turip ip ip ip ip ip ip turip",
      x: queryParams.x,
      y: queryParams.y,
      exito: true
    }));
    
  } else {
    // ✅ Respuesta JSON para otro caso
    res.statusCode = 200;
    res.end(JSON.stringify({
      mensaje: "ño",
      exito: false
    }));
  }*/

  try {
    // 🔁 Consumir API externa
    queryParams.artista = 'C418'; // ✅ Usar queryParams
    const respuestaAPI = await fetch(
      `https://www.theaudiodb.com/api/v1/json/123/search.php?s=${encodeURIComponent(queryParams.artista)}`
    );

    if (!respuestaAPI.ok) {
      throw new Error(`Error en API externa: ${respuestaAPI.status}`);
    }

    const datos = await respuestaAPI.json();
    
    // 📤 Entregar resultados al cliente
    res.statusCode = 200;
    res.end(JSON.stringify({
      exito: true,
      artista: queryParams.artista,
      resultados: datos.artists,
    }));

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.statusCode = 500;
    res.end(JSON.stringify({
      exito: false,
      error: 'No se pudo obtener la información del artista',
      detalle: error.message
    }));
  }
});




const puerto = 1984;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});