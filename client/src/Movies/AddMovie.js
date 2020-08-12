import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

const AddMovie = (props) => {
  const [movie, setMovie] = useState({ title: '', director: '', metascore: 0, stars: '' })
  const history = useHistory()

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.name === 'metascore' ? parseInt(e.target.value) : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newMovie = {
      ...movie,
      stars: movie.stars.split(',').map(m => m.trim())
    }
    Axios.post(`http://localhost:5001/api/movies/`, newMovie)
      .then(res => {
        debugger
        console.log([...props.movies, newMovie])
        props.setMovieList(res.data)
        history.push('/')
      })
  }
  return (
    <form style={{ display: 'flex', alignContent: 'space-around', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <label htmlFor='title'>
        Title
        <input label='title' type='text' name='title' value={movie.title} onChange={handleChange} />
      </label>
      <label htmlFor='director'>
        Director<input label='director' type='text' name='director' value={movie.director} onChange={handleChange} />
      </label>
      <label htmlFor='metascore'>
        Metascore
        <input label='metascore' type='text' name='metascore' value={movie.metascore} onChange={handleChange} />
      </label>
      <label htmlFor='stars'>
        Stars
        <input label='stars' type='text' name='stars' value={movie.stars} onChange={handleChange} />
      </label>
      <button onClick={handleSubmit}>Add</button>
    </form>
  )
}

export default AddMovie