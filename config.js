const mqtt = require('mqtt')
require('dotenv').config()

var options = {
    host: process.env.MQTT_HOST,
    port: 8883,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASS,
}

const client = mqtt.connect(options)

client.on('connect', () => {
    console.log('Connected...!')
})

client.on('error', (error) => {
    console.log(`Error : ${error}`)
})

module.exports = client
