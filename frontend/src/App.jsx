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
import Course from './pages/Course'
import Footer from './components/Footer'
import CourseDetail from './pages/CourseDetail'

const App = () => {
  const { auth ,user} = useContext(UserContext);
  return (
    <div>
      <Header auth={auth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/account" element={auth ? <Account user={user} /> : <LoginForm />} />
        <Route path="/login" element={auth ? <Home /> : <LoginForm />} />
        <Route path="/register" element={auth ? <Home /> : <RegisterForm />} />
        <Route path="/verify" element={auth ? <Home /> : <VerifyForm />} />
        <Route path="/course/:id" element={auth ? <CourseDetail /> : <LoginForm />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
