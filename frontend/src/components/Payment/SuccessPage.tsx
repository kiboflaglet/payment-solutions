import React from 'react'
import { useSearchParams } from 'react-router-dom'
import type { OrderTypes } from '../Checkout/types'

const SuccessPage = () => {

  const [params] = useSearchParams()
  const sessionId = params.get("session_id")
  const [status, setStatus] = React.useState<keyof typeof OrderTypes>("pending")
  const getOrderStatus = () => {
    // will be continued after endpoint implemented (/orders/status?orderId=)
  }
  return (
    <div>
      Success page
    </div>
  )
}

export default SuccessPage
