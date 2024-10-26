const CapitalWeather = (props) => {
    return (

        <div>
            <h2> Weather in {props.weather.capital} </h2>
            <p> temperature {props.weather.temp} </p>
            <img src={`https://openweathermap.org/img/wn/${props.weather.icon}@2x.png`}/>
            <p> wind {props.weather.wind} m/s</p>
        </div>
    )
}

export default CapitalWeather