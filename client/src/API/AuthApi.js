import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function AuthApi() {
    // login status
const [isLogged, setIsLogged] = useState(false)
const token = localStorage.getItem("accessToken") || false;

// user
const [user,setUser] = useState(false)

// roles
const [isAdmin, setIsAdmin] = useState(false)
const [isUser,setIsUser] = useState(false)


//cart
const [cart,setCart] = useState([])
const [final,setFinal] = useState(0)

const [orders,setOrders] = useState([])

const initData = useCallback(() => {
     const getUser = async () => {
       
          // console.log('token =', token)
       if(token) {
          // get current user
          const res = await axios.get(`/api/v1/auth/currentUser`, {
            headers: {
              Authorization: token
            }
        });
           // get current orders
          const res1 = await axios.get(`/api/v1/order/current`, {
            headers: {
              Authorization: token
            }
        });
          setOrders(res1.data.orders)


        // console.log('current user =', res.data)
        setUser(res.data.user)
        setCart(res.data.user.cart)
        setIsLogged(true)
            if(res.data.user.role === "superadmin") {
              setIsAdmin(true)
            } else if (res.data.user.role === "user") {
              setIsUser(true)
            } 
        }
     }

     getUser()
},[isAdmin,isLogged,isUser,cart,user])


const addToCart = async (product) => {
     if(!isLogged)
      return toast.warning('Please login to continue buying?')

    console.log('cart =', product)
    // weather product added to cart or not
     const check = cart.every(item => {
         return item._id !== product._id
     });

     if(check) {
      toast.success('Product added to cart')
      setCart([...cart, { ...product }])

      // set same data to database 
      await axios.patch(`/api/v1/auth/addToCart`, { cart: [...cart, { ...product }]}, {
        headers: {
          Authorization: token
        }
    });
     } else {
      toast.warning('Product already in cart')
     }
}

const cancelOrder = async (id, orderStatus) => {
      await axios.patch(`/api/v1/order/cancel/${id}`, {orderStatus: !orderStatus}, {
        headers: {
          Authorization: token
        }
    }).then(res => {
      toast.success(res.data.msg)
       window.location.reload()
    }).catch(err => toast.error(err.response.data.msg));
}

  useEffect(() => {
      initData()
  },[initData])

  return {
     isLogged: [isLogged,setIsLogged],
     isAdmin: [isAdmin,setIsAdmin],
     isUser: [isUser,setIsUser],
     user: [user,setUser],
     cart: [cart,setCart],
     addToCart: addToCart,
     final: [final,setFinal],
     orders: [orders,setOrders],
     cancelOrder: cancelOrder
  }
}

export default AuthApi
