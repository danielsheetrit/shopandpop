import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

export const httpService = {
    get
}

export async function get(endpoint) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method: 'get',
        })
        return res.data
    } catch (e) {
        console.log('Http service: error in', e.message);
    }
}