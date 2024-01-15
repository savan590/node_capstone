import styles from './title.module.css'
// import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../context'

function Navbar() {
    const navigate = useNavigate()
    // const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
    // const { isLoggedIn, setIsLoggedIn } = useLogin()
    const { isLoggedIn, logout } = useLogin();


    // const handleLogout = () => {
    //     window.localStorage.removeItem("user")
    //     window.localStorage.removeItem("name")
    //     window.localStorage.removeItem("token")
    //     // setIsLoggedIn(!!window.localStorage.getItem("user"))
    //     // setIsLoggedIn(false)
    // }
    return (
        <div className={styles.nav}>
            <p className={styles.text}>JobFinder</p>
            <div>
                {isLoggedIn ? <>
                    <span onClick={logout} className={styles.loggedInText}>Logout</span>
                    <span className={styles.loggedInText}>Hello Recruiter</span>
                </> :
                    <>
                        <button onClick={() => navigate("/login")} className={styles.login}>Login</button>
                        <button onClick={() => navigate("/register")} className={styles.register}>Register</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar


