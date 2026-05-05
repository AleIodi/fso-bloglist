const _ = require('lodash')

const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0)
		return null;
	const favourite = blogs.reduce((prev, current) => {
		return prev.likes > current.likes ? prev : current
	})

	return {
		title: favourite.title,
		author: favourite.author,
		url: favourite.url,
		likes: favourite.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return null

	return _(blogs)
		.countBy('author')
		.map((count, author) => ({ author: author, blogs: count }))
		.maxBy('blogs')
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return null

	return _(blogs)
		.groupBy('author')
		.map((authorBlogs, author) => ({
			author: author,
			likes: _.sumBy(authorBlogs, 'likes')
		}))
		.maxBy('likes')
}
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}