import React, { Component } from 'react'

import populationService from './services/populations'
import emissionsService from './services/emissions'
import countriesService from './services/countries'

import Title from './components/Title'
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
                id: '1W',
                name: 'World'
            },
            rangeValue: null,
            rangeLimits: null,
            populations: null,
            emissions: null,
            perCapita: false
        }
    }

    async componentDidMount() {
        const countries = await countriesService.getAll()
        const populations = await populationService.getByISO(this.state.selected.id)
        const emissions = await emissionsService.getByISO(this.state.selected.id)
        const rangeValue = {
            min: Number(emissions[0].year),
            max: Number(emissions[emissions.length - 1].year)
        }
        const rangeLimits = rangeValue
        this.setState({ countries, populations, emissions, rangeValue, rangeLimits })
        console.log(this.state)
    }

    handleSelectedChange = async (event) => {
        const id = event.target.value
        const selected = this.state.countries.find(c => c.id === id)
        const populations = await populationService.getByISO(id)
        const emissions = await emissionsService.getByISO(id)
        this.setState({
            selected,
            populations,
            emissions
        })
        console.log(this.state)
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

    render() {

        return (
            <div className='container'>
                <Title title={'CO2 Emissions'} />
                <Search countries={this.state.countries} setSelected={this.handleSelectedChange} selected={this.state.selected.id} />
                <ResultOptions togglePerCapita={this.handlePerCapitaChange} rangeValue={this.state.rangeValue} setRange={this.handleRangeChange} rangeLimits={this.state.rangeLimits} />
                <Result populations={this.state.populations} emissions={this.state.emissions} selected={this.state.selected} perCapita={this.state.perCapita} rangeValue={this.state.rangeValue} />
            </div>
        )
    }
}

export default App
