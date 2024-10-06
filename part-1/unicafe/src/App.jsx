import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}

const StatisticLine = (props) => {
  return <tr>
    <th align="left"> {props.text}</th>
    <th align="left">{props.value}</th>
  </tr>
  
}

const Statistics  = ({good, neutral, bad}) => {

  if(good ===0 & neutral===0 & bad===0){
    return <div> <p> No Feedback Given </p></div>
  }

  let all = good + neutral + bad

  const average = () => {
    return (good * 1 + bad * -1 ) / all
  }

  const positive = () => {
    return `${((good * 1) / all) * 100}%`
  }

  return (
    <div>
      <table> 
        <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average()} />
        <StatisticLine text="positive" value ={positive()} />
        </tbody>
      </table>
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
      <Statistics  good={good} neutral={neutral} bad={bad}/>
    </div>
    </div>
    
  )
}

export default App