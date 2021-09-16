import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

export const httpService = {
    get
}

export async function get(endpoint) {

    console.log('GOT:', endpoint)

    try {
        const res = await Axios({
            url: `${BASE_URL}${endpoint}`,
            method: 'get',
        })
        return res.data
    } catch (e) {
        console.log('Http service: error in', e.message);
    }
}