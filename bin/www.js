const app = require('../app');
const http = require('http');
const config = require('../config');

const port = config.get('port');
const server = http.createServer(app);

server.listen(port, () => console.log(`🔥 Server is running on http://localhost:${port}`));