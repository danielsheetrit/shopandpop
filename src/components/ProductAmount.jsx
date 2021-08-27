import { useDispatch } from 'react-redux'

import { saveProduct, removeProduct } from '../store/actions/product.action'
import { productService } from '../services/product.service'

export function ProductAmount({ product }) {

    const dispatch = useDispatch()

    async function handleClick(bool, product) {
        if (bool) {
            const res = await dispatch(saveProduct(product))
            productService.addProduct(res.product)
        } else {
            const res = await dispatch(removeProduct(product.id))
            productService.removeProduct(res.productId)
        }
    }

    return (
        <div className="product-amount flex align-center">
            <button
                onClick={() => {
                    handleClick(false, product)
                }}
            >
                -
            </button>
            <span>{product.amount}</span>
            <button
                onClick={() => {
                    handleClick(true, product)
                }}
            >
                +
            </button>
        </div>
    )
}
