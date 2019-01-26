import React from 'react'
import { Line } from 'react-chartjs-2'
import { RingLoader, ClipLoader } from 'react-spinners'


import '../styles/result.css'

const Result = ({ populations, emissions, selected, perCapita, rangeValue, loading }) => {
    if (populations === null || emissions === null || selected === null || rangeValue === null) {
        return (
            <div className='result'>
                <RingLoader
                    sizeUnit={'px'}
                    size={50}
                    color={'#db2b00'}
                />
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

        const weightUnit = perCapita ? 'kg' : 'kt'

        const chartData = {
            labels: labels,
            datasets: [{
                label: weightUnit,
                fill: false,
                backgroundColor: 'rgba(219, 43, 0, 0.5)',
                borderColor: 'rgba(219, 43, 0, 1)',
                pointBorderColor: 'rgba(219, 43, 0, 1)',
                pointBackgroundColor: 'rgb(255, 255, 255)',
                pointRadius: 2,
                pointHitRadius: 6,
                data: data,
            }]
        }

        const options = {
            legend: {
                display: false
            },
            tooltips: {
                displayColors: false
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
                <ClipLoader
                    sizeUnit={'px'}
                    size={30}
                    color={'#db2b00'}
                    loading={loading}
                />
                <Line data={chartData} options={options} />
            </div>
        )
    }
}

export default Result