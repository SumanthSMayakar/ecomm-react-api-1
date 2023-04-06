import React, { useState, useEffect, useCallback } from 'react'
import CategoryApi from '../../../API/CategoryApi'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateCategory(props) {
  const [category,setCategory] = useState({
      title: '',
      desc: ''
  })
  const navigate = useNavigate()
  const params = useParams()

  const initCategory = useCallback(() => {
    const getData = async () => {
        const res = await CategoryApi.getSingle(params.id)
        setCategory(res.data.category)
    }
    getData()
  },[])

  useEffect(() => {
    initCategory()
  },[])

  const readValue = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]:value })
  } 

  const submitHandler = async (e) => {
      e.preventDefault();
    try {
        console.log('category =', category)
        await CategoryApi.update(category, params.id)
              .then(res => {
                toast.success(res.data.msg)
                  navigate('/category')
              }).catch(err => toast.error(err.response.data.msg))
    } catch (err) {
        toast.error(err.msg)
    }
  }

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Update Category</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                    <form autoComplete="off" onSubmit={submitHandler} >
                        <div className="form-group mt-2">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={category.title} onChange={readValue} id="title" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                          <textarea name="desc" id="desc" value={category.desc} onChange={readValue} cols="30" rows="5" className="form-control" required></textarea>
                        </div>
                        <div className="form-group mt-2">
                            <input type="submit" value="Update" className="btn btn-outline-success" />
                        </div>
                    </form>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default UpdateCategory
