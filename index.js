var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
let port = myArgs[0];
var http = require("http");

var csvWriter = require('csv-write-stream')


http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World\n');
}).listen(port);

const { Worker } = require('worker_threads');

for (let i = myArgs[1]; i < myArgs[2]; i++) {
  var worker = new Worker('./worker.js');
  worker.postMessage(myArgs[3] + i);
}
worker.on('message', message => console.log(message));
console.log('Server running at http://127.0.0.1:' + port);
