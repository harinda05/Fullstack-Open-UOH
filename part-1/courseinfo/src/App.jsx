import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part partNo={props.course.parts[0].name} exercisesNo={props.course.parts[0].exercises} />
      <Part partNo={props.course.parts[1].name} exercisesNo={props.course.parts[1].exercises} />
      <Part partNo={props.course.parts[2].name} exercisesNo={props.course.parts[2].exercises} />
    </div>
   
  )

}

const Total = (props) => {

  return(
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}

const Part = (props) => {

  return(
    <div>
      <p>
        {props.partNo} {props.exercisesNo}
      </p>
    </div>
  )

}


function App() {
  
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
      }
    ]
  }

  return (
    <div>
      <Header course= {course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
