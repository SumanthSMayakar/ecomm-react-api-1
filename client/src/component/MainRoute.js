import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalContext } from '../GlobalContext'

import AdminLogin from './Admin/Auth/AdminLogin'
import CategoryList from './Admin/Category/CategoryList'
import CreateCategory from './Admin/Category/CreateCategory'
import UpdateCategory from './Admin/Category/UpdateCategory'
import OrderList from './Admin/Orders/OrderList'
import CreateProduct from './Admin/Product/CreateProduct'
import ProductList from './Admin/Product/ProductList'
import UpdateProduct from './Admin/Product/UpdateProduct'
import AdminDashboard from './Admin/Screens/AdminDashboard'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ProtectedRoute from './AuthGuard/ProtectedRoute'
import Checkout from './Cart/Checkout'
import ProductCart from './Cart/ProductCart'
import Home from './Default/Home'
import Pnf from './Default/Pnf'
import Menu from './Header/Menu'
import UserDashboard from './User/UserDashboard'
import UserOrders from './User/UserOrders'



function MainRoute() {
  const context = useContext(GlobalContext)

  const [isLogged] = context.useAuth.isLogged ? context.useAuth.isLogged : false;
  const [isUser] = context.useAuth.isUser ? context.useAuth.isUser : false;
  const [isAdmin] = context.useAuth.isAdmin ? context.useAuth.isAdmin : false;
  // const [user] = context.useAuth.user ? context.useAuth.user : false;

  return (
    <Router>
            <Menu/>
            <ToastContainer autoClose={3000} position={'top-right'} theme={'light'} />
            <Routes>
                <Route path={`/`} element={<Home/>} />
                <Route path={`/user/login`} element={<Login/>} />
                
                {/* <Route path={`/admin/login`} element={<AdminLogin/>} /> */}
                <Route path={`/user/register`} element={<Register/>} />
                {
                    isLogged && isUser ? (
                      <Route element={<ProtectedRoute/>} >
                            <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                            <Route path={`/product/cart`} element={<ProductCart/>} />
                            <Route path={`/cart/checkout`} element={<Checkout/>} />
                            <Route path={`/user/orders`} element={<UserOrders/>} />
                      </Route>
                    ) : null
                }
                {
                    isLogged && isAdmin ? (
                      <Route element={<ProtectedRoute/>}>
                            <Route path={`/admin/dashboard`} element={<AdminDashboard/>} />
                            <Route path={`/category`} element={<CategoryList/>} />
                            <Route path={`/product`} element={<ProductList/>} />
                            <Route path={`/orders`} element={<OrderList/>} />
                            <Route path={`/category/create`} element={<CreateCategory/>} />
                            <Route path={`/product/create`} element={<CreateProduct/>} />
                            <Route path={`/category/update/:id`} element={<UpdateCategory/>} />
                            <Route path={`/product/update/:id`} element={<UpdateProduct/>} />
                      </Route>
                    ) : null
                }
               
                <Route path={`/*`} element={<Pnf/>} />
            </Routes>
    </Router>
  )
}

export default MainRoute
