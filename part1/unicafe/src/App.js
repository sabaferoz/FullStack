import React, { useState } from 'react';
const Header = props => <div><h2>{props.text} </h2></div>
const StaticticsLine = props => <tr><td>{props.text}</td>  <td>{props.value} </td> </tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, bad, neutral, total, average, percentage}) => (
  <>
 <table>
      <StaticticsLine text="good" value={good} />
      <StaticticsLine text="neutral" value={neutral} />
      <StaticticsLine text="bad" value={bad} />
      <StaticticsLine text="all" value={total} />
      <StaticticsLine text="average" value={average} />
      <StaticticsLine text="positive" value={percentage +  " %"} />
  </table>
  </>
)

const App = () => {
  const [good, setGood] = useState(0)

  const setToGood = newValue => {
    console.log('good now', newValue)
    setGood(newValue)
  }
  const [bad, setBad] = useState(0)

  const setToBad = newValue => {
    console.log('bad now', newValue)
    setBad(newValue)
  }

  const [neutral, setNeutral] = useState(0)

  const setToNeutral = newValue => {
    console.log('value now', newValue)
    setNeutral(newValue)
  }

  const [total, setTotal] = useState(0)

  const setToTotal = (newValue) => {
    console.log('total now', newValue)
    setTotal(newValue)
    return newValue
  }

  const [average, setAverage] = useState(0)

  const setToAverage = (newValue) => {
    console.log('average now', newValue)
    setAverage(newValue)
  }

  const [percentage, setPercentage] = useState("0")
  const setToPercentage = (newValue) => {
  console.log('% now', newValue)
  setPercentage(newValue)
  }

  const handleGood = (newValue) =>{
      setToGood(newValue)
      const newTotal= setToTotal(newValue + bad + neutral)
      setToAverage(((newValue * 1) + (bad * (-1)) + (neutral * 0))/ newTotal)
      setToPercentage((newValue/newTotal) * 100)
      setToFeedback()
  }

  const handleBad = (newValue) =>{
      setToBad(newValue)
      const newTotal= setToTotal(newValue + good + neutral)
      setToAverage(((good * 1) + (newValue * (-1)) + (neutral * 0))/ newTotal)
      setToPercentage((good/newTotal) * 100)
      setToFeedback()
  }

  const handleNeutral = (newValue) =>{
      setToNeutral(newValue)
      const newTotal= setToTotal(good + bad + newValue)
      setToAverage(((good * 1) + (bad * (-1)) + (newValue * 0))/ newTotal)
      setToPercentage((good/newTotal) * 100)
      setToFeedback()
  }

  const [feedback, setFeedback] = useState(false)
  const setToFeedback = () =>{
      console.log('feedback given', feedback)
      setFeedback(true)
  }

  if (feedback == true){

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={() => handleGood(good+1)} text="good" />
      <Button handleClick={() => handleNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => handleBad(bad+1)} text="bad" />
      <Header text="Statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} percentage= {percentage}/>
      
    </div>
  )
  }
  return(
  <div>
      <Header text="Give feedback" />
      <Button handleClick={() => handleGood(good+1)} text="good" />
      <Button handleClick={() => handleNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => handleBad(bad+1)} text="bad" />
      <Header text="Statistics" />
      <StaticticsLine text="No feeback given"/>
      
    </div>
  );
}

export default App