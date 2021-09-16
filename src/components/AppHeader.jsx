import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/actions/product.action'

import { auth } from '../firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

import { MaterialBadge } from './MaterialBadge'

export function AppHeader() {

    const [hamburgerMode, setHamburgerMode] = useState(false)

    const cart = useSelector(state => state.productModule.cart)
    const currentUser = useSelector(state => state.productModule.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (hamburgerMode) document.body.classList.add('hamburger-mode')
        else document.body.classList.remove('hamburger-mode')
    }, [hamburgerMode])

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(user => {
            dispatch(setUser(user))
        })
        return unSubscribe
    }, [])

    return (
        <header className="container">
            <nav>
                <div className="logo">
                    <h1>
                        <NavLink to="/">SHOP&POP</NavLink>
                    </h1>
                </div>
                <div className="header-links">
                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        exact
                        activeClassName="selected"
                        to="/"
                    >Home</NavLink>

                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        activeClassName="selected"
                        to="/categories/men's clothing"
                    >Mens</NavLink>

                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        activeClassName="selected"
                        to="/categories/women's clothing"
                    >Women</NavLink>

                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        activeClassName="selected"
                        to="/categories/jewelery"
                    >Jewelery</NavLink>

                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        activeClassName="selected"
                        to="/categories/electronics"
                    >Electronics</NavLink>

                    <NavLink
                        onClick={() => setHamburgerMode(false)}
                        activeClassName="selected"
                        to="/categories/explore"
                    >Explore</NavLink>
                </div>

                <div className="header-cart">
                    {currentUser ? <Link to="/checkout">Dashboard
                        <MaterialBadge
                            numOfItems={cart.length}
                        />
                    </Link> : <Link className="login-btn" to='/auth/login'>Log in</Link> }
                </div>

                <div
                    className="hamburger"
                    onClick={() => setHamburgerMode(!hamburgerMode)}
                >
                    <FontAwesomeIcon
                        icon={hamburgerMode ? faTimes : faBars}
                        size="2x"
                    />
                </div>
            </nav>
        </header>
    )
}