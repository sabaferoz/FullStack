import { useState, useEffect } from 'react'
import {gql,useMutation } from '@apollo/client'
import Notify from './Notify'

const LOGIN= gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const LoginForm = ({ setToken, show, token,setFavGenre }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      return (
      <div>
        <Notify errorMessage={error.graphQLErrors[0].message} />
      </div>
    )
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      console.log("token",token)
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }
  if(token){
    console.log("success")
    return (
      <div>
        <Notify successMessage="Successfully logged in" />
      </div>
    )
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm