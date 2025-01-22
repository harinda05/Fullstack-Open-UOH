import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value 
    dispatch(addAnecdoteAction(content)) 
    event.target.anecdoteInput.value = '' 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          name="anecdoteInput" 
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm