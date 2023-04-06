import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

// reusable radio input
const RadioInput = (props) => {
    const {label, value, checked, setter } = props;
    return (
        <div className="form-check form-check-inline">
            <input type="radio" value={value} checked={checked == value} onChange={() => setter(value)}  className="form-check-input" required/>
            <label  className="form-check-label"> {label} </label>
        </div>
    )
}

function Checkout() {
    const [address,setAddress] = useState('')
    const [pay,setPay] = useState('')
    const context = useContext(GlobalContext)
    const [cart, setCart] = context.useAuth.cart
    const token = context.token
    const [user] = context.useAuth.user

    const navigate = useNavigate()

    const updateCart = async (cart) => {
        await axios.patch(`/api/v1/auth/addToCart`, cart , {
            headers: {
                Authorization: token
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = {
                user,
                cart,
                address,
                payMode: pay
            }

              await axios.post(`/api/v1/order/place`, data, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => {
                    toast.success(res.data.msg)
                    setCart([])
                    updateCart({cart: []})
                    navigate(`/user/dashboard`)
                }).catch(err => toast.error(err.response.data.msg))
               
        } catch (err) {
            console.log(err.msg)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h5 className="display-5 text-success text-uppercase">Check Out</h5>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="card mt-2">
                    <div className="card-header bg-dark">
                        <h5 className="text-light">1. Delivery Address</h5>
                    </div>
                    <div className="card-body">
                        <div className="form-group mt-2 mb-2">
                            <label htmlFor="address">Address</label>
                            <textarea name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} cols="30" rows="5" className="form-control" required></textarea>
                        </div>
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-header bg-dark">
                        <h5 className="text-light">2. Payment Options</h5>
                    </div>
                    <div className="card-body">
                        <div className="form-group mt-2 mb-2">
                            <RadioInput label="Cash on Delivery" value="cod" setter={setPay} checked={pay} />
                            <RadioInput label="Wallets" value="wallet" setter={setPay} checked={pay} />
                            <RadioInput label="Net Banking" value="netbanking" setter={setPay} checked={pay} />
                            <RadioInput label="UPI" value="upi" setter={setPay} checked={pay} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="card mt-2">
                    <div className="card-header bg-dark">
                        <h5 className="text-light">3. Cart Summary</h5>
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
                                                                <strong className="text-dark ms-2 me-2"> {quantity} </strong>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                        </div>
                    </div>
                    <div className="card-footer d-grid">
                         <button onClick={submitHandler} className="btn btn-outline-success">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
