
const CourseHeader = ({course}) => {
  return (
    <h2>{course.name}</h2>
  )
}

const CoursePart = ({name, exercises}) => {
  return (
    <tr>
      <td>{name}</td> 
      <td>[ {exercises} ]</td>
    </tr>
  )
}

const CourseContent = ({course}) => {
  return (
    <div>
      <table>
        <tbody>
          {course.parts.map(part => <CoursePart name={part.name} exercises={part.exercises}/>)}
        </tbody>
      </table>
    </div>
  )
}
const CourseTotal = ({course}) => {
  const initValue = 0
  const sum = course.parts.reduce((accumulator, currentElement) => accumulator + currentElement.exercises, initValue)
  const text = sum == 1 ? `To a total of ${sum} exercise.` : `To a total of ${sum} exercises.` // accomodates English grammar on plurality
  return (
    <p>
      <b>
        {text}
      </b>
    </p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader  course={course} />
      <CourseContent course={course} />
      <CourseTotal   course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const course = courses[0] // placeholder

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course}/>)}
    </div>
  )
  // semantic satiation blaaaargh
}

export default App
