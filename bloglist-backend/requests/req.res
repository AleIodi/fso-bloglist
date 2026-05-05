GET http://localhost:3003/api/users

### Create a blog for user 'root'

POST http://localhost:3003/api/blogs
Content-Type: application/json

{
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7,
    "userId": "69ce32cdac3d09d9f1981962"
}

### Create another blog for user 'root'

POST http://localhost:3003/api/blogs
Content-Type: application/json

{
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5,
    "userId": "69ce32cdac3d09d9f1981962"
}

### Create a blog for user 'mluukkai'

POST http://localhost:3003/api/blogs
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2OWNlOGY5YjIyZTI3OWZmNGU4YTU4ZjAiLCJpYXQiOjE3NzUyMDg0MTB9.Yo3TTOqIzCDpJN4hGskfM9n5xR54aN12gVMsqrrjg9U

{
    "title": "Token Test",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12,
    "userId": "69ce8f9b22e279ff4e8a58f0"
}

### Login with a user

POST http://localhost:3003/api/login
Content-Type: application/json

{
    "username": "mluukkai",
    "password": "salainen"
}