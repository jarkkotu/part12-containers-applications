import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  console.log('app start')

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((response) => setPersons(response.data))
      .catch(error => console.log('getAll error', error))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={infoMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>

      <PersonForm
         persons={persons} newName={newName} newNumber={newNumber}
         setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
         setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage} />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App