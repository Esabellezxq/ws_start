const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 4500
})
const userList = [];
function addUser(){
    userList.push(user);
}
function checkUserLog(){

}
function broadcast(){
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
    };
}
wss.on('connection',function connection(ws){
    ws.on('message',function incoming(message){
        console.log(message);
        let msg = JSON.parse(message);
        switch(msg.type){
            case "login":
                addUser(msg.data);
                let res = {
                    resType: "logState",
                    data: {
                        state: 1
                    }
                }
                ws.send(JSON.stringify(res));
                break;
            case "chatContent":
                checkUserLog(msg.data.user);
                broadcast(msg.data);
        }
    });
})