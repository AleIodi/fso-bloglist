import { Alert } from '@mui/material'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert sx={{ mt: 3 }} severity={ className }>{message}</Alert>
  )
}

export default Notification