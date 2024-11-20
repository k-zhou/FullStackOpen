import { useState } from 'react'

const Statistics = ({statisticsObj}) => {
  const good     = statisticsObj.good
  const neutral  = statisticsObj.neutral
  const bad      = statisticsObj.bad
  const all     = (good + neutral + bad)
  const denom    = all == 0 ? 1 : all
  const average  = (good - bad) / denom
  const positive = good / denom

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{positive}</td>
          </tr>
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