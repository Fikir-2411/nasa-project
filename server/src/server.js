const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
//defaults to 8000 if not defined on the environmental variable on package.json

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} ...`);
});
}

startServer();


