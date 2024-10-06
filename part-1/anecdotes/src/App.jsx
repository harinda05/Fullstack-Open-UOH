import { useState } from 'react'

const Display = ({anecdote, points, header}) => {
  return (
    <div>
      <h1> {header} </h1>
      <p>{anecdote}</p>
      <p>has {points} votes</p>
    </div>)
}

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>
}

const App = () => {
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
  const [points, setPoint] = useState(new Uint8Array(anecdotes.length))
  console.log("selected", selected)
  console.log(points)


  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
  }

  const maxVoteCount = Math.max(...points);
  const maxVoteCountIndex = points.indexOf(maxVoteCount);

  return (
    <div>
      <Display anecdote={anecdotes[selected]} points={points[selected]} header="Anecdote of the day"/>
      <Button handleClick = {() => vote(selected)} text="vote" />
      <Button handleClick = {() => setSelected( Math.floor(Math.random() * anecdotes.length ))} text="next anecdote" />
      <Display anecdote={anecdotes[maxVoteCountIndex]} points={maxVoteCount} header="Anecdote with most votes"/>
    </div>
  )
}

export default App