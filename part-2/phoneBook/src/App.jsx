import { useState } from 'react'
import PhonebookEntry from './components/PhonebookEntry'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
        phoneNo: newPhoneNo
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