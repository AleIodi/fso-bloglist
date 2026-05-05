import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    likeBlog(blog.id, newBlog)
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>

          <div>
            <p>likes {blog.likes}{user && (<button onClick={handleLike}>like</button>)}</p>
            <p>{blog.user?.name}</p>
            {user && user.username === blog.user.username && (
              <p><button onClick={() => deleteBlog(blog.id)}>delete</button></p>
            )}
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Blog