import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import NewBlog from './components/NewBlog'
import Toggable from './components/Toggable'
import BlogList from './components/BlogList'
import {
  Routes, Route, NavLink,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import { AppBar, Button, Toolbar, Typography, Box, CircularProgress } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [className, setClassName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  const navigate = useNavigate()

  const notify = (message, type = 'success') => {
    setErrorMessage(message)
    setClassName(type)
    setTimeout(() => {
      setErrorMessage(null)
      setClassName('')
    }, 5000)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch {
        notify('Failed to fetch blogs', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userToLogin) => {
    try {
      const user = await loginService.login(userToLogin)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUser(user)

      notify('login successful')
      navigate('/')
    } catch (exception) {
      const serverErrorMessage = exception.response && exception.response.data && exception.response.data.error
        ? exception.response.data.error
        : 'Wrong credentials'

      notify(serverErrorMessage, 'error')
      navigate('/login')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const handleNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))

      notify(`a new blog ${blog.title} by ${blog.author} added`)

    } catch (exception) {
      const serverErrorMessage = exception.response && exception.response.data && exception.response.data.error
        ? exception.response.data.error
        : 'Failed to create new blog'

      notify(serverErrorMessage, 'error')
    }
  }

  const handleLike = async (id, blogToLike) => {
    try {
      const response = await blogService.update(id, blogToLike)
      setBlogs(blogs.map(b => b.id === id ? response : b))
    } catch (exception) {
      const serverErrorMessage = exception.response && exception.response.data && exception.response.data.error
        ? exception.response.data.error
        : 'Failed to like the blog'

      notify(serverErrorMessage, 'error')
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)

        setBlogs(blogs.filter(b => b.id !== id))
        navigate('/')

        notify('Blog deleted')
      } catch (exception) {
        const serverErrorMessage = exception.response && exception.response.data && exception.response.data.error
          ? exception.response.data.error
          : 'Failed to delete the blog'

        notify(serverErrorMessage, 'error')
      }
    }
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <div>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography sx={{ ml: 4, flexGrow: 1 }} variant="h6" component="div">
            Blog App
          </Typography>
          <Button color="inherit" component={NavLink} to="/" sx={style} style={({ isActive }) => ({
            borderBottom: isActive ? '2px solid white' : 'none',
            fontWeight: isActive ? 'bold' : 'normal',
          })}>BLOGS</Button>
          {!user ? (
            <Button color="inherit" component={NavLink} to="/login" style={({ isActive }) => ({
              borderBottom: isActive ? '2px solid white' : 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })} sx={{ mr: 4, ...style }}>LOGIN</Button>
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/newBlog" sx={style} style={({ isActive }) => ({
                borderBottom: isActive ? '2px solid white' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}>NEW BLOG</Button>
              <Button onClick={handleLogout} color="inherit" sx={{ mr: 4, ...style }}>LOGOUT</Button>
            </>
          )
          }
        </Toolbar>
      </AppBar>
      <Notification message={errorMessage} className={className} />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={
            <Login
              onSubmit={handleLogin}
            />
          } />
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/blogs/:id" element={
            <BlogDetails
              blog={blog}
              likeBlog={handleLike}
              deleteBlog={handleDelete}
              user={user}
            />
          } />
          <Route path="/newBlog" element={<NewBlog onSubmit={handleNewBlog} />} />
        </Routes>
      )}

      {/* <Toggable ref={blogFormRef}>
          </Toggable> */}

    </div>
  )
}

export default App