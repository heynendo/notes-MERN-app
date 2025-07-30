import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import '../styles/password.css'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (e) => {
        setError("")
        e.preventDefault()
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const endpoint = "/api/auth/forgot-password"

        try{
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            //if response is good, give option to login
            if (!response.ok){
                if (response.status === "404"){
                    setError("Email not found")
                }

                throw new Error(data.error || "Something went wrong")
            }
            setEmailSent(true)
        }catch(e){
            console.error("Error: ", e.message)
        }
    }

    return(
        <div className="forgot-password">
            <div className="password-header">
                <Link to='/login'><img src='../../backArrow.png'/></Link>
                <h2>Forgot password?</h2>
                <div className="placeholder"></div>
            </div>
            <p>enter your email address below to receive a password reset link.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="EMAIL"
                    type="email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    value={email}
                    required
                />
                <button className="submit" type="submit">Send</button>
                {emailSent && <p>Check email ({email}) for your reset link.</p>}
            </form>
        </div>
    )
}

export default ForgotPassword