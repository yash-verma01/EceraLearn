import React from 'react'
import { Route, Routes } from 'react-router-dom'  
import Home from './pages/Home'
import Header from './components/Header'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import VerifyForm from './auth/VerifyForm'
import About from './pages/About'
import Account from './pages/Account'
import { useContext } from 'react'
import UserContext from './context/UserContext'

const App = () => {

 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify" element={<VerifyForm />} />
      </Routes>
    </div>
  )
}

export default App
