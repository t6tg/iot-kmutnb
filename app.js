const client = require('./config')
const db = require('./firebase')
const TOKEN = 'vugtIDq7Q1rUj78UM3Au7bkjk9E0SdvHwVgQRlAXHnL'
const lineNotify = require('line-notify-nodejs')(TOKEN)

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
        if (temp > 35) {
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
                        lineNotify
                            .notify({
                                message: `\n🔥 Temp = ${temp} \n🟢 Fan Status = ON`,
                            })
                            .then(() => {
                                console.log('Send Complete')
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
                        lineNotify
                            .notify({
                                message: `\n🥶 Temp = ${temp} \n🔴 Fan Status = OFF`,
                            })
                            .then(() => {
                                console.log('Send Complete')
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
