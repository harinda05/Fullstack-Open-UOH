import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

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
    return (
      <LoginForm 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
      />
    )
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
        <p/>
        <Togglable buttonLabel="create new blog">
          {user && <BlogForm user={user} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />}
        </Togglable>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog user={user} key={blog.id} blog={blog} setBlogs={setBlogs}/>
          ))}
      </div>
    }

    
  </div>
)


}

export default App