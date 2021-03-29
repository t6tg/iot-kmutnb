const client = require('./config')

client.on('message', (topic, payload) => {
    console.log(`Received message : [ Topic : ${topic} , Payload : ${payload}]`)
})
client.subscribe('kmutnb/temp')
client.publish('kmutnb/temp', '22.6')
