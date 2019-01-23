import React from 'react'
import Select from 'react-select'

const Search = ({ countries, setSelected, selected }) => {
    if (countries === undefined) return null

    return (
        <div>
            {/*<select onChange={setSelected} name='selected' value={selected}>
                {countries.map(country =>
                    <option key={country.value} value={country.value}>
                        {country.label}
                    </option>
                )}
                </select>*/}

            <Select value={selected} onChange={setSelected} options={countries}/>

        </div>
    )
}

export default Search