// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]}/>
      <Part part={props.parts[1]} exercise={props.exercises[1]}/>
      <Part part={props.parts[2]} exercise={props.exercises[2]}/>
    </div>
  )
}
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.sum}
    </p>
  )
}



const App = () => {
  const course     = 'Half Stack application development'
  const part1      = 'Fundamentals of React'
  const exercises1 = 10
  const part2      = 'Using props to pass data'
  const exercises2 = 7
  const part3      = 'State of a component'
  const exercises3 = 14
  var   all_parts     = [part1, part2, part3]
  var   all_exercises = [exercises1, exercises2, exercises3]
  // var   sum

  return (
    <div>
      <Header course={course} />
      <Content parts={all_parts} exercises={all_exercises}/>
      <Total sum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
