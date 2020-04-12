import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';


export default function Chart(props) {
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
    console.log(dailyData)
    const lineChart = dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map((obj) => {
            return obj.date;
          }),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#333ff',
              fill: true
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deceased',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true
            },
          ],
        }}
      />
    ) : null;
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}
