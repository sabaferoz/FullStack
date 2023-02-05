import { useState } from 'react'

const Header = props => <div><h2>{props.text} </h2></div>
const Display = props => <div>{props.text}</div>


const generateRandom = (min = 0, max = 100) => {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    console.log('random no:', rand)

    return rand;
}

const Button = (props) => (
  <button onClick={() => props.handleClick()} >
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   

  const [selected, setSelected] = useState(0)

  const setAnecdote = (length) => {
      const no = generateRandom(0,length)
      setSelected(no)
      console.log('anecdote', anecdotes[no])
  }

  const initialVotes = new Uint8Array(anecdotes.length); 

  const [votes, setVotes] = useState(initialVotes)

  const setToVotes = (anecdoteIndex) => {
      const copyVotes = { ...votes}
      copyVotes[anecdoteIndex] +=1;
      setVotes(copyVotes)
      console.log('updated votes', anecdotes[anecdoteIndex], copyVotes[anecdoteIndex])
      setToTopAnecdote(copyVotes[anecdoteIndex], anecdoteIndex)
  }

  const [topAnecdote, setTopAnecdote] = useState(0)
  const setToTopAnecdote = (anecdoteVotes, anecdoteIndex) => {
    if (topAnecdote == 0 || anecdoteVotes > votes[topAnecdote]){
      setTopAnecdote(anecdoteIndex)
      console.log('top anecdote', anecdotes[anecdoteIndex])
    }
  }


  return (
<>
<div>
      <Header text= "Anecdote of the day"/>
    </div>
    <div>
      {anecdotes[selected]}
    </div>
        <div>
      <Display text= {"has " +  votes[selected] + " votes"}/>
    </div>
    <div>
      <Button handleClick={() => setAnecdote(anecdotes.length)} text="next anecdote" />
      <Button handleClick={() => setToVotes(selected)} text="vote" />
    </div>

    <div>
      <Header text= "Anecdote with most votes"/>
    </div>

    <div>
      <Display text={anecdotes[topAnecdote]}/>
    </div>
     <div>
      <Display text= {"has " +  votes[topAnecdote] + " votes"}/>
    </div>

  </>
  )
}

export default App