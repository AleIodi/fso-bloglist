import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewBlog = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            sx={{ width: 500 }}
            required
            label="title"
            variant="outlined"
            value={title}
            size="small"
            margin="dense"
            onChange={({ target }) => setTitle(target.value)}
            name="Title" />
        </div>
        <div>
          <TextField
            sx={{ width: 500 }}
            required
            label="author"
            variant="outlined"
            value={author}
            size="small"
            margin="dense"
            onChange={({ target }) => setAuthor(target.value)}
            name="Author" />
        </div>
        <div>
          <TextField
            sx={{ width: 500 }}
            required
            label="url"
            variant="outlined"
            value={url}
            size="small"
            margin="dense"
            onChange={({ target }) => setUrl(target.value)}
            name="Url" />
        </div>
        <Button sx={{ marginTop: '1em' }} variant="contained" type="submit">CREATE</Button>
      </form>
    </div>
  )
}

export default NewBlog