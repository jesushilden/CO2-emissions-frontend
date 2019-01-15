import axios from 'axios'

const getByISO = (ISO) => {
    const url = `https://api.worldbank.org/v2/countries/${ISO}/indicators/EN.ATM.CO2E.KT?per_page=100&format=json`
    return fetchData(url)
}

const fetchData = async (url) => {
    const response = await axios.get(url)
    return format(response.data)
}

const format = (data) => {
    if (data[1] === null) return null
    const formated = data[1].map(x => {
        return ({
            "year": x.date,
            "value": x.value
        })
    })

    formated.sort((a, b) => (a.year > b.year) ? 1 : -1)

    return formated
}

export default { getByISO }