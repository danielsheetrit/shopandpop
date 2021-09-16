import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { useSelector, useDispatch } from 'react-redux'
import { setUser, eraseCart } from '../store/actions/product.action'

import { CheckoutPreview } from '../components/CheckoutPreview'
import { AppFooter } from '../components/AppFooter'
import { Dashbored } from '../components/Dashbored'

import { emptyCartImg } from '../services/constances.service'
import { cartService } from '../services/cart.service'

import { auth } from '../firebase'
import { useSnackbar } from 'notistack'

export function ProductCheckout() {

    const [productsByCount, setProductsByCount] = useState(null)
    const [fixedCart, setFixedCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(null)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const cart = useSelector(state => state.productModule.cart)
    const dispatch = useDispatch()
    const histroy = useHistory()

    useEffect(() => {
        getDuplicatedProducts(cart)
    }, [])

    useEffect(() => {
        getDuplicatedProducts(cart)
    }, [cart])

    useEffect(() => {
        if (productsByCount) {
            makeFixedCart(productsByCount)
        }
    }, [productsByCount])

    function getDuplicatedProducts(array) {
        //find if there is any repeating elemnts in the array
        const productsTitles = array.map(product => product.title)
        const count = {}
        productsTitles.forEach(product => {
            if (count[product]) {
                count[product] += 1
                return
            }
            count[product] = 1
        });
        setProductsByCount(count)
    }

    function makeFixedCart(productsByCount) {
        // find the right product, then pushing the amount of times it orderd,
        //and than render the value to the component, and use the value
        // to calculate the total price
        const newCart = []
        let totalPrice = 0;

        for (const key in productsByCount) {
            let product = cart.find(prdct => prdct.title === key)
            if (key === product.title) {
                product.amount = productsByCount[key]
                product.priceByAmount = product.amount * product.price
                totalPrice += product.priceByAmount
            }
            newCart.push(product)
        }
        setFixedCart(newCart)
        setTotalPrice(totalPrice)
    }

    async function handleLogout() {
        try {
            await auth.signOut()
            dispatch(setUser(null))
            histroy.push('/login')
            handleSnackbar('You have successfully logged out.', 'success')
        } catch (err) {
            console.log('faild to log out', err);
            handleSnackbar('Had problem logging you out.', 'error')
        }
    }

    function handleSnackbar(msg, variant) {
        enqueueSnackbar(`${msg}`, { variant: variant });
        setTimeout(() => closeSnackbar(), 4000)
    }

    async function handlePurchase() {
        await cartService.clearStorage()
        dispatch(eraseCart())
        histroy.push('/')
        handleSnackbar('Purchase successfully', 'success')
    }

    return (
        <div className="product-checkout container">
            <div className="checkout-main">

                <Dashbored handleLogout={handleLogout} />

                <div className="checkout-header">
                    <h2>Order summary</h2>
                </div>

                {fixedCart.length ?
                    <div>
                        <CheckoutPreview
                            cart={fixedCart}
                        />
                        <div
                            className="prices-box flex align-center justify-space-between"
                        >
                            {totalPrice && <span>Total price: ${totalPrice.toFixed(2)}</span>}
                            <button
                                onClick={() => handlePurchase()}
                            >
                                Complete oreder</button>
                        </div>
                    </div>
                    :
                    <section className="empty-msg-container flex column align-center">
                        <h2 className="empty-msg">Shopping cart is empty</h2>
                        <div className="empty-cart-img">
                            <img src={emptyCartImg} alt="empty-cart-img" />
                        </div>
                    </section>}

                <AppFooter />
            </div>
        </div>
    )
}