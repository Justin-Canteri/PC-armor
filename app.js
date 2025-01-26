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

const db = new sqlite3.Database(path.join(__dirname, 'BD', 'PC-ARMOR.db'), (err) => {
  if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
  } else {
      console.log('Conectado a la base de datos PC-ARMOR.db');
  }
});


db.all('SELECT * FROM storage', (err, rows) => {
  if (err) {
    console.error('Error al ejecutar la consulta:', err.message);
  } else {
    console.log('Resultado:', rows); // Aquí obtienes un solo objeto con el resultado
  }
}); 