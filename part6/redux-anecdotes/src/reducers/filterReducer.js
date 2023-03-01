const filterReducer = (state=[], action) => {
    console.log("state:", state)
    console.log("action", action)
  switch(action.type){
    case 'SET_FILTER': 
        return action.payload
        //return state.filter(anecdote=> anecdote.content.toLowerCase()=== action.payload.filter.toLowerCase())
    default:
        return state
    }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer