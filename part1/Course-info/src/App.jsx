
const Header = ({course}) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <tr>
      <td>{name}</td> 
      <td>[ {exercises} ]</td>
    </tr>
  )
}

const Content = ({course}) => {
  return (
    <div>
      <table>
        <tbody>
          {course.parts.map(part => <Part name={part.name} exercises={part.exercises}/>)}
        </tbody>
      </table>
    </div>
  )
}
const Total = ({course}) => {
  let sum = 0
  course.parts.forEach(part => sum = sum + part.exercises)
  const text = sum == 1 ? `To a total of ${sum} exercise.` : `To a total of ${sum} exercises.` // accomodates English grammar on plurality
  return (
    <p>
      <b>
        {text}
      </b>
    </p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: "Server interaction",
        exercises: 19
      }
    ]
  }

  return (
    <div>
      <Header  course={course} />
      <Content course={course} />
      <Total   course={course} />
    </div>
  )
}

export default App
