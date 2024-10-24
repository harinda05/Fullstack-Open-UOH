import { useEffect, useState } from 'react'
import PhonebookEntry from './components/PhonebookEntry'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import entryService from './services/entryService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNo, setNewNo] = useState('')
  const [newFilterString, setNewFilterString] = useState('')
  const [notificationMsg, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  // set notification to null

  const setNotificationNull = () => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  // Add new phonebook entry

  const addEntry = (event) => {
    event.preventDefault()
    console.log("debug", newName)

    const nameObject = {
      name: newName,
      number: newPhoneNo
    }

    const nameAlreadyExists = persons.some((person) => {
      return person.name === newName
    })

    if (nameAlreadyExists) {

      const person = persons.find(p => p.name === newName);

      if(person.number === newPhoneNo) {
        alert(`${newName} is already added to phonebook`)
      } else if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one ?`)) {
        updateEntry(person.id, nameObject)
      }

    } else {
      entryService
        .create(nameObject)
        .then(responseItem => {
          setPersons(persons.concat(responseItem))
          setNotification(`Added ${responseItem.name}`)
          setNotificationType('success')
          setNotificationNull()
        })
    }
  }

  // delete phonebook entry

  const deleteEntry = (event) => {

    let personId = event.target.id
    console.log('delete clicked: ', personId)
    console.log('==========>', persons)
    const person = persons.find(p => p.id === personId);

    console.log('found person? ', person)

    const personName = person.name

    if (window.confirm(`Delete ${personName} ?`)) {
      console.log('Deletion confirmed ', personName)
      entryService
      .deleteEntry(event.target.id)
      .then(responseItem => {
        setPersons(persons.filter(person => person.id !== responseItem.id))
        setNotification(`Deleted ${responseItem.name}`)
        setNotificationNull()
      })
    }
  }

  // update phone number for existing user

  const updateEntry = (id, newObject) => {
    entryService
      .update(id, newObject)
      .then(responseItem => {
        setPersons(persons.map(person => person.id !== id ? person : responseItem))
        setNotification(`Updated ${responseItem.name}`)
        setNotificationNull()
      }).catch(error => {
        console.log('in error..............')
        setNotification(`Information of '${newObject.name}' has already been removed from server`)
        setNotificationType('failure')
        setNotificationNull()
      })
  }


  // text input change handlers

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

  // get all the phonebook entries from db
  useEffect(() => {
    entryService.getAll()
    .then( response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} type={notificationType}/>
      <SearchFilter filter={handleSearchFilter}/>
      <h2>Add a new </h2>
      <PersonForm onSubmit={addEntry} onNameChange={handleNameChange} onPhonenoChange={handlePhoneNumberChange}/>
      <h2>Numbers</h2>
      <PhonebookEntry persons={persons} filterString={newFilterString} onDelete={deleteEntry} />
    </div>
  )
}

export default App