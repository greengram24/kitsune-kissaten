import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"
import AboutPage from "./pages/AboutPage"
import ReviewsPage from "./pages/ReviewsPage"
import ContactPage from "./pages/ContactPage"
import AdminPage from "./pages/AdminPage"
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        {/* Gallery removed */}
        <Route path="/reviews" element={<ReviewsPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App