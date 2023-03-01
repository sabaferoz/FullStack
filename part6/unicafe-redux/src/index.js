import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from "./reducer";
import { createStore } from 'redux'

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <button 
        onClick={e => store.dispatch({ type: 'GOOD' })}
      >
        Good
      </button>
      <button
        onClick={e => store.dispatch({ type: 'OK' })}
      >
        Ok
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'BAD' })}
      >
        Bad
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        Reset stats
      </button>
      <div>
        Good: {store.getState().good} <br/>
        Ok: {store.getState().ok}<br/>
        Bad: {store.getState().bad}<br/>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)