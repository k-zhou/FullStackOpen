import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({statisticsObj}) => {
  const good     = statisticsObj.good
  const neutral  = statisticsObj.neutral
  const bad      = statisticsObj.bad
  const all     = (good + neutral + bad)
  const denom    = all == 0 ? 1 : all
  const average  = (good - bad) / denom
  const positive = Number((good / denom)).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})

  if (all == 0)
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
  )
  else
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good"     value={good}/>
            <StatisticLine text="Neutral"  value={neutral}/>
            <StatisticLine text="Bad"      value={bad}/>
            <StatisticLine text="All"      value={all}/>
            <StatisticLine text="Average"  value={average}/>
            <StatisticLine text="Positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
}
// const Button = ({eventHandler}) => {
  // return (
  //   <p>{text}</p>
  // )
// }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}      >Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}        >Bad</button>
      <Statistics statisticsObj={{good, neutral, bad}} />
    </div>
  )
}

export default App