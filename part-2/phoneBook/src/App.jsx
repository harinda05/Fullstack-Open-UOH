import { useEffect, useState } from 'react'
import PhonebookEntry from './components/PhonebookEntry'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNo, setNewNo] = useState('')
  const [newFilterString, setNewFilterString] = useState('')



  const addEntry = (event) => {
    event.preventDefault()
    console.log("debug", newName)

    const nameAlreadyExists = persons.some((person) => {
      return person.name === newName
    })

    console.log(nameAlreadyExists)
    if (nameAlreadyExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newPhoneNo
      }
      setPersons(persons.concat(nameObject))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setNewNo(event.target.value)
  }

  const handleSearchFilter = (event) => {
    console.log(event.target.value)
    setNewFilterString(event.target.value)
  }

  useEffect(() => {

    console.log('getting data from server')

    axios.get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
      })

  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={handleSearchFilter}/>
      <PersonForm onSubmit={addEntry} onNameChange={handleNameChange} onPhonenoChange={handlePhoneNumberChange}/>
      <h2>Numbers</h2>
      <PhonebookEntry persons={persons} filterString={newFilterString} />
    </div>
  )
}

export default App