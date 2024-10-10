import { useState } from 'react'
import PhonebookEntry from './components/PhonebookEntry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phoneNo: '040-1234567'
     }
  ])
  const [newName, setNewName] = useState('')

  const [newPhoneNo, setNewNo] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input
            onChange={handleNameChange}
          />
        </div>
        <div>number: <input
            onChange={handlePhoneNumberChange}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhonebookEntry persons={persons} />
    </div>
  )
}

export default App