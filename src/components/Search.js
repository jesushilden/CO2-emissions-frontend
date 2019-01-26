import React from 'react'
import Select from 'react-select'

import '../styles/search.css'

const Search = ({ countries, setSelected, selected }) => {
    if (countries === undefined) return null

    return (
        <div className='search'>
            <Select
                value={selected}
                onChange={setSelected}
                options={countries}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#eeeeee',
                        primary: '#555555',
                    },
                })} />
        </div>
    )
}

export default Search