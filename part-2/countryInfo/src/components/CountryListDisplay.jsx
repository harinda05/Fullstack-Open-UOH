const CountryListDisplay = (props) => {

    { console.log(props.countryList) }
    return (<div>
        
            {props.countryList.map((countryName, index) => (
                <div key={index}> {countryName} <button id={countryName} onClick={props.onClick}>show</button> </div>
            ))}
        
    </div>)
}

export default CountryListDisplay