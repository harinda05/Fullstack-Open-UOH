import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}

const StatDisplay = (props) => {
  return (
    <div>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood( good + 1 )} text="good" />
      <Button handleClick={() => setNeutral( neutral + 1 )} text="neutral"/>
      <Button handleClick={() => setBad( bad + 1 )} text="bad"/>
    </div>
    <div>
      <h1>statistics</h1>
      <StatDisplay good={good} neutral={neutral} bad={bad}/>
    </div>
    </div>
    
  )
}

export default App