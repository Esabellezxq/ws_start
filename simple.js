const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
console.log("listening") ;
let userRoom = {};
// 校验用户
function parseUser(){}
//群主创建新房间并加入
function createRoom(){
    let loginRes = {
        type: 'loginRes',
        data: 'success'
    }
    return loginRes;
}
//加入已有房间
function enterRoom(){}
//退出房间
function exitRoom(){}
// 判断是否重复加入房间
function reEnter(){}
// var msg = "hello kiki!broadcast test";
// wss.broadcast = function broadcast(data){
//     wss.clients.forEach(function each(client){
//         if(client.readyState === WebSocket.OPEN){
//             client.send(data);
//         }
//     });
// };
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // console.log('received: %s', message);
        let loginMsg = JSON.parse(message);
        switch(loginMsg.type){
            case 'login':
                ws.send(JSON.stringify(createRoom()));
                break;
            case 'chat':
                wss.clients.forEach(function each(client){
                    if(client.readyState === WebSocket.OPEN){
                        client.send(loginMsg.data);
                    }
                });
                break;
        }
        // wss.broadcast(ws.user);
    });
    // ws.send(ws + req.connection);
});