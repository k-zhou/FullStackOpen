import { useState } from 'react'
import { nanoid   } from 'nanoid'   // use with nanoid(x) where x is the optional argument for size/length

const NumbersList = ({list}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',   id: 0 },
    { name: 'Ada Lovelace',  id: 1 },
    { name: 'Alonso Church', id: 2 },
    { name: 'Alan Turing',   id: 3 }
  ]) 
  const [newName, setNewName] = useState('')

  const [IDCounter, setIDCounter] = useState(4)

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName,
      id: IDCounter

    }

    setPersons(persons.concat(newPerson))
    setIDCounter(IDCounter + 1)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleInputChange}
                />
        </div>
        <div>
          debug: {newName}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <NumbersList list={persons} />
    </div>
  )
}

export default App