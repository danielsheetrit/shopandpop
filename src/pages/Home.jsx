import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/actions/product.action'

import { heroImage } from '../services/constances.service'
import { ProductList } from '../components/ProductList'
import { AppFooter } from '../components/AppFooter'
import Backdrop from '../components/Backdrop'

export function Home() {

    const products = useSelector(state => state.productModule.products)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        setIsLoading(true)
        await dispatch(getProducts('?limit=8'))
        setIsLoading(false)
    }

    return (!isLoading ?
        <section className="home container">
            <div className="hero-container flex align-center justify-space-between">
                
                <div className="hero-img flex justify-center">
                    <img src={heroImage} alt="Milk&honey logo" />
                </div>
                <div className="hero-title">
                    <h1>Welcome to Shop & pop</h1>
                    <p>
                        We’re a local shop to everything you desire. <br />
                        Located in one of Olympus’s up and coming neighborhoods,<br />
                        we are part of the city fabric, among entrepreneurs and innovators.
                    </p>
                        <Link to="/categories/explore">
                            Start shopping
                        </Link>
                </div>
            </div>
            {products && <ProductList
                products={products}
                productsToShow="8"
            />}
            <AppFooter />
        </section>
        : <Backdrop isLoading={isLoading} />)
}