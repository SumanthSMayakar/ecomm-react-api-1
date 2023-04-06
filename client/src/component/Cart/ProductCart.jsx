import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

function ProductCart() {
    const context = useContext(GlobalContext)
    const [cart, setCart] = context.useAuth.cart
    const token = context.token
    const [total,setTotal] = useState(0)
    const [tax,setTax]= useState(0)
    const [dc,setDC] = useState(0)
    const [final,setFinal] = context.useAuth.final


    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev,item) => {
                return prev + (item.price * item.quantity)
            },0)
            setTotal(total)
            const dc = 50
            setDC(dc)
            setTax(Math.round(total * (12.5/100)))

            const final = total  + (total * (12.5/100) + dc)
            setFinal(final)
        }
        getTotal()
    },[cart,final]);

    // cart update logic
    const updateCart = async (cart) => {

        await axios.patch(`/api/v1/auth/addToCart`, { cart }, {
            headers: {
                Authorization: token
            }
        })
    }

    // cart increment
    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity += 1
            }
        });
        setCart([...cart])
        updateCart(cart)
    }

    //cart decrement
    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        updateCart(cart)
    }

    // remove item from cart
    const remove = (id) => {
        if(window.confirm(`Do you want to remove item from cart?`)) {
            cart.forEach((item,index) => {
                if(item._id === id) {
                    cart.splice(index,1)
                }
            });
            setCart([...cart])
            updateCart(cart)
        }
    }

    // cart empty
    if(cart.length === 0) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="display-3 text-secondary">Cart is Empty</h3>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Cart</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-8 col-lg-8 mt-2 mb-2">
                <div className="card">
                    <div className="card-header">
                        <h5 className="text-center text-success">Cart List</h5>
                    </div>
                    <div className="card-body">
                        <div className="table table-responsive">
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart && cart.map((item,index) => {
                                            const {_id, title, image, price, quantity} = item
                                            return (
                                                <tr className='text-center' key={index}>
                                                    <td> {title} </td>
                                                    <td>
                                                        <img src={image? image.url : ''} alt="no image" className="img-fluid" />
                                                    </td>
                                                    <td>
                                                        &#8377; {price}
                                                    </td>
                                                    <td>
                                                        <span className="text-danger" onClick={() => decrement(_id)} > 
                                                            <i className="bi bi-dash-circle"></i> </span>
                                                        <strong className="text-dark ms-2 me-2"> {quantity} </strong>
                                                        <span className="text-success" onClick={() => increment(_id)}> 
                                                            <i className="bi bi-plus-circle"></i> </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-danger" onClick={() => remove(_id)} >
                                                            <i className="bi bi-trash"></i>
                                                        </span>
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
            <div className="col-md-4 col-lg-4 mt-2 mb-2">
                <div className="card">
                    <div className="card-header">
                        <h5 className="text-success text-center">Cart Details</h5>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Sub Total</strong>
                                <span className="text-success float-end"> &#8377; {total} </span>
                            </li>
                            <li className="list-group-item">
                                <strong>tax</strong>
                                <span className="text-success float-end"> &#8377; {tax} </span>
                            </li>
                            <li className="list-group-item">
                                <strong>Delivery Charge</strong>
                                <span className="text-success float-end"> &#8377; {dc} </span>
                            </li>
                        </ul>

                        <ul className="list-group">
                            <li className="list-group-item bg-success text-white">
                                <strong>Final Total</strong>
                                <span className="text-warning float-end"> &#8377; {final} </span>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer d-grid">
                        <NavLink to={`/cart/checkout`} className="btn btn-secondary">Check Out</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCart
