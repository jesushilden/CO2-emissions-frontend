import React from 'react'

const Search = ({ countries, setSelected, selected }) => {
    if (countries === undefined) return null

    return (
        <div>
            <select onChange={setSelected} name='selected' value={selected}>
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