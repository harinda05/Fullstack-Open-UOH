import Person from "./Person"
const PhonebookEntry = (props) => {
    return <>
        {props.persons
        .filter(person => person.name.toLowerCase().includes(props.filterString.toLowerCase()))
        .map((person) =>
            <Person key={`${person.name}`} id={person.id} name={person.name} phoneNo={person.number} onDelete={props.onDelete}/>)
        }</>
}

export default PhonebookEntry