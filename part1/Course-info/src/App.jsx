
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
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}
const Total = (props) => {
  let sum = 0
  props.parts.forEach(part => sum = sum + part.exercises)
  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  var   all_parts     = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={all_parts}/>
      <Total parts={all_parts}/>
    </div>
  )
}

export default App
