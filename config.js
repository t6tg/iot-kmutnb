const mqtt = require('mqtt')
require('dotenv').config()

const options = {
    host: process.env.MQTT_HOST,
    port: 1883,
    protocol: 'tcp',
}
// retain: true,
const client = mqtt.connect(options)

client.on('connect', () => {
    console.log('Connected...!')
})

client.on('error', (error) => {
    console.log(`Error : ${error}`)
})

module.exports = client
