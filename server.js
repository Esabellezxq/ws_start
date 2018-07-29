const Websocket = require('ws');
const Koa = require('koa');
const app = new Koa();
let server = app.listen(3000);
const wss = new Websocket.Server({
    port: server
})
// function parseUser(obj){
//     if(!obj){
//         return;
//     }
//     console.log('try parse' + obj);
//     let s = '';
//     if(typeof obj === 'string'){
//         s = obj;
//     }else if(obj.headers){
//         let cookies = new Cookies(obj,null);
//         s = cookies.get('name');
//     }
//     if(s){
//         try{
//             let user = JSON.parse(Buffer.from(s,'base64').toString());
//             console.log(`User: ${user.name} ,ID: ${user.id}`)
//         }catch(e){

//         }
//     }
// }
// let messageIndex = 0;
// function createMessage(type,user,data){
//     messageIndex++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data
//     });
// }
// app.use( async (ctr,next) => {
//     ctr.state.user = parseUser(ctr.cookies.get('name')||'');
//     console.log(ctr.state.user);
//     await next();
// })
wss.on('connection',function connection(ws,req){
    console.log(ws);
    console.log(req.Cookie);
//    let user = parseUser(req);
//    console.log(user);
//    if(!user){
//        ws.close(4001,'invalid')
//    }
//    ws.user = user;
//    ws.wss = wss;
//    wss.broadcast = function(data){
//        wss.clients.forEach(function (client){
//            client.send(data);
//        })
//    };
   ws.on('message',function(message){
       console.log(message);
    //    if(message&&message.trim()){
    //        let msg = createMessage('chat',this.user,message.trimRight());
    //        this.wss.broadcast(msg);
    //    }
   })
});
