const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const liveReload = (app, viewsDir) => {
    const liveReloadServer = livereload.createServer({ 
        exts: ['html', 'css', 'js', 'ejs'] 
      });
  liveReloadServer.watch(viewsDir);

  app.use(connectLivereload());
};

module.exports = liveReload;
