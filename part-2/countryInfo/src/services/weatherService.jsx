import axios from "axios";


const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY

const getWeatherDataForCity = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
}

export default {
    getWeatherDataForCity
} 