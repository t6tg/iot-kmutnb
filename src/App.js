import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react'
import { db } from './firebase.js'
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip,
} from 'recharts'

const TempChart = ({ data }) => {
    return (
        <LineChart
            width={window.innerWidth - 100}
            height={400}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                isAnimationActive={false}
            />
        </LineChart>
    )
}

function App() {
    const [temp, setTemp] = useState('loading....')
    const [fan, setFan] = useState('loading....')
    const [data, setData] = useState([])

    const convert = (unixTime) => {
        var unixtimestamp = unixTime
        var months_arr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        var date = new Date(unixtimestamp)
        var year = date.getFullYear()
        var month = months_arr[date.getMonth()]
        var day = date.getDate()
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        var convdataTime =
            month +
            '-' +
            day +
            '-' +
            year +
            ' ' +
            hours +
            ':' +
            minutes.substr(-2) +
            ':' +
            seconds.substr(-2)
        return convdataTime
    }

    const getTempData = () => {
        db.collection('temp')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    data.shift()
                    data.push({
                        timestamp: convert(d.data().timestamp),
                        temperature: d.data().temperature,
                    })
                    setData(data)
                    setTemp(d.data().temperature)
                })
            })

        db.collection('fan')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    setFan(d.data().system)
                })
            })
    }

    useEffect(() => {
        db.collection('temp')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    setTemp(d.data().temperature)
                })
            })
    }, [])

    useEffect(() => {
        db.collection('temp')
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    data.push({
                        timestamp: convert(d.data().timestamp),
                        temperature: d.data().temperature,
                    })
                    setData(data)
                    setTemp(d.data().temperature)
                })
            })
        setData(data)
    }, [])

    useEffect(() => {
        db.collection('fan')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            .then((r) => {
                r.forEach((d) => {
                    setFan(d.data().system)
                })
            })
    }, [])

    useEffect(() => {
        const intervalId = setInterval(getTempData, 10000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div className="mx-auto">
            <div className="m-10">
                <center>
                    <div className="bg-pink-800 text-2xl text-center rounded p-4 my-4 m-auto">
                        <h1 className="text-white">
                            ระบบรายงานอุณหภูมิภายในห้องและระบายความร้อน{' '}
                        </h1>
                    </div>
                </center>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-md bg-green-600 rounded p-3">
                        <h3
                            id="fanStatus"
                            className="text-white text-xl my-auto"
                        >
                            สถาณะพัดลม : {fan}
                        </h3>
                    </div>
                    <div className="col-md bg-blue-600 rounded p-3">
                        <h3 id="temp" className="text-white text-xl my-auto">
                            อุณหภูมิ (ล่าสุด) : {temp}
                        </h3>
                    </div>
                </div>
            </div>
            <center>
                {data.length >= 10 && <TempChart data={data.slice()} />}
            </center>
        </div>
    )
}

export default App
