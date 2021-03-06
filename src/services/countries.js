import axios from 'axios'

const getAll = () => {
    const url = 'https://api.worldbank.org/v2/country?per_page=500&format=json'
    return fetchData(url)
}

const fetchData = async (url) => {
    const response = await axios.get(url)
    return format(response.data)
}

const format = (data) => {
    const formated = data[1].map(x => {
        return ({
            "value": x.iso2Code,
            "label": x.name
        })
    })

    formated.sort((a, b) => (a.label > b.label) ? 1 : -1)
    return formated
}

export default { getAll }