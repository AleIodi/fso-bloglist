import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('<NewBlog /> form calls the event handler with the correct data', async () => {
  const submitHandler = vi.fn()

  render(<NewBlog onSubmit={submitHandler} />)

  const user = userEvent.setup()
  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(title, 'testing a form title')
  await user.type(author, 'testing a form author')
  await user.type(url, 'testing a form url')
  await user.click(createButton)

  expect(submitHandler.mock.calls).toHaveLength(1)
  expect(submitHandler).toHaveBeenCalledWith({
    title: 'testing a form title',
    author: 'testing a form author',
    url: 'testing a form url'
  })
})