import { Home } from './pages/Home'
import { ProductCategory } from './pages/ProductCategory'
import { ProductDetails } from './pages/ProductDetails'
import { ProductCheckout } from './pages/ProductCheckout'
import { Login } from './pages/auth/Login'

export const routes = [
    {
        path: '/details/:id',
        component: ProductDetails
    },
    {
        path: '/categories/:category',
        component: ProductCategory
    },
    {
        path: '/checkout',
        component: ProductCheckout
    },
    {
        path: '/auth/:login',
        component: Login
    },
    {
        path: '/',
        component: Home
    },
]