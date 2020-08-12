import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios'

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState({})
  const params = useParams()
  const history = useHistory()
  useEffect(() => {
    Axios.get(`http://localhost:5001/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        setMovie(res.data)
      })
  }, [])

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    Axios.put(`http://localhost:5001/api/movies/${params.id}`, movie)
      .then(res => {
        console.log(res)
        props.setMovieList(props.movies.map(m => m.id === params.id ? movie : m))
        history.goBack()
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
      <button onClick={handleSubmit}>Update</button>
    </form>
  )
}

export default UpdateMovie