import { ProductPreview } from './ProductPreview'

export function ProductList({ products, productsToShow, productsHeader }) {

    return <div className="product-list">
        <h2>{`${productsHeader}`}</h2>
        <div className="product-list-grid">
            {products.slice(0, productsToShow).map(product => {
                return <ProductPreview
                    key={product.id}
                    product={product}
                />
            })}
        </div>
    </div>
}

ProductList.defaultProps = {
    productsToShow: 20,
    productsHeader: 'Our latest products'
}