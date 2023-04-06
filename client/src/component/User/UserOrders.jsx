import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'

function UserOrders(props) {
 const context = useContext(GlobalContext)
    const [orders] = context.useAuth.orders
    const cancelOrder = context.useAuth.cancelOrder

    if(orders.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">No Orders, Keep Shopping</h3>
                    </div>
                </div>
            </div>
        )
    }

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


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Orders</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <div className="table table-responsive">
                    <table className="table table-bordered table-striped table-hovered text-center">
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
                                            <tr key={index} >
                                                <td> {item.orderCode} </td>
                                                <td> {item.user ? item.user.name : ''} </td>
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
                                                <td>
                                                    { item.address }
                                                </td>
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
                                                           <span> <i className="bi bi-bag-x-fill"></i> Cancel</span>
                                                        ): (
                                                            <span> <i className="bi bi-bag-check-fill"></i> Revoke</span>
                                                         )}
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

export default UserOrders
