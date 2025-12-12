import React from 'react'
import axios from 'axios'
import type { serviceResponse } from '../../common/backend/types'
import type { CheckoutRedirect, Order } from './types'

const MyOrders = () => {

  const [orders, setOrders] = React.useState<Order[]>([])

  const fetchOrders = () => {

    axios.get<serviceResponse<Order[]>>(import.meta.env.VITE_BACKEND_URL + "/orders")
      .then(res => {
        setOrders(res.data.responseObject)
      })
  }
  const [paymentLoading, setPaymentLoading] = React.useState(false)
  const [apiMessage, setApiMessage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const payWithStripe = (orderId: number) => {
    setPaymentLoading(true)
    axios.post<serviceResponse<CheckoutRedirect | null>>(import.meta.env.VITE_BACKEND_URL + "/checkout", {
      orderId
    })
      .then(res => {
        setApiMessage(res.data.message)
        setError(null)
        if (res.data.responseObject?.url) {
          window.location.href = res.data.responseObject.url
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? "Request failed")
      })
      .finally(() => {
        setPaymentLoading(false)
      })
  }

  React.useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <h2>My Orders</h2>
      {paymentLoading && (<span>Payment loading...</span>)}
      {error && (<span>{error}</span>)}
      {apiMessage && (<span>{apiMessage}</span>)}


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>status</th>
            <th>total</th>
            <th>date</th>
            <th>products</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {!!orders.length && orders.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.status}</td>
              <td>{item.total}</td>
              <td>{item.createdAt}</td>
              <td>
                <ul>
                  {item.OrderItems?.map(item => (
                    <li key={item.id}>Product id: {item.productId}, quantity: {item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  onClick={() => payWithStripe(item.id)}
                >Pay with Stripe</button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders
