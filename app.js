const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir tu HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


//conectar con base de datos
const db = new sqlite3.Database(path.join(__dirname, 'BD', 'PC-ARMOR.db'), (err) => {
  if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
  } else {
      console.log('Conectado a la base de datos PC-ARMOR.db');
  }
});


  app.get('/data', (req, res) => {
    db.all('SELECT * FROM processor WHERE family = ?',['i3'], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Error al ejecutar la consulta' });
      } else {
        res.json(rows); // Devuelve los datos como JSON
      }
    });
  });
 