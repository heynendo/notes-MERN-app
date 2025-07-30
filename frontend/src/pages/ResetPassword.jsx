import { useState } from "react"
import { Link } from "react-router-dom"
import '../styles/password.css'


function ResetPassword(){
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const token = new URLSearchParams(window.location.search).get("token")
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const endpoint = "/api/auth/reset-password"

    const handleReset = async (e) => {
        setError("")
        e.preventDefault()
        try{
            const response = await fetch(`${backendUrl}${endpoint}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword })
            })

            const data = await response.json()

            if(!response.ok){
                setError("an error occurred resetting password.")
                throw new Error(data.error || "Something went wrong")
            }
            setSuccess(true)
        }catch(e){
            console.error("Error: ", e.message)
        }
    }

    return(
        <div className="reset-password">
            <h2>Password Reset</h2>
            <form onSubmit={handleReset}>
                <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="NEW PASSWORD"
                    onChange={(e) => {setNewPassword(e.target.value)}}
                    value={newPassword}
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
                <button className="submit" type="submit">
                    Update
                </button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>Password updated! <Link to="/login">Login</Link> with your new password</p>}
        </div>
    )
}

export default ResetPassword