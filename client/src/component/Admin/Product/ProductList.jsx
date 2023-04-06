import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams, useNaivgate } from 'react-router-dom'
import { GlobalContext } from '../../../GlobalContext'

function ProductList(props) {
    const [product,setProduct] = useState([])

    const params = useParams();
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const token = context.token
    
    const getProduct = async () => {
        const res = await axios.get(`/api/v1/product/all`)
                setProduct(res.data.products)
    }

    const deleteImage = async (image) => {
        try {
            if(window.confirm(`Are you sure to delete an image?`)) {
                
               const res = await axios.post(`/api/v1/image/destroy`, { public_id: image.public_id }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                toast.success(res.data.msg)
                return true
            }
        } catch (err) {
            toast.error(err.response.data.msg)
            return false
        }
    }

    const deleteProduct = async (id) => {
        await axios.delete(`/api/v1/product/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => {
                toast.success(res.data.msg)
                window.location.reload();
            }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        getProduct()
    },[])

    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete product?`)) {
               await axios.get(`/api/v1/product/single/${id}`)
                    .then(res => {
                       const del =  deleteImage(res.data.product.image)
                        if(del) {
                            deleteProduct(id)
                        }
                    }).catch(err => toast.error(err.response.data.msg))
        }
    }

  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-12">
               <div className="table table-responsive">
                    <table className="table table-border table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th colSpan={8}>
                                    <h6 className="text-success display-6">Product List</h6>
                                    <NavLink to={`/product/create`} className="btn btn-outline-success float-end">Create Product</NavLink>
                                </th>
                            </tr>
                            <tr className='bg-secondary text-light'>
                                <th>PCode</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Quantity</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product && product.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td> { item.productCode } </td>
                                            <td> { item.title } </td>
                                            <td> 
                                                <img src={item.image ? item.image.url : ''} alt="no image" className="rounded img-thumbnail" style={{ width: '100%'}} />    
                                            </td>
                                            <td> 
                                                <strong>&#8377; { item.price }</strong>    
                                            </td>
                                            <td> { item.brand } </td>
                                            <td> { item.quantity } </td>
                                            <td> { item.stock } </td>
                                            <td>
                                               <NavLink to={`/product/update/${item._id}`} style={{ cursor: 'pointer'}} >
                                                    <i className="bi bi-pencil-square text-info"></i>
                                               </NavLink>
                                               <span style={{ cursor: 'pointer'}} onClick={() => deleteHandler(item._id)} >
                                                    <i className="bi bi-trash float-end text-danger"></i>
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
  )
}

export default ProductList
