import { ProductAmount } from './ProductAmount'

export function CheckoutPreview({ cart, previewSize }) {

    return (
        <div>
            {cart.map(product => {
                return <div
                    key={product.id}
                    className={`${previewSize} flex`}
                >
                    <div className="checkout-preview-img">
                        <img
                            src={product.image}
                            alt={product.title}
                        />
                    </div>
                    <div className="checkout-preview-header">
                        <h3>{product.title}</h3>
                        <p>{product.category.toUpperCase()}</p>
                        <ProductAmount  product={product} />
                    </div>
                </div>
            })}
        </div>
    )
}

CheckoutPreview.defaultProps = {
    previewSize: 'large-preview'
}