import axios from "axios"
import React from "react"
import type { serviceResponse } from "../../common/backend/types"

const Header = () => {
  const [status, setStatus] = React.useState<boolean | null>(null)

React.useEffect(() => {
  const check = () =>
    axios
      .get<serviceResponse<null>>(import.meta.env.VITE_BACKEND_URL + "/health")
      .then(res => setStatus(res.data.success))
      .catch(() => setStatus(false))

  check()
  const id = setInterval(check, 5000)
  return () => clearInterval(id)
}, [])


  return (
    <>
      <h1 className="text-5xl">Stripe payment (Testing)</h1>
      <h1 className="text-3xl text-text/50">
        Server status: {status === null ? "checking..." : status ? "up" : "down"}
      </h1>
    </>
  )
}

export default Header
