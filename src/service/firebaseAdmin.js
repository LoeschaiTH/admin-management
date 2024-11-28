const admin = require('firebase-admin');
const serviceAccount = require('../serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://product-img-f4c8f.firebasestorage.app', 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
