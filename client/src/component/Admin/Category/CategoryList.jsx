import React, { useEffect, useState, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import CategoryApi from '../../../API/CategoryApi'
import { toast } from 'react-toastify'

function CategoryList() {
  const [category,setCategory] = useState([])
  const navigate = useNavigate()

//   const getCategory = async () => {
//     const res = await CategoryApi.getAll()
//       setCategory(res.data.categories)
// }

  const initCategory = useCallback( async () => {
    const res = await CategoryApi.getAll()
    setCategory(res.data.categories)
  }, [])

  useEffect(() => {
    initCategory()
  },[initCategory])

  // delete category
  const delCategory = async (id) => {
    if(window.confirm(`Are you sure to delete category?`)) {
        await CategoryApi.delete(id)
        .then(res => {
          toast.success(res.data.msg)
          window.location.reload()
            navigate('/category')
        }).catch(err => toast.error(err.response.data.msg))
    }
  }

  return (
    <div className='container'>
    <div className="row">
      <div className="col-md-12 text-center">
        <h3 className="display-3 text-success">Category</h3>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
          <div className="table table-responsive">
            <table className="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th colSpan={3}> <NavLink to={`/category/create`} className="btn btn-outline-secondary float-end">Create</NavLink> </th>
                    </tr>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                      {
                        category && category.map((item,index) => {
                          return (
                            <tr key={index}>
                                <td> {item.title} </td>
                                <td> {item.desc} </td>
                                <td>
                                    <NavLink to={`/category/update/${item._id}`} className="btn btn-outline-info">
                                        <i className="bi bi-pen"></i>
                                    </NavLink>
                                    <button onClick={() => delCategory(item._id)} className="btn btn-outline-danger float-end">
                                        <i className="bi bi-trash"></i>
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

export default CategoryList
