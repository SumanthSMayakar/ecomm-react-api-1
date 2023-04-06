import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../../GlobalContext'
import { useNavigate } from 'react-router-dom'


function AdminDashboard() {
  const [product,setProduct] = useState(0)
  const [category,setCategory] = useState(0)
  const [user,setUser] = useState(0)
  const [orders,setOrders] = useState(0)

  const context = useContext(GlobalContext)
  const token = context.token

  const getProduct = async () => {
    const res = await axios.get(`/api/v1/product/all`)
            setProduct(res.data.length)
}

  const getCategory = async () => {
    const res = await axios.get(`/api/v1/category/all`)
            setCategory(res.data.length)
}

const getAllUsers = async () => {
  const res = await axios.get(`/api/v1/auth/all/users`, {
    headers: {
      Authorization: token
    }
  })
   setUser(res.data.users.length)
}

const getAllOrders = async () => {
  const res = await axios.get(`/api/v1/order/all`, {
    headers: {
      Authorization: token
    }
  })
   setOrders(res.data.orders.length)
}

  useEffect(() => {
     getProduct()
     getCategory()
     getAllUsers()
     getAllOrders()
  },[])

  return (
    <div className='container'>
        <div className="row mt-5 mb-3">
          <div className="col-md-3 text-center">
              <div className="card bg-success">
                <div className="card-body d-flex">
                    <h4 className="text-light">Users</h4>
                    <h4 className="text-light display-4 ms-5"> {user} </h4>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center">
              <div className="card bg-warning">
                <div className="card-body d-flex">
                  <h4 className="text-light">Products</h4>
                  <h4 className="text-light display-4 ms-5"> {product} </h4>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center">
              <div className="card bg-danger">
                <div className="card-body d-flex">
                  <h4 className="text-light">Category</h4>
                  <h4 className="text-light display-4 ms-5"> {category} </h4>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center">
              <div className="card bg-secondary">
                <div className="card-body d-flex">
                  <h4 className="text-light">Orders</h4>
                  <h4 className="text-light display-4 ms-5"> {orders} </h4>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard
