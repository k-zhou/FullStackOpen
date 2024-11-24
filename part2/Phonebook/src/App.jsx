import { useState } from 'react'
import { nanoid   } from 'nanoid'   // use with nanoid(x) where x is the optional argument for size/length

const NumbersList = ({list, filter}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {list.filter((person) => person.name.toLowerCase().includes(filter)).map(person => <li key={person.id}>{person.name} ( {person.number} )</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '333',   id: 0 },
    { name: 'Ada Lovelace', number: '341',  id: 1 },
    { name: 'Alonso Church', number: '131', id: 2 },
    { name: 'Alan Turing', number: '321',   id: 3 }
  ]) 
  const [newPersonName,   setnewPersonName  ] = useState('')
  const [newPersonNumber, setnewPersonNumber] = useState('')

  const [IDCounter, setIDCounter] = useState(4)
  const [filter,    setfilter]    = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // check for potential duplicate submission, add if new unique name, else show error message
    if (persons.find(p => p.name === newPersonName) === undefined ) {
      const newPerson = {
        name:   newPersonName,
        number: newPersonNumber,
        id:     IDCounter

      }
      setPersons(persons.concat(newPerson))
      setIDCounter(IDCounter + 1)
    }
    else {
      alert(`${newPersonName} already exists in the phonebook!`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      Filter names: 
      <input 
        value={filter}
        onChange={(event) => {setfilter(event.target.value)}}>
      </input>
      <h2>Add a new entry</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                name:
              </td>
              <td>
                <input 
                      value={newPersonName}
                      onChange={(event) => {setnewPersonName(event.target.value)}}
                    />
              </td>
            </tr>
            <tr>
              <td>
                number:
              </td>
              <td>
                <input 
                      value={newPersonNumber}
                      onChange={(event) => {setnewPersonNumber(event.target.value)}}
                    />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <NumbersList list={persons} filter={filter} />
    </div>
  )
}

export default App