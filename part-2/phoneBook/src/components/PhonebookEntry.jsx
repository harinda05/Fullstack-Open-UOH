const PhonebookEntry = (props) => {
    return <>
        {props.persons.map((person, index) =>
            <p key={`${person.name}-${index}`}> {person.name}  {person.phoneNo}</p>)
        }</>
}

export default PhonebookEntry