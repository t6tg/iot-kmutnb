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
        temp: '',
        fanStatus: '',
    },
    mounted() {
        db
            .collection('temp')
            .get()
            .then((r) => {
                r.forEach((d) => {
                    this.temp = `อุณหภูมิ (ล่าสุด) : ${d.data().temperature}`
                })
            }),
            db
                .collection('fan')
                .get()
                .then((r) => {
                    r.forEach((d) => {
                        this.fanStatus = `สถาณะพัดลม : ${d.data().system}`
                    })
                })
    },
    updated: function () {
        db
            .collection('temp')
            .get()
            .then((r) => {
                r.forEach((d) => {
                    this.temp = `อุณหภูมิ (ล่าสุด) : ${d.data().temperature}`
                })
            }),
            db
                .collection('fan')
                .get()
                .then((r) => {
                    r.forEach((d) => {
                        this.fanStatus = `สถาณะพัดลม : ${d.data().system}`
                    })
                })
    },
})
