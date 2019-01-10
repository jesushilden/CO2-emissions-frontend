import React, { Component } from 'react'

import populationService from './services/populations'

class App extends Component {

    async componentDidMount() {
        const populations = await populationService.getByYear('1995')
        console.log(populations)
    }

    render() {
        
        return (
            <div>
                Hello World!
            </div>
        )
    }
}

export default App
