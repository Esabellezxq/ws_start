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
    if(id){
        userRoom[id] = [];
        userRoom[id].push({
            con: wsCon,
            user: user
        });
    }
    // console.log(userRoom);
    var status = false;
    if(id){
        status = true;
    }
    return { 
        status: status,
        roomId: id
    };
}

//加入已有房间
function enterRoom(wsCon, room , user){
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
                enterRoom(ws,req.room,req.user);
                userRoom[req.room].forEach(function each(client) {
                    let enterRes = {
                        type: 'enterRes',
                        data: `${req.user} 进入房间`
                    }
                    if (client.con.readyState === WebSocket.OPEN) {
                        client.con.send(JSON.stringify(enterRes));
                        console.log(`${client.user} sent`);
                    }
                });
                break;
            case 'chatMsg':
                if(req.room){
                    userRoom[req.room].forEach(function each(client){
                        if(client.con.readyState === WebSocket.OPEN){
                            client.con.send(message);
                        }
                    });
                }  
        };
    });
});