import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> renders the blogs title and author', () => {
  const blog = {
    title: 'pluto',
    author: 'pippo',
    url: 'paperino',
    likes: 1
  }

  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByText(
    'pluto pippo'
  )
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText('paperino')
  expect(url).not.toBeInTheDocument()

  const likes = screen.queryByText('likes 1')
  expect(likes).not.toBeInTheDocument()
})

test('<Blog /> renders the blog url and likes are displayed when clicking show button', async () => {
  const blog = {
    title: 'pluto',
    author: 'pippo',
    url: 'paperino',
    likes: 1,
    user: {
      username: 'a'
    }
  }

  const usern = {
    username: 'a'
  }

  render(<Blog blog={blog} user={usern} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const titleAuthor = screen.getByText(
    'pluto pippo'
  )
  expect(titleAuthor).toBeDefined()

  const url = screen.getByText('paperino')
  expect(url).toBeDefined()

  const likes = screen.getByText('likes 1')
  expect(likes).toBeDefined()
})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'pluto',
    author: 'pippo',
    url: 'paperino',
    likes: 1,
    user: {
      username: 'a'
    }
  }

  const usern = {
    username: 'a'
  }

  const likeHandler = vi.fn()

  render(<Blog blog={blog} likeBlog={likeHandler} user={usern} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)

  expect(likeHandler.mock.calls).toHaveLength(2)
})