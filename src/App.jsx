import './App.css'
import './styles/body.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home.jsx'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'


function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
