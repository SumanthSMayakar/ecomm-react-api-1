import React, { useState, useContext, useEffect } from 'react'
import Loading from '../../Util/Loading'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../GlobalContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateProduct(props) {
    const [product,setProduct] = useState({
        productCode: '',
        title: '',
        price: 0,
        brand: '',
        category: '',
        quantity: 1,
        unit: '',
        desc: '',
        stock: 0
    })
    const [image, setImage] = useState(false)
    const [category,setCategory] = useState([])

    const [loading,setLoading] = useState(false)
    const context = useContext(GlobalContext)
    const token = context.token

    const navigate = useNavigate()

    const uploadHandler = async (e) => {
        // to upload image
        e.preventDefault();
        try {
            const file = e.target.files[0];
            console.log('image data =', file);

            if(!file)
                return toast.error('image not exists.. choose image to upload.')
            
            if(file.size > 5 * 1024 * 1024)
                    return toast.warning('File size must be less than 5Mb')

                let formData = new FormData()
                formData.append('profile', file)
                setLoading(true)

                // post the file content to server
                const res = await axios.post(`/api/v1/image/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setImage(res.data.result)
                setLoading(false)
                toast.success(res.data.msg)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    // image delete
    const deleteHandler = async (e) => {
        try {
            if(window.confirm(`Are you sure to delete an image?`)) {
                setLoading(true)
               const res = await axios.post(`/api/v1/image/destroy`, { public_id: image.public_id }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setImage(false)
                setLoading(false)
                toast.success(res.data.msg)
            }
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const readValue = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]:value })
    }

    // read category
    const getCategory = async () => {
        const res = await axios.get(`/api/v1/category/all`)
            setCategory(res.data.categories)
    }

    useEffect(() => {
        getCategory()
    },[])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                ...product,
                image: {
                    public_id: image.public_id,
                    url: image.url
                }
            }

            const res = await axios.post(`/api/v1/product/create`, newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

            toast.success(res.data.msg)
            navigate(`/product`)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

  return (
    <div className='container'>
       <div className="row">
        <div className="col-md-12 text-center">
            <h5 className="text-success display-5">Create Product</h5>
        </div>
       </div>

       <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card border-0">
                    <div className="position-relative">
                        {
                            image ? (
                                <button onClick={deleteHandler} className="btn text-danger position-absolute top-0 start-100 btn-link translate-middle pt-0 ps-2"> 
                                    <i className="bi bi-trash"></i>
                                 </button>
                            ) : null 
                        }
                        {
                            image ? (
                                <img src={image ? image.url : ''} alt="no image" className="img-fluid rounded card-img-top" />
                            ): (
                                <span className="card-img-top position-relative start-50 text-success" style={{ fontSize: '5em'}}>
                                    <i className="bi bi-file-arrow-up"></i>
                                </span>
                            )
                        }
                        {
                            loading ? <Loading/> : null
                        }
                    </div>
                    <div className="card-body">
                        {
                            image ? null : <input type="file" name="profile" id="profile" onChange={uploadHandler} className="form-control" required  />
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="productCode">Product Code</label>
                                <input type="text" name="productCode" id="productCode" value={product.productCode} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" value={product.title} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="price">Price</label>
                                <input type="number" name="price" id="price" value={product.price} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" name="brand" id="brand" value={product.brand} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" value={product.category} onChange={readValue} className="form-select">
                                    <option value="null">Choose Category</option>
                                    <optgroup label='categories'>
                                        {
                                            category && category.map((item,index) => {
                                                return <option key={index}> {item.title} </option>
                                            })
                                        }
                                    </optgroup>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" name="quantity" id="quantity" value={product.quantity} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="unit">Unit</label>
                                <input type="text" name="unit" id="unit" value={product.unit} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="desc">Description</label>
                                <textarea name="desc" id="desc" cols="30" value={product.desc} onChange={readValue} rows="5" className="form-control" required></textarea>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" name="stock" value={product.stock} onChange={readValue} id="stock" className="form-control" required />
                            </div>
                            <div className="form-group mt-2 d-grid">
                                <input type="submit" value="Create Product" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default CreateProduct
