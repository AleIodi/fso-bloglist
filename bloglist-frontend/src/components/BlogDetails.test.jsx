import { render, screen } from '@testing-library/react'
import BlogDetails from './BlogDetails'
import { MemoryRouter } from 'react-router-dom'

const blog = {
  title: 'pluto',
  author: 'pippo',
  url: 'paperino',
  likes: 1,
  user: { username: 'creator', name: 'Creator User' }
}

test('<BlogDetails /> renders only the blogs informations to unauthenticated user', () => {
  render(
    <MemoryRouter>
      <BlogDetails blog={blog} />
    </MemoryRouter>
  )

  expect(screen.getByText(/pluto/)).toBeInTheDocument()
  expect(screen.getByText(/paperino/)).toBeInTheDocument()
  expect(screen.getByText(/likes/)).toBeInTheDocument()

  expect(screen.queryByText('like')).not.toBeInTheDocument()
  expect(screen.queryByText('delete')).not.toBeInTheDocument()
})

test('renders like button but not delete for non-creator authenticated user', () => {
  const otherUser = { username: 'other', name: 'Other User' }

  render(
    <MemoryRouter>
      <BlogDetails blog={blog} user={otherUser} likeBlog={vi.fn()} deleteBlog={vi.fn()} />
    </MemoryRouter>
  )

  expect(screen.getByText('like')).toBeInTheDocument()
  expect(screen.queryByText('delete')).not.toBeInTheDocument()
})

test('renders both like and delete buttons for the blog creator', () => {
  const creator = { username: 'creator', name: 'Creator User' }

  render(
    <MemoryRouter>
      <BlogDetails blog={blog} user={creator} likeBlog={vi.fn()} deleteBlog={vi.fn()} />
    </MemoryRouter>
  )

  expect(screen.getByText('like')).toBeInTheDocument()
  expect(screen.getByText('delete')).toBeInTheDocument()
})