import Person from "./Person"
const PhonebookEntry = (props) => {
    return <>
        {props.persons
        .filter(person => person.name.toLowerCase().includes(props.filterString.toLowerCase()))
        .map((person) =>
            <Person key={`${person.name}`} name={person.name} phoneNo={person.number}/>)
        }</>
}

export default PhonebookEntry