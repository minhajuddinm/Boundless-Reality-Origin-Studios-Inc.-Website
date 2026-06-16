import { Routes, Route } from 'react-router-dom'
import { MotionProvider } from './context/MotionContext'
import Nav from './components/Nav'
import Home from './pages/Home'

export default function App() {
  return (
    <MotionProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/founders" element={<Home />} />
      </Routes>
    </MotionProvider>
  )
}
