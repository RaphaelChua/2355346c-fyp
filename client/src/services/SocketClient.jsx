import openSocket from 'socket.io-client';
import baseURL from '../../secrets.json'

console.log(process.env.IP_ADDRESS+baseURL.basePORT)

const  socket = openSocket(process.env.IP_ADDRESS+":"+baseURL.basePORT);
function subscribeTransactionFeed(cb) {
   socket.on('FromTransaction', data => cb(null,data));
   socket.emit('subscribeTransactionFeed',5000);
}
function subscribeBlockFeed(cb){
    socket.on('FromBlock',data=>cb(null,data));
    socket.emit('subscribeBlockFeed',5000);
}
function subscribeBatchFeed(cb){
    socket.on('FromBatch',data=>cb(null,data));
    socket.emit('subscribeBatchFeed',5000);
}
function cancelSubscription(e){
    socket.off(e)
}
export {
    subscribeTransactionFeed,
    subscribeBlockFeed,
    subscribeBatchFeed,
    cancelSubscription
};
