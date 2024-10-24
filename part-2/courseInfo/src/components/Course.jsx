import { Fragment } from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {total}</p>
}
const Part = ({ part }) =>   
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
    parts.map( part => 
      <Part key={part.id}
        part={part} 
      />
    )}
         
  </>

const Course = ({courses})  =>
  courses.map((course) => {
  return (<Fragment key={course.id}>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </Fragment>)
  })

  export default Course