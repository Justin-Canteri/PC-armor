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

// Ruta dinámica para obtener procesadores según la familia
app.get('/data/:family', (req, res) => {
  const { family } = req.params;
  const validFamilies = ['i3', 'i5', 'i7', 'i9'];

  if (!validFamilies.includes(family)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM processor WHERE family = ?', [family], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});
 
//motherboard

app.get('/data/mother/LGA1156', (req, res) => {
  db.all('SELECT * FROM mother_board WHERE socket_procesor = ?',['LGA_1156'], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(rows); // Devuelve los datos como JSON
    }
  });
});


// Ruta dinámica para obtener procesadores según la familia
app.get('/data/:socketprocessor', (req, res) => {
  const { socketprocessor } = req.params;
  const validFamilies = ['LGA_1156', 'LGA_1155', 'LGA_1150', 'LGA_1151', 'LGA_1200', 'LGA_1700'];

  if (!validFamilies.includes(socketprocessor)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM mother_board WHERE socket_procesor = ?', [socketprocessor], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});