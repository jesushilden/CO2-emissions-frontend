import React from 'react'
import { Line } from 'react-chartjs-2'

const Result = ({ populations, emissions, country, perCapita, togglePerCapita }) => {
    if (populations === null || emissions === null || country === null) {
        return (
            <div>
                No data could be found for {country.name}
            </div>
        )
    } else {
        const chartData = perCapita ? {
                labels: emissions.map(emission => emission.year),
                datasets: [{
                    label: country.name + ' Emissions Per Capita',
                    fill: false,
                    backgroundColor: 'rgba(219, 43, 0, 0.5)',
                    borderColor: 'rgba(219, 43, 0, 1)',
                    pointBorderColor: 'rgba(219, 43, 0, 1)',
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointRadius: 1,
                    pointHitRadius: 6,
                    data: emissions.map((emission, i) => emission.value ? emission.value / populations[i].value: null) ,
                }]
            } : {
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
                <div>
                    <input type='checkbox' name='perCapita' onChange={togglePerCapita} />
                    <label>Per Capita</label>
                </div>
                <div>

                </div>
                <Line data={chartData} />
            </div>
        )
    }
}

export default Result