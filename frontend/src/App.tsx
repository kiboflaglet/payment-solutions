import { Route, Routes } from "react-router-dom"
import Index from "./pages/Checkout/Index"
import SuccessPage from "./pages/Payment/SuccessPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
