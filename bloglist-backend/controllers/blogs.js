const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ?? 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  const ret = await result.populate('user', { username: 1, name: 1 })
  response.status(201).json(ret)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'only the creator of the blog can delete it' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const isChangingContent =
    (body.title && body.title !== blog.title) ||
    (body.author && body.author !== blog.author) ||
    (body.url && body.url !== blog.url)

  if (isChangingContent) {
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({
        error: 'only the creator can edit title, author or url'
      })
    }
    blog.title = body.title ?? blog.title
    blog.author = body.author ?? blog.author
    blog.url = body.url ?? blog.url
  }

  blog.likes = body.likes ?? blog.likes

  const savedBlog = await blog.save()
  const result = await savedBlog.populate('user', { username: 1, name: 1 })
  response.json(result)
})

module.exports = blogRouter