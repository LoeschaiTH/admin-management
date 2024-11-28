const path = require('path');
const express = require('express');

const setupStaticFolders = (app, baseDir) => {
  app.use(express.static(path.join(baseDir, 'public')));
  app.use('/plugins', express.static(path.join(baseDir, 'plugins')));
  app.use('/configs', express.static(path.join(baseDir, 'configs')));
  app.use('/utils', express.static(path.join(baseDir, 'utils')));
};

module.exports = setupStaticFolders;
