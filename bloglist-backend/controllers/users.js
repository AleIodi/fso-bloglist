const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (password.length < 3)
		return response.status(400).json({ error: "Password Minimum length 3 characters" })

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, responnse) => {
	const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, })
	responnse.json(users)
})

module.exports = usersRouter