import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useDispatch } from 'react-redux'
import { saveProduct } from '../store/actions/product.action'

import { productService } from '../services/product.service'
import { AppFooter } from '../components/AppFooter'

import Backdrop from '../components/Backdrop'

export function ProductDetails() {

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        fetchSingleProduct(id)
    }, [])

    async function handleAddition(product) {
        const res = await dispatch(saveProduct(product))
        productService.addProduct(res.product)
    }

    async function fetchSingleProduct(id) {
        setIsLoading(true)
        const product = await productService.query(`/${id}`)
        setProduct(product)
        setIsLoading(false)
    }

    return (!isLoading ?
        <section className="product-details container">
            <div>
                {product && <div
                    className="details-main flex align-center justify-space-between"
                >
                    <div className="details-image">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div
                        className="details-header flex column"
                    >
                        <h2>{product.title}</h2>
                        <span>{product.category.toUpperCase()}</span>
                        <p>{product.description}</p>
                        <span>{`$${product.price}`}</span>

                        <button
                            onClick={() => handleAddition(product)}
                        >
                            Add to cart</button>
                    </div>
                </div>}
                <AppFooter />
            </div>
        </section>
        : <Backdrop isLoading={isLoading} />)
}
