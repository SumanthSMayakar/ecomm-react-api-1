import axios from 'axios'

const axiosIns = axios.create({
    baseURL: 'http://localhost:3000'
})

const  ProductApi = {
    getAll: () => {
        return axiosIns.request({
            url: '/api/v1/product/all',
            method: "GET"
        })
    },
    getSingle: (id) => {
        return axiosIns.request({
            url: `/api/v1/product/single/${id}`,
            method:'GET'
        })
    },
    create: (product) => {
        return axiosIns.request({
            url: '/api/v1/product/create',
            method: "POST",
            data: product
        })
    },
    update: (product,id) => {
        return axiosIns.request({
            url: `/api/v1/product/update/${id}`,
            method: 'PATCH',
            data: product
        })
    },
    delete: (id) => {
        return axiosIns.request({
            url: `/api/v1/product/delete/${id}`,
            method: "DELETE"
        })
    }
}

export default ProductApi