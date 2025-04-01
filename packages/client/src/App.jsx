import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './routes/Home'
import About from './routes/About'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Board from './routes/Board'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='about' element={<About />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='board' element={<Board />} />
        </Route>
      </Routes>
    </>
  )
}

export default App