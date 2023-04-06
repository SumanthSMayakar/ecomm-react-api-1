import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../GlobalContext'

function Menu(props) {
    const context = useContext(GlobalContext)

    const [isLogged, setIsLogged] = context.useAuth.isLogged ? context.useAuth.isLogged : false;
    const [isUser, setIsUser] = context.useAuth.isUser ? context.useAuth.isUser : false;
    const [isAdmin, setIsAdmin] = context.useAuth.isAdmin ? context.useAuth.isAdmin : false;
    const [user, setUser] = context.useAuth.user ? context.useAuth.user : false;

      const navigate = useNavigate()


    const adminRoute = () => {
        return (
            <ul className="navbar-nav">
            <li className="nav-item dropdown">
               <NavLink to={`/`} className="nav-link dropdown-toggle"  data-bs-toggle="dropdown">
                       <i className="bi bi-person"></i> Account
               </NavLink>
               <ul className="dropdown-menu">
                   <li><NavLink to={`/admin/dashboard`} className="dropdown-item">Admin Dashboard</NavLink></li>
                   <li><NavLink to={`/category`} className="dropdown-item">Category</NavLink></li>
                   <li><NavLink to={`/product`} className="dropdown-item">Product</NavLink></li>
                   <li><NavLink to={`/orders`} className="dropdown-item">Orders</NavLink></li>
                   <li><NavLink to={`/`} onClick={logoutUser} className="dropdown-item">Logout</NavLink></li>
               </ul>
           </li>
       </ul>
        )
    }

    const userRoute = () => {
        return (
            <ul className="navbar-nav">
                 <li className="nav-item">
                    <NavLink to={`/product/cart`} className="nav-link position-relative"> <i className="bi bi-cart"></i> Cart
                        <span className="position-absolute top-20 start-100 translate-middle badge rounded-pill bg-dark">
                            { user ? user.cart.length : 0}
                        </span>
                    </NavLink>
                 </li>
                 <li className="nav-item dropdown">
                    <NavLink to={`/`} className="nav-link dropdown-toggle"  data-bs-toggle="dropdown">
                            <i className="bi bi-person"></i> Account
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink to={`/user/dashboard`} className="dropdown-item">User Dashboard</NavLink></li>
                        <li><NavLink to={`/user/orders`} className="dropdown-item">User Orders</NavLink></li>
                        <li><NavLink to={`/`} onClick={logoutUser} className="dropdown-item">Logout</NavLink></li>
                    </ul>
                </li>
            </ul>
        )
    }

    const commonRoute = () => {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={`/user/login`} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={`/user/register`} className="nav-link">Register</NavLink>
                </li>
                {/* <li className="list-item dropdown">
                    <NavLink to={`/`} className="nav-link dropdown-toggle"  data-bs-toggle="dropdown">
                            <i className="bi bi-person"></i>
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li><NavLink to={`/admin/login`} className="dropdown-item">Admin Login</NavLink></li>
                    </ul>
                </li> */}
            </ul>
        )
    }

    // logout 
    const logoutUser = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
          try {
            const res = await axios.get(`/api/v1/auth/logout`)
            localStorage.clear()
            toast.success(res.data.msg)
            setIsAdmin(false)
            setUser(false)
            setIsLogged(false)
            setIsUser(false)
            navigate(`/`)
            window.location.href = "/"
          } catch (err) {
                toast.error(err.response.data.msg)
          }
        } else {
            toast.warning('logout terminated')
        }
    }



  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-secondary'>
        <div className="container">
            <NavLink to={`/`} className="navbar-brand">E-Shop</NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="menu">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link">Home</NavLink>
                    </li>
                </ul>

                {
                    isLogged ? (
                        <React.Fragment>
                                {
                                    isAdmin ? adminRoute() : null
                                }
                                {
                                    isUser ? userRoute() : null
                                }
                        </React.Fragment>
                    ) : commonRoute()
                }

            </div>
        </div>
    </nav>
  )
}

export default Menu
