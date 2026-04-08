import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'publico')));

app.get('/bienvenida', (req, res) => {
  res.sendFile(path.join(__dirname,'/webcomponente.html'));
});

app.listen(1984, () => {
   console.log('Up and up');
}); 
