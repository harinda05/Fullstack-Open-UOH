const Person = ({id, name , phoneNo, onDelete}) => {
    return <p> {name}  {phoneNo}
    <button id={id} onClick={onDelete} type="submit">delete</button> </p>
}

export default Person