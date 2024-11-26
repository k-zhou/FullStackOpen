import { useState, useEffect } from 'react'
import { nanoid   } from 'nanoid'   // use with nanoid(x) where x is the optional argument for size/length
import axios    from 'axios'

const SERVER_ADDRESS = 'http://localhost:3001/persons'

const FilterPrompt = ({stateGetter, stateSetter}) => {
  return (
    <div>
      Filter names: 
      <input 
        value={stateGetter}
        onChange={(event) => {stateSetter(event.target.value)}}>
      </input>
    </div>
  )
}

const PersonForm = ({peopleList, peopleListSetter, idCounter, idCounterSetter}) => {

  const [newPersonName,   setnewPersonName  ] = useState('')
  const [newPersonNumber, setnewPersonNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // check for potential duplicate submission, add if new unique name, else show error message
    if (peopleList.find(p => p.name === newPersonName) === undefined ) {
      const newPerson = {
        name:   newPersonName,
        number: newPersonNumber,
        id:     idCounter

      }

      axios
        .post(SERVER_ADDRESS, newPerson)
        .then(response => {
          console.log(response)
        })

      peopleListSetter(peopleList.concat(newPerson))
      idCounterSetter(idCounter + 1)
    }
    else {
      alert(`${newPersonName} already exists in the phonebook!`)
    }
  }

  return (
    <div>
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
    </div>
  )
}

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
  
  const [persons, setPersons] = useState([]) 
  const [IDCounter, setIDCounter] = useState(0)
  const [filter,    setfilter]    = useState('')
  
  // note that you unroll props passed between components, but you don't unroll when it concerns only other methods
  const updatePersons = (data) => {
    setPersons(data)
    setIDCounter(data.length)
  }

  useEffect( () => {
    axios
      .get(SERVER_ADDRESS)
      .then(response => {
        updatePersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterPrompt stateGetter={filter} stateSetter={setfilter} />
      <PersonForm peopleList={persons} peopleListSetter={setPersons} idCounter={IDCounter} idCounterSetter={setIDCounter}/>
      <NumbersList list={persons} filter={filter} />
    </div>
  )
}

export default App