import React from 'react'
import InputRange from 'react-input-range'
import '../styles/resultOptions.css'

const ResultOptions = ({ togglePerCapita, rangeValue, setRange, rangeLimits }) => {

    if (togglePerCapita === null || rangeValue === null || rangeLimits === null) {
        return null
    }

    return (
        <div className='resultOptions'>
            <div className='perCapita'>
                <input type='checkbox' name='perCapita' onChange={togglePerCapita} />
                <label>Per Capita</label>
            </div>
            <InputRange
                maxValue={rangeLimits.max}
                minValue={rangeLimits.min}
                value={rangeValue}
                onChange={value => setRange(value)} />
        </div>
    )
}

export default ResultOptions