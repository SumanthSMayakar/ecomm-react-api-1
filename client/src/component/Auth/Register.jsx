import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })

    const navigate = useNavigate()

    const readValue = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log('new user =', user)
            await axios.post(`/api/v1/auth/register`, user)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/`)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-secondary">Register</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-6 offset-lg-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={user.password} onChange={readValue} className="form-control" required/>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Register" className="btn btn-outline-warning" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
