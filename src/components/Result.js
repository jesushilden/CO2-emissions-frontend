import React from 'react'

const Result = ({ populations, emissions, country }) => {
    if (populations === null || emissions === null || country === null) {
        return (
            <div>
                No data could be found for {country.name}
            </div>
        )
    } else {
        return (
            <div>
                Data was found for {country.name}!
            </div>
        )
    }
}

export default Result