import React from 'react'
import { Line } from 'react-chartjs-2';

const Result = ({ populations, emissions, country }) => {
    if (populations === null || emissions === null || country === null) {
        return (
            <div>
                No data could be found for {country.name}
            </div>
        )
    } else {
        const chartData = {
            labels: emissions.map(emission => emission.year),
            datasets: [{
                label: country.name + ' Emissions',
                fill: false,
                backgroundColor: 'rgba(219, 43, 0, 0.5)',
                borderColor: 'rgba(219, 43, 0, 1)',
                pointBorderColor: 'rgba(219, 43, 0, 1)',
                pointBackgroundColor: 'rgb(255, 255, 255)',
                pointRadius: 1,
                pointHitRadius: 6,
                data: emissions.map(emission => emission.value),
            }]
        }
        return (
            <div>
                <Line data={chartData} />
            </div>
        )
    }
}

export default Result