import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { saveProduct } from '../store/actions/product.action'

import { cartService } from '../services/cart.service'
import { AppFooter } from '../components/AppFooter'


import { useSnackbar } from 'notistack'
import Backdrop from '../components/Backdrop'

export function ProductDetails() {

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()

    const dispatch = useDispatch()
    const user = useSelector(state => state.productModule.currentUser)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        fetchSingleProduct(id)
    }, [])

    async function handleAddition(product) {

        if (!user) handleSnackbar('You have to log in first', 'error')

        const res = await dispatch(saveProduct(product))
        cartService.addProduct(res.product)
    }

    async function fetchSingleProduct(id) {
        setIsLoading(true)
        const product = await cartService.query(`product/${id}`)
        setProduct(product)
        setIsLoading(false)
    }

    function handleSnackbar(msg, variant) {
        enqueueSnackbar(`${msg}`, { variant: variant });
        setTimeout(() => closeSnackbar(), 4000)
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
