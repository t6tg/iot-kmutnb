const client = require('./config')
const db = require('./firebase')

let temp
client.on('message', (topic, payload, packet) => {
    const date = Date.now()
    if (topic === 'kmutnb-iot-2563-project/temp') {
        temp = parseFloat(payload)
        db.collection('temp')
            .doc(date.toString())
            .set({
                temperature: temp,
                timestamp: date,
            })
            .catch((err) => {
                console.error(err)
            })
        console.log(`Temp = ${parseFloat(payload)}`)
    }
    if (topic === 'kmutnb-iot-2563-project/fanStatus') {
        if (temp > 38) {
            if (payload.toString() === 'OFF') {
                client.publish(
                    'kmutnb-iot-2563-project/fanSwitch',
                    'ON',
                    () => {
                        db.collection('fan')
                            .add({
                                system: 'ON',
                                timestamp: date,
                            })
                            .catch((err) => {
                                console.error(err)
                            })
                        console.log(`Turn ON 🟢`)
                    }
                )
            }
        } else {
            if (payload.toString() === 'ON') {
                client.publish(
                    'kmutnb-iot-2563-project/fanSwitch',
                    'OFF',
                    () => {
                        db.collection('fan').doc(date.toString()).set({
                            system: 'OFF',
                            timestamp: date,
                        })
                        console.log(`Turn OFF 🔴`)
                    }
                )
            }
        }
        console.log(`Now Fan : ${payload}.....🛠`)
    }
})

client.subscribe('kmutnb-iot-2563-project/+')
