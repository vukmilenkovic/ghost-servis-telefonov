import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import ServisPage from './pages/ServisPage'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/domov" element={<Navigate to="/" replace />} />
        <Route path="/servis" element={<ServisPage />} />
        <Route path="/storitve" element={<ServicesPage />} />
        <Route path="/cenik" element={<PricingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
