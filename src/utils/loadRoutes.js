const fs = require('fs');
const path = require('path');

const loadRoutes = (app, routesDir) => {
  fs.readdir(routesDir, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.js') && file !== 'index.js') {
        const route = require(path.join(routesDir, file));
        app.use('/', route);
        console.log(`Route /${path.basename(file, '.js')} is loaded.`);
      }
    });
  });
};

module.exports = loadRoutes;
