const client = require('./config')
const db = require('./firebase')

let temp
client.on('message', (topic, payload, packet) => {
    const date = Date.now()
    if (topic === 'kmutnb-iot-2563-project/temp') {
        temp = parseFloat(payload)
        db.collection('temp').add({
            temperature: temp,
            timestamp: date,
        })
        console.log(`Temp = ${parseFloat(payload)}`)
    }
    if (topic === 'kmutnb-iot-2563-project/fanStatus') {
        if (temp > 35) {
            client.publish('kmutnb-iot-2563-project/fanSwitch', 'ON', () => {
                db.collection('fan').add({
                    system: 'ON',
                    timestamp: date,
                })
                console.log(`Publish successful 🎉`)
            })
        } else {
            client.publish('kmutnb-iot-2563-project/fanSwitch', 'OFF', () => {
                db.collection('fan').add({
                    system: 'OFF',
                    timestamp: date,
                })
                console.log(`Publish successful 🎉`)
            })
        }
        console.log(`Now Fan : ${payload}.....🛠`)
    }
})

client.subscribe('kmutnb-iot-2563-project/+')
