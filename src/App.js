import React, { Component } from 'react'

import populationService from './services/populations'
import emissionsService from './services/emissions'
import countriesService from './services/countries'

import Notification from './components/Notification'
import Header from './components/Header'
import Search from './components/Search'
import Result from './components/Result'
import ResultOptions from './components/ResultOptions'

import './styles/styles.css'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            selected: {
                value: '1W',
                label: 'World'
            },
            rangeValue: null,
            rangeLimits: null,
            populations: null,
            emissions: null,
            perCapita: false,
            notification: null
        }
    }

    async componentDidMount() {
        const countries = await countriesService.getAll()
        const populations = await populationService.getByISO(this.state.selected.value)
        const emissions = await emissionsService.getByISO(this.state.selected.value)
        const rangeValue = {
            min: Number(emissions[0].year),
            max: Number(emissions[emissions.length - 1].year)
        }
        const rangeLimits = rangeValue
        this.setState({ countries, populations, emissions, rangeValue, rangeLimits })
        console.log(this.state)
    }

    handleSelectedChange = async (selected) => {
        const populations = await populationService.getByISO(selected.value)
        const emissions = await emissionsService.getByISO(selected.value)

        if (populations !== null && emissions !== null) {
            this.setState({
                selected,
                populations,
                emissions
            })
            console.log(this.state)
        } else {
            this.notify('No data was found for ' + selected.label, 'danger')
        }
    }

    handleRangeChange = (value) => {
        this.setState({
            rangeValue: value
        })
    }

    handlePerCapitaChange = (event) => {
        this.setState({
            perCapita: event.target.checked
        })
    }

    notify = (message, messageClass) => {
        this.setState({
            notification: {
                message,
                messageClass
            }
        })
        setTimeout(() => {
            this.setState({
                notification: null
            })
        }, 3000)
    }

    render() {

        return (
            <div className='container'>
                <Notification notification={this.state.notification} />
                <Header title={'CO2 Emissions'} subtitle={'Search by area and compare by capita'} />
                <Search countries={this.state.countries} setSelected={this.handleSelectedChange} selected={this.state.selected} />
                <ResultOptions togglePerCapita={this.handlePerCapitaChange} rangeValue={this.state.rangeValue} setRange={this.handleRangeChange} rangeLimits={this.state.rangeLimits} />
                <Result populations={this.state.populations} emissions={this.state.emissions} selected={this.state.selected} perCapita={this.state.perCapita} rangeValue={this.state.rangeValue} />
            </div>
        )
    }
}

export default App
