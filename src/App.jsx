import './App.css'
import './styles/body.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home.jsx'
import RegisterPage from './pages/Register.jsx'
import LoginPage from './pages/Login.jsx'
import PaymentPage from './pages/Payment.jsx'
import AdditionalPaymentPage from './pages/AdditionalPayment.jsx'
import WithDrawthPaymentPage from './pages/WithDrawthPayment.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import NewPostPage from './pages/NewPostPage.jsx'
import NewGoodPostPage from './pages/NewGoodPostPage.jsx'
import ListOfGoodsPage from './pages/ListOfGoodsPage.jsx'
import FreelancerPage from './pages/FreelancerPage.jsx'
import DetailOfGoodsPage from './pages/DetailOfGoodsPage.jsx'
import NewFreelancerPostPage from './pages/NewFreelancerPostPage.jsx'
import AiLivePage from './pages/AiLivePage.jsx'
import NewAiLivePostPage from './pages/NewAiLivePostPage.jsx'
import AdminControlPage from './pages/AdminControlPage.jsx'
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
        <Route path="/change-password" element={<ChangePasswordPage />} />

        
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="/new-good-post" element={<NewGoodPostPage />} />
        <Route path="/list-of-goods" element={<ListOfGoodsPage />} />
        <Route path="/list-of-goods/:id" element={<DetailOfGoodsPage />} />

        <Route path="/freelancer" element={<FreelancerPage />} />
        <Route path="/new-freelancer-post" element={<NewFreelancerPostPage />} />
        <Route path="/detail-of-goods" element={<DetailOfGoodsPage />} />

        <Route path="/ai-live" element={<AiLivePage />} />
        <Route path="/new-ai-live-post" element={<NewAiLivePostPage />} />
        <Route path="/admin-control" element={<AdminControlPage />} />
      </Routes>
    </>
  )
}

export default App
