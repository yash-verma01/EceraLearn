import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import App from './App.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
