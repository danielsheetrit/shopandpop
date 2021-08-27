import { storageService } from '../../services/storage.service'
import { KEY_DB } from '../../services/constances.service'

const initialState = {
    products: [],
    cart: storageService.loadFromStorage(KEY_DB) || [],
    currentUser: null
}

export function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.products }
        case 'ADD_PRODUCT':
            return { ...state, cart: [action.product, ...state.cart] }
        case 'REMOVE_PRODUCT':
            const idx = state.cart.findIndex(product => product.id === action.productId)
            return {
                ...state, cart: [
                    ...state.cart.slice(0, idx),
                    ...state.cart.slice(idx + 1)
                ]
            }
        case 'SET_USER':
            return { ...state, currentUser: action.user }
        case 'ERASE_CART':
            return { ...state, cart: [] }
        default:
            return state
    }
}