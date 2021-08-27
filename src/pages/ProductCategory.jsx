import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { productService } from '../services/product.service'
import { ProductList } from '../components/ProductList'
import { AppFooter } from '../components/AppFooter'

import Backdrop from '../components/Backdrop'

export function ProductCategory() {

    const [products, setProducts] = useState([])
    const { category } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [category])

    async function fetchProducts() {
        setIsLoading(true)
        const fixedCategory =
            (category === 'explore') ? '' : `/category/${category}`;
        const products = await productService.query(fixedCategory)
        setProducts(products)
        setIsLoading(false)
    }

    return (!isLoading ?
        <section className="category container">
            {products &&
                <div>
                    <ProductList
                        products={products}
                        productsHeader={category}
                    />
                    <AppFooter />
                </div>}
        </section>
        : <Backdrop isLoading={isLoading} />)
}
