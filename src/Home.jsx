import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to='/video'><button>Video</button></Link>
        <Link to='/audio'><button>Audio</button></Link>
    </div>
  )
}

export default Home