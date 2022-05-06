const http = require("http");
const app = require("./server");
const config = require("./server/config");
const database = require('./server/database');

const { port } = config;

database.connect(config.database);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
