import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'

function UserDashboard() {
  const context = useContext(GlobalContext)
  const [orders,setOrders] = context.useAuth.orders
  const [cart,setCart] = context.useAuth.cart
  const [user] = context.useAuth.user

  const [cancelled,setCancelled] = useState(0)
  const [accepted,setAccepted] = useState(0)


  useEffect(() => {
       let accept = orders.filter((item) => item.orderStatus == true)
       let cancel= orders.filter((item) => item.orderStatus == false)
      setCancelled(cancel.length)
      setAccepted(accept.length)
      // console.log('accept =', accept)
  },[])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h5 className="display-5">
               <span className="text-danger text-danger">Hi {user? user.name : null },</span>
          </h5>
          <h5 className="text-success display-5">Welcome to Dashboard</h5>
        </div>
      </div>
        <div className="row">
          <div className="col-md-3 text-center mt-2 mb-2">
              <div className="card bg-primary">
                <div className="card-body">
                    <h4 className="display-4 text-light"> {orders?orders.length : 0} </h4>
                      <h6 className="text-light display-6">Orders</h6>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center mt-2 mb-2">
              <div className="card bg-success">
                <div className="card-body">
                    <h4 className="display-4 text-light"> {accepted? accepted : 0} </h4>
                      <h6 className="text-light display-6">Accepted</h6>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center mt-2 mb-2">
              <div className="card bg-danger">
                <div className="card-body">
                    <h4 className="display-4 text-light"> {cancelled ? cancelled : 0} </h4>
                      <h6 className="text-light display-6">Cancelled</h6>
                </div>
              </div>
          </div>
          <div className="col-md-3 text-center mt-2 mb-2">
              <div className="card bg-warning">
                <div className="card-body">
                    <h4 className="display-4 text-light"> {cart?cart.length : 0} </h4>
                      <h6 className="text-light display-6">Cart</h6>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default UserDashboard
