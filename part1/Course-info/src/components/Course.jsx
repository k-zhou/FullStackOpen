
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
            {course.parts.map(part => <CoursePart key={part.name} name={part.name} exercises={part.exercises}/>)}
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

  export default Course