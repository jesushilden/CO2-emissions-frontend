import axios from 'axios'

const getByISO = (ISO) => {
    const url = `https://api.worldbank.org/v2/countries/${ISO}/indicators/SP.POP.TOTL?per_page=100&format=json`
    return getJson(url)
}

const getByYear = (year) => {
    const url = `https://api.worldbank.org/v2/countries/all/indicators/SP.POP.TOTL?per_page=100&date=${year}&format=json`
    return getJson(url)
}

const getByISOAndYear = (ISO, year) => {
    const url = `https://api.worldbank.org/v2/countries/${ISO}/indicators/SP.POP.TOTL?per_page=100&date=${year}&format=json`
    return getJson(url)
}

const getJson = async (url) => {
    const response = await axios.get(url)
    return format(response.data)
}

const format = (data) => {
    const formated = data[1].map(x => {
        return ({
            "ISO": x.country.id,
            "country": x.country.value,
            "year": x.date,
            "population": x.value
        })
    })

    return formated
}

export default { getByISO, getByYear, getByISOAndYear }