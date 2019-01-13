import React, { Component } from 'react'

import populationService from './services/populations'
import countriesService from './services/countries'

import Title from './components/Title'
import Search from './components/Search'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            populations: null
        }
    }

    async componentDidMount() {
        const countries = await countriesService.getAll()
        this.setState({countries})
        console.log(this.state.countries)
    }

    handleCountryChange = async (event) => {
        const country = event.target.value
        const populations = await populationService.getByISO(country)
        this.setState({
            populations
        })
        console.log(this.state)
    }

    render() {
        
        return (
            <div>
                <Title title={'CO2 Emissions'}/>
                <Search countries={this.state.countries} setSelected={this.handleCountryChange}/>
            </div>
        )
    }
}

export default App
