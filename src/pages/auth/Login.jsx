import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { auth } from '../../firebase'

import { useDispatch } from 'react-redux'
import { setUser } from '../../store/actions/product.action'

import { useSnackbar } from 'notistack'

export function Login() {

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const dispatch = useDispatch()
    const histroy = useHistory()
    const params = useParams()

    useEffect(() => {
        if (!params.login) setIsLogin(false)
        const unSubscribe = auth.onAuthStateChanged(user => {
            dispatch(setUser(user))
        })
        return unSubscribe
    }, [])

    function handleChange(ev) {
        if (ev.target.name === 'email') {
            setEmail(ev.target.value)
        } else {
            setPassword(ev.target.value)
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault()

        try {
            if (isLogin) {
                const res = await auth.signInWithEmailAndPassword(email, password)
                dispatch(setUser(res.user))
                handleSnackbar('You are now logged in!', 'success')
            } else {
                const res = auth.createUserWithEmailAndPassword(email, password)
                dispatch(setUser(res.i.user))
                handleSnackbar('Welcome! we already logged you in', 'success')
            }
            histroy.push('/')

        } catch (err) {
            console.log('faild to login', err);
            handleSnackbar('Failed to login, try again.', 'error')

        } finally {
            clearForm()
        }
    }

    function handleSnackbar(msg, variant) {
        enqueueSnackbar(`${msg}`, { variant: variant });
        setTimeout(() => closeSnackbar(), 4000)
    }

    function clearForm() {
        setEmail('')
        setPassword('')
    }

    return (
        <section className="login container">
            <div className="flex column align-center">
                <h2>{isLogin ? 'Log in' : 'Sign up'} </h2>
                <form
                    onSubmit={(ev) => handleSubmit(ev)}
                >
                    <div className="flex column input-container">
                        <label htmlFor="email-id">Email</label>
                        <input
                            value={email}
                            id="email-id"
                            name="email"
                            type="email"
                            onChange={(ev) => handleChange(ev)}
                            autoComplete
                        />
                    </div>
                    <div className="flex column input-container">
                        <label htmlFor="password-id">Password</label>
                        <input
                            value={password}
                            id="password-id"
                            name="password"
                            type="password"
                            onChange={(ev) => handleChange(ev)}
                            autoComplete 
                        />
                    </div>
                    <button>{isLogin ? 'Log in' : 'Sign up'}</button>
                </form>

                <div className="signup-login-suggest">
                    <p>
                        {isLogin ? 'Not have an account yet?' : 'Already have an account?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>

            </div>
        </section>
    )
}