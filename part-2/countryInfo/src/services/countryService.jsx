import axios from 'axios'

let base_url = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAll = () => {
    console.log(`returning all country info`)
    return axios.get(`${base_url}/all`)
}

const getSingle = (name) => {
    console.log(`returning infro for country: ${name}`)
    return axios.get(`${base_url}/name/${name}`)
}

export default{
    getAll,
    getSingle
}
