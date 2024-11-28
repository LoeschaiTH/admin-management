const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./src/configs/connectDB');
const loadRoutes = require('./src/utils/loadRoutes');
const setupStaticFolders = require('./src/middleware/staticFolder');
const liveReload = require('./src/middleware/liveReload');
const logger = require('./src/middleware/logger');

connectDB();


// Setup View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Setup Static Folders
setupStaticFolders(app, path.join(__dirname, 'src'));


// Load Routes
loadRoutes(app, path.join(__dirname, 'src', 'routes'));


//ตัว log request 
logger(app);

// Live Reload โหลดหน้าใหม่เมื่อมีการเปลี่ยนแปลง
liveReload(app, path.join(__dirname, 'src', 'views'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
