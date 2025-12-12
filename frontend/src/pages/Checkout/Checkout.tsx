import axios from "axios"
import React, { useEffect } from "react"
import type { serviceResponse } from "../../common/backend/types"
import { type CheckoutRedirect, type Order, type OrderItem, type Product } from "./types"
import Button from "../../common/components/Button"

function Checkout() {

  const [products, setProducts] = React.useState<Product[]>([])
  const [localCart, setLocalCart] = React.useState<Omit<OrderItem, "id" | "orderId">[]>([])
  const addProductToCart = (product: Product) => {
    setLocalCart(prev =>
      prev.some(item => item.productId === product.id)
        ? prev.map(item => item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { productId: product.id, quantity: 1 }]
    )
  }
  const [error, setError] = React.useState<string | null>(null)

  const fetchProducts = () => {


    axios.get<serviceResponse<Product[]>>(import.meta.env.VITE_BACKEND_URL + "/products")
      .then(res => {
        setProducts(res.data.responseObject)
        setError(null)
      })
      .catch(res => {
        setError(res.data?.message)
      })
  }

  const [placeOrderLoading, setPlaceOrderLoading] = React.useState(false)
  const [placeOrderMessage, setPlaceOrderMessage] = React.useState<string | null>(null)

  const placeOrder = () => {
    setPlaceOrderLoading(true)
    axios.post<serviceResponse<Product | null>>(import.meta.env.VITE_BACKEND_URL + "/orders", {
      items: localCart
    })
      .then(res => {
        setPlaceOrderMessage(res.data.message)
        setError(null)
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? "Request failed")
      })
      .finally(() => {
        setPlaceOrderLoading(false)
      })
  }

  const [orders, setOrders] = React.useState<Order[]>([])

  const fetchOrders = () => {

    axios.get<serviceResponse<Order[]>>(import.meta.env.VITE_BACKEND_URL + "/orders")
      .then(res => {
        setOrders(res.data.responseObject)
      })
  }

  const [paymentLoading, setPaymentLoading] = React.useState(false)
  const [paymentResponseMessage, setPaymentResponseMessage] = React.useState<string | null>(null)
  const [paymentError, setPaymentError] = React.useState<string | null>(null)


  const payWithStripe = (orderId: number) => {
    setPaymentLoading(true)
    axios.post<serviceResponse<CheckoutRedirect | null>>(import.meta.env.VITE_BACKEND_URL + "/checkout", {
      orderId
    })
      .then(res => {
        setPaymentResponseMessage(res.data.message)
        setError(null)
        if (res.data.responseObject?.url) {
          window.location.href = res.data.responseObject.url
        }
      })
      .catch((err) => {
        setPaymentError(err.response?.data?.message ?? "Request failed")
      })
      .finally(() => {
        setPaymentLoading(false)
      })
  }


  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])






  return (
    <div className="flex gap-10 ">
      <div className="border-2 rounded-md  w-full p-2 items-start">
        <div className="flex gap-10 items-center align-middle">
          <h1 className="text-3xl">Add products to the cart</h1>

        </div>

        <div className="mt-5   gap-10 items-start">
          <div className="w-full">
            <h3>Products</h3>
            <table className="w-full text-start border border-collapse [&_th]:text-start ">
              <thead className="[&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">
                {products.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        onClick={() => addProductToCart(item)}
                      >
                        + Add to cart
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full">
            <h3>Local Cart</h3>
            <table className="w-full text-start border border-collapse [&_th]:text-start ">
              <thead className="[&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">
                <tr>
                  <th>Product id</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              {!!localCart.length ? (

                <tbody className="[&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">
                  {localCart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId}</td>
                      <td>{item.quantity}</td>

                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={2} className="p-2 text-center opacity-55">
                      Empty
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

        </div>
        <div className="mt-5 flex w-full justify-between items-center">
          <span>{placeOrderLoading ? "Order is creating..." : error ?? placeOrderMessage}</span>
          <Button
            disabled={!localCart.length}
            onClick={placeOrder}
          >Place the order 🛒</Button>

        </div>
      </div>
      <div className="border-2 rounded-md  w-full p-2 items-start">
        <div className="flex gap-10 items-center align-middle">
          <h1 className="text-3xl">My orders (From Database)</h1>

        </div>

        <div className="mt-5 items-start">
          <h3>Orders</h3>
          <table className="w-full text-start border border-collapse [&_th]:text-start ">
            <thead className="[&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">
              <tr>
                <th>ID</th>
                <th>status</th>
                <th>total</th>
                <th>date</th>
                <th>products</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">
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
                    <Button
                      onClick={() => payWithStripe(item.id)}
                    >Pay with Stripe</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <span>{paymentLoading ? "Payment processing..." : paymentError ?? paymentResponseMessage}</span>
      </div>
    </div>

  )
}

export default Checkout
