import axios from 'axios'

const token = localStorage.getItem("accessToken") || false;

const axiosIns = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: token
    }
})

const  CategoryApi = {
    getAll: () => {
        return axiosIns.request({
            url: '/api/v1/category/all',
            method: "GET"
        })
    },
    getSingle: (id) => {
        return axiosIns.request({
            url: `/api/v1/category/single/${id}`,
            method:'GET'
        })
    },
    create: (category, token) => {
        return axiosIns.request({
            url: '/api/v1/category/create',
            method: "POST",
            data: category,
            headers: {
                Authorization: token
            }
        })
    },
    update: (category,id,token) => {
        return axiosIns.request({
            url: `/api/v1/category/update/${id}`,
            method: 'PATCH',
            data: category,
            headers: {
                Authorization: token
            }
        })
    },
    delete: (id,token) => {
        return axiosIns.request({
            url: `/api/v1/category/delete/${id}`,
            method: "DELETE",
            headers: {
                Authorization: token
            }
        })
    }
}

export default CategoryApi