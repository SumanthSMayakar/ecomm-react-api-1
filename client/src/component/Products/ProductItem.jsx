import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'

function ProductItem(props) {
    const context = useContext(GlobalContext)
    const  [user] = context.useAuth.user
    const addToCart = context.useAuth.addToCart

    const { productCode, title, price, desc, brand, category, image, discount, isActive} = props
  return (
    <div className="col-lg-3 col-md-3 col-sm-6 mt-2 mb-2">
        <div className="card">
            <img src={ image ? image.url : ''} alt="no image" className="card-img-top" />
            <div className="card-body">
                 <h6 className="text-success text-center text-uppercase"> { title } </h6>

                 <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Price</strong>
                        <span className="float-end text-success"> &#8377; { price } </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Brand</strong>
                        <span className="float-end text-success"> {brand} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Description</strong>
                        <span className="float-end text-success"> {desc} </span>
                    </li>
                  
                 </ul>
            </div>

            <div className="card-footer">
               {
                    user.role === 'superadmin' ? null : (
                        <button onClick={() => addToCart(props)} className="btn btn-outline-success float-end" title="Add to Cart">
                            <i className="bi bi-cart-plus"></i> 
                        </button>
                    )
               }
            </div>
        </div>
    </div>
  )
}

export default ProductItem
