import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { saveProduct } from '../store/actions/product.action'

import { cartService } from '../services/cart.service'

import { useSnackbar } from 'notistack'

export function ProductPreview({ product }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.productModule.currentUser)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function handleAddition(product) {

        if (!user) handleSnackbar('You have to log in first', 'error')

        const res = await dispatch(saveProduct(product))
        cartService.addProduct(res.product)
    }

    function handleSnackbar(msg, variant) {
        enqueueSnackbar(`${msg}`, { variant: variant });
        setTimeout(() => closeSnackbar(), 4000)
    }

    return (
        <div className="product-preview flex column align-center">
            <div className="preview-image">
                <img src={product.image} alt={product.title} />
            </div>

            <h4>{`${product.title.slice(0, 20)}...`}</h4>

            <span>{product.category}</span>
            <span>{`$${product.price}`}</span>

            <div className="preview-linkbox flex align-center">
                <button
                    onClick={() => handleAddition(product)}
                >
                    Add to cart</button>
                <Link to={`/details/${product.id}`}>Details</Link>
            </div>
        </div>
    )
}
