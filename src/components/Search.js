import React from 'react'

const Search = ({ countries, setSelected }) => {
    if (countries === undefined) return null

    return (
        <div>
            <select onChange={setSelected} name='selected'>
                {countries.map(country =>
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Search