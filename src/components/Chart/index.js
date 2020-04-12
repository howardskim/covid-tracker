import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';


export default function Chart(props) {
    console.log(props)
    const [dailyData, setDailyData] = useState([]);
    const url = "https://covid19.mathdro.id/api";

    useEffect(() => {
        async function fetchDailyData(){
            const response = await axios.get(`${url}/daily`);
            let modified = response.data.map((obj) => {
                return {
                    confirmed: obj.confirmed.total,
                    deaths: obj.deaths.total,
                    date: obj.reportDate
                }
            })
            setDailyData(modified);
        };
        fetchDailyData();
    }, []);
    const lineChart = dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map((obj) => {
            return obj.date;
          }),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "rgba(0, 0, 255, 0.5)",
              //   backgroundColor: 'rgba(0, 0, 255, 0.5)',
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deceased",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
    const barChart = (
        props.data.confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 225, 0.5)',
                            'rgba(0, 225, 0, 0.5)',
                            'rgba(225, 0, 225, 0.5)'
                        ],
                        data: [
                            props.data.confirmed.value,
                            props.data.recovered.value,
                            props.data.deaths.value
                        ]
                    }],
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${props.country}`}
                }}
            />
        ) : ''
    )
    return (
        <div className={styles.container}>
            {props.country ? barChart : lineChart}
        </div>
    )
}
