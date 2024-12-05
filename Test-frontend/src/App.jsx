import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import QuizPage from './pages/QuizPage'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'



const App = () => {
  return (
    <div>
      <ToastContainer />
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/Quiz-Page' element = {<QuizPage/>}/>
      <Route path='/Login' element = {<Login/>}/>
     
   

     </Routes>
     
    </div>
  )
}

export default App
