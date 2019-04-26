const http = require('http');
const app = require('./app');
const dbConfig = require('./api/db-config');
const mongoose = require('mongoose');
const port = 3300;

mongoose.connect(dbConfig.url,  { useNewUrlParser: true })
.then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err);
    process.exit();
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server is listening on port " + port);
});