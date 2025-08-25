import personService from '../services/persons'

const Persons = ({ persons, setPersons, filter, setErrorMessage }) => {

    const shownPersons = filter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const onDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
                .catch(error => {
                    console.log(error)
                    setErrorMessage(`Information of ${newName} has already been removed from server`)
                    setTimeout(() => setErrorMessage(null), 5000)
                })
        }
    }
    return (
        <ul>
            {shownPersons.map(person =>
                <li key={person.name}>
                    {person.name}
                    {person.number}
                    <button onClick={() => onDelete(person)}>delete</button>
                </li>)}
        </ul>
    )
}

export default Persons