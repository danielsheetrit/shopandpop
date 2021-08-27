import Axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com/'

export const httpService = {
    get
}

export async function get(endpoint) {
    try {
        const res = await Axios.get(`${BASE_URL}/${endpoint}`)
        return res.data
    } catch(err) {
        console.log('Http service: error in', err);
    }
}