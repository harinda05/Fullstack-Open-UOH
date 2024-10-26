const Country = (props) => {
    { console.log(props) }

    return <div>
        <h1> {props.country.name} </h1>
        <p> capital {props.country.capital}</p> 
        <p> area {props.country.area}</p> 

        <div>
            <h3> languages: </h3>
            <ul></ul>
            {Object.values(props.country.languages).map((language, index) => (
                <li key={index}> {language} </li>
            ))}
        </div>

        <img src={props.country.flagpng} />
    </div>

}

export default Country