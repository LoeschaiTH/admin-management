const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// ตั้งค่าโฟลเดอร์ routes
const routesDir = path.join(__dirname, 'routes');

// ตั้งค่า View Engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/plugins', express.static(path.join(__dirname, 'plugins')));
app.use('/configs', express.static(path.join(__dirname, 'configs')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/adminDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

fs.readdir(routesDir, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.js') && file !== 'index.js') {
      const route = require(path.join(routesDir, file)); 
      const routePath = '/' + path.basename(file, '.js'); 
      app.use("/", route); // ใช้ router
      console.log(`Route ${routePath} is loaded.`);
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
