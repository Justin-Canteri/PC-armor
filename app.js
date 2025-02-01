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


// Ruta dinámica para obtener grafic según la socket_mother
app.get('/data/mother/grafic/:socketgraphic', (req, res) => {
  const { socketgraphic } = req.params;
  const validFamilies = ['PCIe_2_0_x16', 'PCIe_3_0_x16', 'PCIe_2_1_x16', 'PCIe_4_0_x16'];

  if (!validFamilies.includes(socketgraphic)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM graphic WHERE socket = ?', [socketgraphic], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});

// Ruta dinámica para obtener ram según la socket_mother
app.get('/data/mother/grafic/ram/:socketram', (req, res) => {
  const { socketram } = req.params;
  const validFamilies = ['DDR3', 'DDR4', 'DDR5'];

  if (!validFamilies.includes(socketram)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM ram WHERE type = ?', [socketram], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});


// Ruta dinámica para obtener storage según la socket_mother
app.get('/data/mother/grafic/ram/storage/:socketstorage', (req, res) => {
  const { socketstorage } = req.params;
  const validFamilies = ['SATA_3_Gb', 'SATA_6_Gb', 'NVMe'];

  if (!validFamilies.includes(socketstorage)) {
      return res.status(400).json({ error: 'Familia de procesador no válida' });
  }

  db.all('SELECT * FROM storage WHERE socket_storage = ?', [socketstorage], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }
      res.json(rows);
  });
});

// Ruta dinamica para obtener fuentes
app.get('/data/mother/grafic/ram/storage/font/:socketstorage', (req, res) => {
    const { socketstorage } = req.params;
    const validFamilies = ['850W', '760W', '750W', '700W', '650W', '600W', '550W', '500W', '1200W', '1000W'];
  
    if (!validFamilies.includes(socketstorage)) {
        return res.status(400).json({ error: 'Familia de procesador no válida' });
    }
  
    db.all('SELECT * FROM font WHERE volt = ?', [socketstorage], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al ejecutar la consulta' });
        }
        res.json(rows);
    });
  });