import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    onSubmit({ username, password })
    setIsLoading(false)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField required label="username" variant="standard" slotProps={{
            input: {
              readOnly:  isLoading ,
            },
          }} value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
          />
        </div>
        <div>
          <TextField
            required
            label="password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            slotProps={{
              input: {
                readOnly:  isLoading ,
              },
            }} value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
          />
        </div>
        <Button sx={{ mt: 2 }} variant="contained" type="submit">LOGIN</Button>
      </form>
    </div>
  )
}

export default Login