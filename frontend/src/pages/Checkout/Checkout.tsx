import axios from "axios"
import React, { useEffect } from "react"
import type { serviceResponse } from "../../common/backend/types"
import Button from "../../common/components/Button"
import { type CheckoutRedirect, type Order, type OrderItem, type Product } from "./types"
import { format } from "date-fns"

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
    if (!localCart.length) {
      setPlaceOrderMessage("Local cart is empty, please add product")
      return;
    }
    setPlaceOrderLoading(true)
    axios.post<serviceResponse<Product | null>>(import.meta.env.VITE_BACKEND_URL + "/orders", {
      items: localCart
    })
      .then(res => {
        setPlaceOrderMessage(res.data.message + ", ID: " + res.data.responseObject?.id)
        fetchOrders()
        setLocalCart([])
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
  const sortedOrders = React.useMemo(() => {
    return [...orders]
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map(item => ({
        ...item,
        createdAt: format(item.createdAt, "dd.MM.yyyy HH:mm")
      }))
  }, [orders])

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <div className=" bg-background-100 border-background-200 border rounded-xl p-4 flex flex-col gap-4 bg-background">
        {/* Header */}
        <h1 className="text-2xl font-semibold ">
          Add product to the cart
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          <div>
            <h3 className="font-medium mb-2 text-text/50">Products</h3>
            <div className="overflow-hidden">
              <table className="w-full text-start  [&_th]:text-start text-sm ">
                <thead className="[&>tr>th]:border-background-300  [&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:border-background-300  [&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">
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
          </div>
          <div>
            <h3 className=" mb-2 text-text/50">Local Cart</h3>
            <div className="  overflow-hidden">
              <table className="w-full text-start  [&_th]:text-start text-sm ">
                <thead className="[&>tr>th]:border-background-300  [&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">
                  <tr>
                    <th>Product id</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                {!!localCart.length ? (

                  <tbody className="[&>tr>td]:border-background-300  [&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">

                    {localCart.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>

                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="[&>tr>td]:border-background-300  [&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">


                    <tr>
                      <td colSpan={2} className="p-2 text-center opacity-55">
                        Empty (click on Add to Cart)
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center  justify-end  border-t border-background-300 pt-3">
          <span className="text-sm opacity-70 mr-5">
            {placeOrderLoading
              ? "Creating order..."
              : error ?? placeOrderMessage}
          </span>

          <Button
            onClick={placeOrder}
          >
            Place order
          </Button>
        </div>

      </div>

      <div className=" bg-background-100 border-background-200 border rounded-xl p-4 flex flex-col gap-4 bg-background">

        <div className="flex items-center gap-5 mb-4">
          <h1 className="text-2xl font-semibold ">
            Orders
          </h1>
          <div className=" text-sm opacity-70">
            {paymentLoading
              ? "Payment processing..."
              : paymentError ?? paymentResponseMessage}
          </div>
        </div>
        <div className="flex-1 overflow-auto   max-h-[60vh] ">
          <table className="w-full text-start  [&_th]:text-start text-sm ">
            <thead className="[&>tr>th]:border-background-300  [&>tr>th]:border [&>tr>th]:px-2 [&>tr>th]:py-1 ">

              <tr>
                <th>ID</th>
                <th>status</th>
                <th>total</th>
                <th>date</th>
                <th>products</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:border-background-300  [&>tr>td]:border [&>tr>td]:px-2 [&>tr>td]:py-1">

              {!!sortedOrders.length && sortedOrders.map(item => (
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
                    >Pay</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>

  )
}

export default Checkout
