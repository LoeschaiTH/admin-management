const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./configs/connectDB');
require('dotenv').config();

const mongoDbSet = process.env.MONGODB_URI;
const routesDir = path.join(__dirname, 'routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/plugins', express.static(path.join(__dirname, 'plugins')));
app.use('/configs', express.static(path.join(__dirname, 'configs')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));

connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
