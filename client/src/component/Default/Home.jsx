import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import ProductApi from '../../API/ProductApi'
import ProductItem from '../Products/ProductItem'

function Home() {
  const [products,setProducts] = useState([])

  const initProduct = useCallback(async () => {
      const res = await ProductApi.getAll()
        setProducts(res.data.products)
  },[])

  useEffect(() => {
    initProduct()
  },[initProduct])
  
  return (
    <div className="container">
        <div className="row">
            {
                products && products.map((item,index) => {
                  return (
                      <ProductItem key={index} {...item} />
                  )
                })
            }
        </div>
    </div>
  )
}

export default Home
