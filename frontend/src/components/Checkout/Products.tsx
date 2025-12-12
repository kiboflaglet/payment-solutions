import axios from "axios"
import React, { useEffect } from "react"
import type { serviceResponse } from "../../common/backend/types"
import { type OrderItem, type Product } from "./types"

function Products() {

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

  const [apiMessage, setApiMessage] = React.useState<string | null>(null)

  const placeOrder = () => {
    axios.post<serviceResponse<Product | null>>(import.meta.env.VITE_BACKEND_URL + "/orders", {
      items: localCart
    })
      .then(res => {
        setApiMessage(res.data.message)
        setError(null)
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? "Request failed")
      })
  }

  



  useEffect(() => {
    fetchProducts()
  }, [])



  return (
    <>
      <h2>Checkout page</h2>
      <button onClick={placeOrder}>Place order</button>
      {error && (<span>{error}</span>)}
      {apiMessage && (<span>{apiMessage}</span>)}


      <div className="checkout-container">
        <div>
          <h3>Products</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => addProductToCart(item)}
                    >Add to cart</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
        <div>
          <h3>Local Cart</h3>


          <table>
            <thead>
              <tr>
                <th>Product id</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {localCart.map((item, index) => (
                <tr key={index}>
                  <td>{item.productId}</td>
                  <td>{item.quantity}</td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

    </>

  )
}

export default Products
