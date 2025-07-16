import { useState, useEffect }  from 'react';
import personsService from '../services/personsService.ts';
// import { nanoid }     from 'nanoid'   // use with nanoid(x) where x is the optional argument for size/length
import type { Person } from "../types/person.ts";

const Button = ({onClick, children}:any) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};
  
const FilterPrompt = ({stateGetter, stateSetter}:any) => {
  return (
    <div>
      Filter names: 
      <input 
        value={stateGetter}
        onChange={(event) => {stateSetter(event.target.value)}}>
      </input>
    </div>
  );
};
  
const PersonForm = ({peopleList, peopleListSetter}:any) => {

  const [newPersonName,   setnewPersonName  ] = useState('');
  const [newPersonNumber, setnewPersonNumber] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault()
    console.log('submit button clicked', event.target)
    // Checks for potential duplicate submission, add if new unique name, else prompt to update info
    const found = peopleList.find((p:any) => p.name === newPersonName)
    if ( found === undefined ) {
      const newPerson = {
        id:     0,
        name:   newPersonName,
        number: newPersonNumber
      };
      // Sends this to the server, takes the id from the response and assigns it to the object
      personsService
        .create(newPerson)
        .then((response:any) => {
          console.log(response);
          if (response.status === 200) {
            peopleListSetter(peopleList.concat({...newPerson, id: response.data.id}));
          }
          else {
            console.log(`Error while creating new phonebook entry.`);
          }
        });
    }
    else {
      if (window.confirm(`${newPersonName} already exists in the phonebook. Update with new phone number?`)) {
        const newPerson = {...found, number: newPersonNumber};
        personsService
          .update(newPerson, found.id)
          .then((response:any) => {
            if (response.status === 200) {
              console.log(response);
              peopleListSetter(peopleList.map( (p:any) => p === found ? newPerson : p ));
            }
            else {
              console.log(`Error while updating new phonebook entry.`);
            }
          });
      }
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
  );
};
    
const NumbersList = ({list, setlist, filter}:any) => {
    
  const handleRemove = (id:string, name:string) => {
    if (window.confirm(`Are you sure to remove ${name}?`)) {
        const p = personsService.remove(id);
        p.then((response:any) => {if (response.status === 200) setlist(list.filter((item:any) => item.id != id)); else return false});
    }
    return true;
  }

  return (
  <div>
      <h2>Numbers</h2>
      <ul>
      {list
          .filter((person:Person) => person.name.toLowerCase().includes(filter))
          .map((person:any) => <li key={person.id}>{person.name} ( {person.number} ) <Button onClick={() => handleRemove(person.id, person.name)} children={'delete'} /></li>)}
      </ul>
  </div>
  );
};

const Phonebook:any = () => {
    const [persons, setPersons] = useState(Array<Person>);
    const [filter,  setfilter ] = useState('');
  
    // note that you unroll props passed between components, but you don't unroll when it concerns only other methods
    const updatePersons = (data:Array<Person>) => {
        setPersons(data);
    }

    useEffect( () => {
        personsService.getAll().then((response:any) => {
        updatePersons(response.data);
        });
    }, []);

    return (
      <div>
        <h1>Phonebook</h1>
        <FilterPrompt stateGetter={filter} stateSetter={setfilter} />
        <PersonForm peopleList={persons} peopleListSetter={setPersons} />
        <NumbersList list={persons} setlist={setPersons} filter={filter} />
      </div>
    );
};

export default Phonebook;