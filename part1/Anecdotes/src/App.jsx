import { useState } from 'react'

// const handleClick = ({setState}) => {
//   setState()
// }

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const Anecdotes = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  
  // # Observations with using objects: While objects may resemble Python dict structures, they're much more difficult to use in that I have yet to find a way to make objects access keys from the value of variables, instead of treating the variables' names as keys. This means declaring an int variable i and using it to iteratively add/update an object's key-value pairs is not possible afaik.
  // # Oh so in JS they're called Maps 
  // # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps

  const [votes,    setVotes]    = useState(Array(anecdotes.length).fill(0))
  // # Note if you want to create an array using some specific elements, use the .of()
  
  // console.log(votes)

  const handleRandomAnecdoteClick = () => {
    const target = getRandomInt(anecdotes.length)
    setSelected(target)
    return
  }
  
  // # Find the most voted anecdote, or collect the multiple tied and randomly pick one of them, returns its index
  const findMostVoted = () => {
    let most    = 0
    let collect = []
    for (let i = 0; i < anecdotes.length; ++i) {
      if (votes[i] > most) {
        most    = votes[i]
        collect = [ i ]
      }
      else if (votes[i] == most) {
        collect.push(i)
      }
    }
    return collect[getRandomInt(collect.length)]
  }
  
  const handleVoteClick = () => {
    let newVotes = Array.from(votes) // creates a copy
    newVotes[selected] ++
    // console.log("Old: ", votes, "New: ", newVotes)
    setVotes(newVotes)
    return
  }

  const voteString = votes[selected] == 1 ? `This anecdote has ${votes[selected]} vote.` : 
                                            `This anecdote has ${votes[selected]} votes.`

  const mostVotedAnecdote = anecdotes[findMostVoted()]

  return (
    <div>
      <h1>Anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <p>{voteString}</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleRandomAnecdoteClick}>Next anecdote</button>
      <h1>The anecdote with the most votes</h1>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}
const App = () => {

  return (
    <div>
      <Anecdotes />
    </div>
  )
}

export default App