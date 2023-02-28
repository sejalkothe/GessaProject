const express = require('express');
const path = require('path');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const port = process.env.PORT || 80;

const mf = process.env.MF_NAME || 'react-host';

const app = express();
app.use(compression());

var destinationDir = '';

if (mf == 'react-host') {
  destinationDir = path.join(__dirname, 'react-host/');
} else if (mf == 'react-remote') {
  destinationDir = path.join(__dirname, 'react-remote/');
}

app.use(
  '/',
  expressStaticGzip(destinationDir, {
    enableBrotli: true,
    customCompressions: [
      {
        encodingName: 'gzip',
        fileExtension: 'gz',
      },
    ],
    orderPreference: ['br'],
  })
);

app.listen(port);

app.on('listening', function () {
  console.log(
    'Express server started on port %s at %s',
    server.address().port,
    server.address().address
  );
});
