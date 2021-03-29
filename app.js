const client = require('./config')

client.on('message', (topic, payload) => {
    if (topic === 'kmutnb-iot-2563-project/temp') {
        console.log(
            `Received message : [ Topic : ${topic} , Payload : ${payload}]`
        )
    }
})

client.subscribe('kmutnb-iot-2563-project/temp')
client.subscribe('kmutnb-iot-2563-project/temp2')
