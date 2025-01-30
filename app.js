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
 

// Ruta dinámica para obtener motherboar según la socket_processor
app.get('/data/mother/:socketprocessor', (req, res) => {
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

//////////////////////////////FIX///////////////////////////////////////////////

// Ruta dinámica para obtener grafic según la socket_mother
app.get('/data/mother/grafic/:grafic', (req, res) => {
  const { socketprocessor } = req.params;
  const validFamilies = ['PCl 2.0 x16', 'PCl 3.0 x16', 'PCl 2.1 x16', 'PCl 4.0 x16'];

  if (!validFamilies.includes(socketprocessor)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM graphic WHERE socket = ?', [socketprocessor], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});


// Ruta dinámica para obtener ram según la socket_mother
app.get('/data/mother/grafic/ram/:ram', (req, res) => {
  const { socketprocessor } = req.params;
  const validFamilies = ['DDR3', 'DDR4', 'DDR5'];

  if (!validFamilies.includes(socketprocessor)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM ram WHERE type = ?', [socketprocessor], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});


// Ruta dinámica para obtener storage según la socket_mother
app.get('/data/mother/grafic/ram/storage/:storage', (req, res) => {
  const { socketprocessor } = req.params;
  const validFamilies = ['SATA 3 Gb/s', 'SATA 6 Gb/s', 'NVMe'];

  if (!validFamilies.includes(socketprocessor)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM storage WHERE socket_storage = ?', [socketprocessor], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});