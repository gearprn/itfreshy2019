const functions = require('firebase-functions');
require('dotenv').load();

exports.api = functions.https.onRequest(require('./src/routes/index'));