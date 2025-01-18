import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  // set notification to null

  const setNotificationMessage = (msg, type) => {
    setNotification(msg)
    setNotificationType(type)
    setNotificationNull()
  }

  const setNotificationNull = () => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loginForm = () => {
    return <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
  }
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('username', username)
    console.log('password', password)    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage(`wrong user name and password`, 'failure')
  }}
  
console.log("user:", user)

const handleLogout = () => {
  window.localStorage.removeItem('loggedNoteappUser')
  setUser(null)
}

return (
  <div>
  <Notification message={notificationMsg} type={notificationType}/>
  {user == null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
        {user && <BlogForm user={user} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }

    
  </div>
)


}

export default App