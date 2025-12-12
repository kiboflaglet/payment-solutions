import React from 'react'
import type { Order } from '../types'
import axios from 'axios'
import type { serviceResponse } from '../common/backend/types'

const MyOrders = () => {

  const [orders, setOrders] = React.useState<Order[]>([])

  const fetchOrders = () => {

    axios.get<serviceResponse<Order[]>>(import.meta.env.VITE_BACKEND_URL + "/orders")
      .then(res => {
        setOrders(res.data.responseObject)
      })
  }

  React.useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>status</th>
            <th>total</th>
            <th>date</th>
            <th>products</th>
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
                  { item.OrderItems?.map(item => (
                    <li key={item.id}>Product id: {item.productId}, quantity: {item.quantity}</li>
                  ))}
                </ul>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyOrders
