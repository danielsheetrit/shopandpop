import { productService } from '../../services/product.service'

export function getProducts(params) {
    return async dispatch => {
        try {
            const products = await productService.query(params)
            dispatch({ type: 'SET_PRODUCTS', products })
            return products
        } catch (err) {
            console.error('Products Action: err in getProducts', err)
        }
    }
}

export function saveProduct(product) {
    return async dispatch => {
        try {
            const res = dispatch({ type: 'ADD_PRODUCT', product: product })
            return res
        } catch (err) {
            console.error('Products Action: err in saveProducts', err)
        }
    }
}

export function removeProduct(productId) {
    return async dispatch => {
        try {
            const res = dispatch({ type: 'REMOVE_PRODUCT', productId })
            return res
        } catch (err) {
            console.error('Product Actions: err in removeProducts', err)
        }
    }
}

export function setUser(user) {
    return async dispatch => {
        try {
            const res = dispatch({ type: 'SET_USER', user })
            return res
        } catch (err) {
            console.error('Product Actions: err in Setting user', err)
        }
    }
}

export function eraseCart() {
    return async dispatch => {
        try {
            const res = dispatch({ type: 'ERASE_CART' })
            return res
        } catch (err) {
            console.error('Product Actions: err in erase_cart', err)
        }
    }
}
