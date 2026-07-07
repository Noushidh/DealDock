import { Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SellPage from "./pages/SellPage"

function App() {
  return (
    <>
     <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/sell" element={<SellPage/>}/>
     </Routes>
    </>
  )
}

export default App
