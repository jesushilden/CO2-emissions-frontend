import React from 'react'
import { Line } from 'react-chartjs-2'

const Result = ({ populations, emissions, selected, perCapita, rangeValue }) => {
    if (populations === null || emissions === null || selected === null || rangeValue === null) {
        return (
            <div>
                No data could be found for {selected.name}
            </div>
        )
    } else {
        const filteredPopulations = populations.filter(population => rangeValue.min <= population.year && rangeValue.max >= population.year)
        const filteredEmissions = emissions.filter(emission => rangeValue.min <= emission.year && rangeValue.max >= emission.year)
        
        const chartData = perCapita ? {
                labels: filteredEmissions.map(emission => emission.year),
                datasets: [{
                    label: selected.name + ' Emissions Per Capita',
                    fill: false,
                    backgroundColor: 'rgba(219, 43, 0, 0.5)',
                    borderColor: 'rgba(219, 43, 0, 1)',
                    pointBorderColor: 'rgba(219, 43, 0, 1)',
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointRadius: 1,
                    pointHitRadius: 6,
                    data: filteredEmissions.map((emission, i) => emission.value ? emission.value / filteredPopulations[i].value: null) ,
                }]
            } : {
                labels: filteredEmissions.map(emission => emission.year),
                datasets: [{
                    label: selected.name + ' Emissions',
                    fill: false,
                    backgroundColor: 'rgba(219, 43, 0, 0.5)',
                    borderColor: 'rgba(219, 43, 0, 1)',
                    pointBorderColor: 'rgba(219, 43, 0, 1)',
                    pointBackgroundColor: 'rgb(255, 255, 255)',
                    pointRadius: 1,
                    pointHitRadius: 6,
                    data: filteredEmissions.map(emission => emission.value),
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