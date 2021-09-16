import { httpService } from './http.service'
import { storageService } from './storage.service'
import { KEY_DB } from './constances.service'

export const cartService = {
    query,
    addProduct,
    removeProduct,
    clearStorage
}

async function query(params) {
    try {
        const res = await httpService.get(params)
        return res
    } catch (err) {
        console.log('product service: issues with get requset', err)
    }
}

async function addProduct(product) {
    let cart = await storageService.loadFromStorage(KEY_DB) || []
    cart.unshift(product)
    storageService.saveToStorage(KEY_DB, cart)
}

async function removeProduct(productId) {
    let cart = await storageService.loadFromStorage(KEY_DB) || []
    if (cart.length > 0) {
        const product = cart.find(prdct => prdct.id === productId)
        const productIdx = cart.findIndex(prdct => prdct === product);
        cart.splice(productIdx, 1)
        storageService.saveToStorage(KEY_DB, cart)
    }
}

async function clearStorage() {
    storageService.clearAllStorage(KEY_DB)
}