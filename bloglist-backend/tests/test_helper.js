const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: "Il mio secondo post",
		author: "Mario Verdi",
		url: "https://miosito.it/post2",
		likes: 20
	},
	{
		title: "Il mio primissimo post",
		author: "Mario Rossi",
		url: "https://miosito.it/post1",
		likes: 10
	}
]

const nonExistingId = async () => {
	const blog = new Blog({ title: 'willremovethissoon' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDb, usersInDb
}