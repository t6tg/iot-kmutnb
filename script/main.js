var app = firebase.initializeApp({
    apiKey: 'AIzaSyApRU3e_kLBwl1Rib4B9DIVdHjjcXX48iA',
    authDomain: 'iot-kmutnb-2020.firebaseapp.com',
    projectId: 'iot-kmutnb-2020',
    storageBucket: 'iot-kmutnb-2020.appspot.com',
    messagingSenderId: '945437931517',
    appId: '1:945437931517:web:7272957d6f364df69e8b94',
    measurementId: 'G-MC011V3DL9',
})
const db = firebase.firestore()

new Vue({
    el: '#root',
    data: {
        temps: [],
        fanStatusS: [],
        temp: '',
        fanStatus: '',
        chartOptions: {
            title: {
                text: 'Temperature Data',
            },
            axisX: {
                title: 'Time',
            },
            axisY: {
                title: 'Temperature',
                suffix: 'C.',
                includeZero: true,
            },
            data: [
                {
                    type: 'line',
                    name: 'Temperature Date',
                    connectNullData: true,
                    xValueType: 'dateTime',
                    xValueFormatString: 'DD MMM hh:mm:ss TT',
                    yValueFormatString: '#,##0.##"C."',
                    dataPoints: null,
                    color: 'hotpink',
                },
            ],
        },
        chart: null,
    },
    mounted: function () {
        db
            .collection('temp')
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    this.temps.push({
                        x: d.data().timestamp,
                        y: d.data().temperature,
                    })
                    this.temp = `${this.temps[this.temps.length - 1].y}`
                })
            }),
            db
                .collection('fan')
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get()
                .then((r) => {
                    r.forEach((d) => {
                        this.fanStatusS.push({
                            x: d.data().timestamp,
                            y: d.data().system,
                        })
                        this.fanStatus = `${
                            this.fanStatusS[this.fanStatusS.length - 1].y
                        }`
                    })
                })
    },
    updated: function () {
        this.chart = new CanvasJS.Chart('chartContainer', this.chartOptions)
        this.chart.render()
        this.chartOptions.data[0].dataPoints = this.temps
        setInterval(() => {
            db
                .collection('temp')
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get()
                .then((r) => {
                    r.forEach((d) => {
                        this.temps.push({
                            x: d.data().timestamp,
                            y: d.data().temperature,
                        })
                        this.temp = `${this.temps[this.temps.length - 1].y}`
                    })
                }),
                db
                    .collection('fan')
                    .orderBy('timestamp', 'desc')
                    .limit(1)
                    .get()
                    .then((r) => {
                        r.forEach((d) => {
                            this.fanStatusS.push({
                                x: d.data().timestamp,
                                y: d.data().system,
                            })
                            this.fanStatus = `${
                                this.fanStatusS[this.fanStatusS.length - 1].y
                            }`
                        })
                    })
        }, 12000)
    },
})
