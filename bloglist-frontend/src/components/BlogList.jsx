import { NavLink } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {
          blogs.sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <li key={blog.id}><NavLink to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</NavLink></li>
            )
        }
      </ul>
    </div>
  )
}

export default BlogList