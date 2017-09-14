'use strict';

let express = require('express'),
    app = express(),
    port = process.env.PORT = 3000;

// start server
app.listen(port);
console.info('Server listening on port', port, '...')