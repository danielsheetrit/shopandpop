import { useSelector } from 'react-redux'

export function Dashbored({ handleLogout }) {

    const user = useSelector(state => state.productModule.currentUser)

    return (
        <section className="dashbored">
            <h1>Dashbored</h1>
            {user && <article className="flex column">
                <span>Email: {user.email}</span>
                <button onClick={() => {
                    handleLogout()
                }} >
                    Log out
                </button>
            </article>}
        </section>
    )
}
