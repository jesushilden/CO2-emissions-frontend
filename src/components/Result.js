import React from 'react'
import { Line } from 'react-chartjs-2'

import '../styles/result.css'

const Result = ({ populations, emissions, selected, perCapita, rangeValue }) => {
    if (populations === null || emissions === null || selected === null || rangeValue === null) {
        return (
            <div>
                No data could be found for {selected.label}
            </div>
        )
    } else {
        const filteredPopulations = populations.filter(population => rangeValue.min <= population.year && rangeValue.max >= population.year)
        const filteredEmissions = emissions.filter(emission => rangeValue.min <= emission.year && rangeValue.max >= emission.year)

        const labels = filteredEmissions.map(emission => emission.year)
        const data = perCapita ?
            filteredEmissions.map((emission, i) => emission.value ? (emission.value / filteredPopulations[i].value) * 1000000 : null)
            :
            filteredEmissions.map(emission => emission.value)

        const chartData = {
            labels: labels,
            datasets: [{
                fill: false,
                backgroundColor: 'rgba(219, 43, 0, 0.5)',
                borderColor: 'rgba(219, 43, 0, 1)',
                pointBorderColor: 'rgba(219, 43, 0, 1)',
                pointBackgroundColor: 'rgb(255, 255, 255)',
                pointRadius: 1,
                pointHitRadius: 6,
                data: data,
            }]
        }

        const weightUnit = perCapita ? 'kg' : 'kt'

        const options = {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Emissions (' + weightUnit + ')'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }

        return (
            <div className='chartContainer'>
                <Line data={chartData} options={options} />
            </div>
        )
    }
}

export default Result