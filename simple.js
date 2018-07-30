const WebSocket = require('ws');
let data = "hello kiki!broadcast test"
const wss = new WebSocket.Server({ port: 3000 });
console.log("listening") 
wss.on('connection', function connection(ws,req) {
    console.log("ws:"+ ws + req);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    
    ws.send(ws + req.connection);
});
wss.broadcast = function(data){
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(data);
        }
    });
};