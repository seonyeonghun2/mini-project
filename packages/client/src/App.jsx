import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './routes/Home'
import SignUp from './routes/SignUp'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App