const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 8000;
//defaults to 8000 if not defined on the environmental variable on package.json

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
