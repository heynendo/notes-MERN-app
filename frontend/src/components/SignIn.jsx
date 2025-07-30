import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import '../styles/sign-in.css'

function SignIn({type}){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const loginTrue = type === "Login"

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const updateData = (e) => {
        const { name, value } = e.target

        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // either login or create user based on type prop
    const sendData = async (e) => {
        setLoading(true)
        setError("")
        e.preventDefault()

        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const endpoint = loginTrue ? "/api/auth/login" : "/api/auth/register"

        try{

            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })

            const data = await response.json()

            if (!response.ok) {
                setLoading(false)
                if (response.status === 400 && !loginTrue){ // email already exists
                    setError(`Email (${userData.email}) already exists.`)
                } else if (response.status === 400 && loginTrue){ // invalid email or password
                    setError("Invalid email or password, try again.")
                }
                
                throw new Error(data.error || "Something went wrong")
            }

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            setUserData({
                email: "",
                password: ""
            })

            navigate('/dashboard')

        }catch(e){
            setLoading(false)
            setError(`Error: ${e.message}`)
            console.error("Authentication error: ", e.message)
        }
    }
    if (loading) return <Loading />

    return (
        <div className="sign-in">
            <div className="form-header">
                <Link to='/'><img src='../../backArrow.png'/></Link>
                <h2>{type}</h2>
                <div></div>
            </div>
            <form onSubmit={sendData}>
                <input
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={updateData}
                    placeholder='Email'
                    required
                />
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={updateData}
                    placeholder='Password'
                    required
                    minLength={5}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(x => !x)}
                    className="toggle-password"
                >
                    {showPassword ? "Hide Password" : "Show Password"}
                </button>
                <p className="error-message">{error ? error : " "}</p>
                <button className="submit" type="submit">{type}</button>
            </form>
            {loginTrue ?
                <p>Don't have an account? <Link to='/signup'> Sign Up</Link></p> :
                <p>Already have an account? <Link to='/login'> Login</Link></p> 
            }
            {loginTrue && <p className="forgot-password-link">Forgot your password? <Link to="/forgotpassword">Click here</Link></p>}
        </div>
    )
}

export default SignIn