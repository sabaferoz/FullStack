import { createSlice } from '@reduxjs/toolkit'

const initialState = "";


const notificationSlice = createSlice(
{
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      console.log("notifier called")
      return action.payload

    },
    removeNotify(state, action) {
      console.log("remove notify called")
      return ""

    },
  },
}

)

export const setNotification = (content, timeout) => {
return async dispatch => {
dispatch(notify(`new anecdote '${content}'`))
setTimeout(() => {
  dispatch(removeNotify())
}, timeout)
}

}



export const {  notify, removeNotify } = notificationSlice.actions
export default notificationSlice.reducer

