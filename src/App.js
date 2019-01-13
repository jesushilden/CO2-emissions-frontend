import React, { Component } from 'react'

import populationService from './services/populations'
import emissionsService from './services/emissions'
import countriesService from './services/countries'

import Title from './components/Title'
import Search from './components/Search'
import Result from './components/Result'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            selected: {
                id: '1W',
                name:'World'
            },
            populations: null,
            emissions: null
        }
    }

    async componentDidMount() {
        const countries = await countriesService.getAll()
        const populations = await populationService.getByISO(this.state.selected.id)
        const emissions = await emissionsService.getByISO(this.state.selected.id)
        this.setState({ countries, populations, emissions })
        console.log(this.state)
    }

    handleCountryChange = async (event) => {
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

    render() {

        return (
            <div>
                <Title title={'CO2 Emissions'} />
                <Search countries={this.state.countries} setSelected={this.handleCountryChange} selected={this.state.selected.id} />
                <Result populations={this.state.populations} emissions={this.state.emissions} country={this.state.selected}/>
            </div>
        )
    }
}

export default App
