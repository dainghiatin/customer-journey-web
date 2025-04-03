import './App.css'
import './styles/body.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home.jsx'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import PaymentPage from './pages/Payment.jsx'
import AdditionalPaymentPage from './pages/AdditionalPayment.jsx'
import WithDrawthPaymentPage from './pages/WithDrawthPayment.jsx'


function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/additional-payment" element={<AdditionalPaymentPage />} />
        <Route path="/with-drawth-payment" element={<WithDrawthPaymentPage />} />
      </Routes>
    </>
  )
}

export default App
