import { useNavigate } from "react-router-dom"

function SignOutButton(){
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return(
        <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
        </button>
    )
}

export default SignOutButton