const WebSocket = require('ws');
const UUID = require('uuid');
const wss = new WebSocket.Server({ port: 3000 });
console.log("listening") ;
var userRoom = {};
// 校验用户
// function parseUser(){}
//群主创建新房间并加入
function createRoom(wsCon,user){
    let id = UUID.v1();
    userRoom[id] = [];
    userRoom[id].push({
        con: wsCon,
        user: user
    });
    // console.log(userRoom);
    let data = {
        roomId: id,
    }
    var status = false;
    if(data){
        status = true;
    }
    return { 
        status: status,
        data: data
    };
}

//加入已有房间
function enterRoom(wsCon, room , user){
    userRoom[room] = [] ;
    userRoom[room].push({
        con: wsCon,
        user: user
    });
    return userRoom[room];
}
// //退出房间
// function exitRoom(){}
// // 判断是否重复加入房间
// function reEnter(){}
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // console.log('received: %s', message);
        let clientMsg = JSON.parse(message);
        let req = clientMsg.data;
        switch(clientMsg.type){
            case 'createReq':
                let createRes = {
                    type: 'createRes',
                    data: createRoom(ws,req.user)
                }
                ws.send(JSON.stringify(createRes));
                break;
            case 'enterReq':
                enterRoom(ws,req.room,req.user).forEach(function each(client) {
                    let enterRes = {
                        type: 'enterRes',
                        data: `${client.user} 进入房间`
                    }
                    if (client.con.readyState === WebSocket.OPEN) {
                        client.con.send(JSON.stringify(enterRes));
                        console.log(`${client.user} sent`);
                    }
                });
                
        };
             
            // case 'chat':
            //     wss.clients.forEach(function each(client){
            //         if(client.readyState === WebSocket.OPEN){
            //             client.send(loginMsg.data);
            //         }
            //     });
            //     break;
        // }
        // wss.broadcast(ws.user);
    });
    // ws.send(ws + req.connection);
});