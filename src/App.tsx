import { Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SellPage from "./pages/SellPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <>
     <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/sell" element={<SellPage/>}/>
      <Route path="/product/:id" element={<ProductDetailsPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
     </Routes>
    </>
  )
}

export default App
