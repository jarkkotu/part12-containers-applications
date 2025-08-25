import personService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, setInfoMessage, setErrorMessage }) => {
    
    const addPerson = (event) => {
        event.preventDefault()
    
        const newPerson = { name: newName, number: newNumber }
        const oldPerson = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

        if (oldPerson) {
            if (oldPerson.number !== newNumber) {
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                    newPerson.id = oldPerson.id
                    personService
                        .update(oldPerson.id, newPerson)
                        .then(response => {
                            setPersons(persons.filter(p => p.id !== oldPerson.id).concat(response.data))
                            setNewName('')
                            setNewNumber('')
                            setInfoMessage(`Updated ${newName}`)
                            setTimeout(() => setInfoMessage(null), 5000)
                        })
                        .catch(error => {
                            console.log(error)
                            setErrorMessage(`Failed to update ${newName}`)
                            setTimeout(() => setErrorMessage(null), 5000)
                        })
                    return
                }
            }

            alert(`${newName} is already added to phonebook`)
            return
        }
    

        personService
            .create(newPerson)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
                setInfoMessage(`Added ${newName}`)
                setTimeout(() => setInfoMessage(null), 5000)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(`Failed to create ${newName}`)
                setTimeout(() => setErrorMessage(null), 5000)
            })
      }

    const newNameChanged = (event) => {
        console.log('newNameChanged', event.target.value)
        setNewName(event.target.value)
    }
    
    const newNumberChanged = (event) => {
        console.log('newNumberChanged', event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={newNameChanged} />
            </div>
            <div>
            number: <input value={newNumber} onChange={newNumberChanged}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm