import { Route, Routes } from "react-router-dom"
import Checkout from "./components/Checkout/Checkout"
import SuccessPage from "./components/Payment/SuccessPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Checkout />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
