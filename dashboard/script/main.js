const db = firebase.firestore()
db.collection('temp')
    .get()
    .then((r) => {
        r.forEach((d) => {
            console.log(d.data())
        })
    })
