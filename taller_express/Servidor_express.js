// servidor_express.js
import express from 'express';
import mysql from 'mysql2';

const PORT = 1984;
// Instanciamos la aplicación de Express
const app = express();
app.use(express.json());


app.listen(PORT, () => {
   console.log('Up and up');
});


const connection = mysql.createConnection({
 host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
 port: 20902,
 user: "avnadmin",
 password: "AVNS_GJwkU29Bq2KswwA_MOt",
 database: "defaultdb"

});
connection.connect(error => {
  if (error) throw error;
  console.log("Conectada");
});

app.post("/api/otro", (req, res) => {
   console.log("El cuerpo de la petición: ", req.body );
   res.sendStatus(200);
});

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;

connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
   //connection.end();
  });

app.get("/api/otre", (req, res) => {
   connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
    console.log(resultados);
   //connection.end();
  });
});