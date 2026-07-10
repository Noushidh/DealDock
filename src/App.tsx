import { Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SellPage from "./pages/SellPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import PublicRoute from "./routes/PublicRoute"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  return (
    <>
     <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
      <Route path="/sell" element={<ProtectedRoute><SellPage/></ProtectedRoute>}/>
      <Route path="/product/:id" element={<ProtectedRoute><ProductDetailsPage/></ProtectedRoute>}/>
      <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>}/>
     </Routes>
    </>
  )
}

export default App
