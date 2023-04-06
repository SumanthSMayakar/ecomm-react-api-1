import React, {useContext, useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../GlobalContext'

function OrderList() {
  const [orders,setOrders] = useState([])
  const context = useContext(GlobalContext)
  const cancelOrder = context.useAuth.cancelOrder

  const token = context.token

  const navigate = useNavigate()

  const getOrders = async () => {
     const res = await axios.get(`/api/v1/order/all`, {
          headers: {
            Authorization: token
          }
      })
      setOrders(res.data.orders)
  }

  const initOrder = useCallback(() => {
      getOrders()
  },[getOrders])

  useEffect(() => {
    initOrder()
  },[initOrder])

    // cancel order
  const cancelHandler = (id, orderStatus) => {
    if(orderStatus == true) {
        if(window.confirm(`Are you sure to cancel order?`)) {
            cancelOrder(id, orderStatus)
        }
    } else {
        if(window.confirm(`Hi, Do you wish to Revoke your order?`)) {
            cancelOrder(id, orderStatus)
        }
    }
}

// delete order
const deleteHandler = async (id) => {
      try {
          if(window.confirm(`Are you sure to delete order?`)) {
            const res = await axios.delete(`/api/v1/order/delete/${id}`, {
              headers: {
                Authorization: token
              }
          })
          toast.success(res.data.msg)
        }
      } catch (err) {
        toast.error(err.response.data.msg)
      }
  }



  
  if(orders.length === 0) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-secondary">No Orders</h3>
                </div>
            </div>
        </div>
    )
}

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h5 className="display-5 text-success">All Orders</h5>
          </div>
        </div>
       <div className="row">
        <div className="col-md-12">
            <div className="table table-responsive">
                <table className="table table-bordered table-striped table-hovered">
                    <thead>
                        <tr>
                                <th>Ordercode</th>
                                <th>User</th>
                                <th>Cart</th>
                                <th>Address</th>
                                <th>Order Status</th>
                                <th>Pay Mode</th>
                                <th>Order Date</th>
                                <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                          orders && orders.map((item,index) => {
                            return (
                              <tr key={index} className="text-center">
                                  <td> {item.orderCode} </td>
                                  <td> {item.user ? item.user.name : null } </td>
                                  <td>
                                      <details>
                                                            <summary className='text-danger'>Cart</summary>
                                                            <ul className="list-group">
                                                                {
                                                                    item.cart ? item.cart.map((item,index) => {
                                                                        return (
                                                                            <li className="list-group-item" key={index}>
                                                                                <div className="">
                                                                                    <img src={item.image? item.image.url : '' } alt="" className="img-fluid" />
                                                                                    <h6 className="text-success"> {item.title} </h6>
                                                                                    <p className="text-warning"> {item.price} </p>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    }) : null
                                                                }
                                                            </ul>
                                                    </details>
                                  </td>
                                  <td> { item.address } </td>
                                  <td  className={item.orderStatus ? "bg-success text-light": "bg-danger text-light"}>
                                                    { item.orderStatus ? 
                                                        (
                                                            <span>Order Accepted </span>
                                                        )
                                                    : (
                                                        <span>Order Cancelled <em className="text-warning"> {new Date(item.updatedAt).toLocaleString()} </em> </span>
                                                    )}
                                    </td>
                                    <td>
                                                    { item.payMode }
                                                </td>
                                                <td>
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </td>
                                                <td>
                                                    <button onClick={()=> cancelHandler(item._id, item.orderStatus)} className={
                                                        item.orderStatus ? "btn btn-outline-danger": "btn btn-outline-success"
                                                    }>
                                                        { item.orderStatus ? (
                                                           <span title='cancel'> <i className="bi bi-bag-x-fill"></i></span>
                                                        ): (
                                                            <span title='revoke'> <i className="bi bi-bag-check-fill"></i></span>
                                                         )}
                                                    </button>
                                                    <button onClick={(e) => deleteHandler(item._id) } className="btn btn-outline-danger float-end">
                                                          <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                              </tr>
                            )
                          })
                      }
                    </tbody>
                </table>
            </div>
        </div>
       </div>
    </div>
  )
}

export default OrderList
