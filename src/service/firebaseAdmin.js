const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.ADMIN_FIREBASE_CREDENTIALS_JSON)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://product-img-f4c8f.firebasestorage.app', 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
