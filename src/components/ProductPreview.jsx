import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { saveProduct } from '../store/actions/product.action'

import { productService } from '../services/product.service'

export function ProductPreview({ product }) {

    const dispatch = useDispatch()

    async function handleAddition(product) {
        try {
            //In general we will make a call for the DB, 
            //and then render the changes.
            //but since we working with LocalStorage its ok too..
            const res = await dispatch(saveProduct(product))
            productService.addProduct(res.product)
        } catch (err) {
            console.error(err);
        }
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
