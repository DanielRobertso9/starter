require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {REACT_APP_PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/post')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/posts')

const app = express()

User.hasMany(Post)
Post.belongsTo(User)

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts:id', isAuthenticated, editPost)
app.delete('/posts:id', isAuthenticated, deletePost)

// app.listen(PORT, () => console.log(`Listening to port ${PORT}`))

sequelize.sync({force: true})
.then(() => {
    app.listen(REACT_APP_PORT, () => console.log(`DB sync successful & Listening to port ${REACT_APP_PORT}`))
})
.catch(err => console.log(err))