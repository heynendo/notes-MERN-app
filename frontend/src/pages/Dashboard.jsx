import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DashboardNote from '../components/DashboardNote'
import SignOutButton from "../components/SignOutButton"
import CreateNoteButton from '../components/CreateNoteButton'
import '../styles/dashboard.css'
import Loading from "../components/Loading"

function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notes, setNotes] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const endpoint = "/api/notes"

    useEffect(() => {
        const getNotes = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setError("No token found. Please log in.")
                setLoading(false)
                return
            }

            try{
                const response = await fetch(`${backendUrl}${endpoint}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok){
                    throw new Error(data.error || "Failed to fetch user's notes")
                }
                setNotes(data)
            }catch(e){
                setError(e.message)
            }finally{
                setLoading(false)
            }
        }

        getNotes()
    },[])
    if (loading) {
        return(<Loading />)
    }
    if (error) {
        return(
        <div className="error-dashboard">
            <p>Error loading notes. Return to <Link to="/login">login</Link></p>
        </div>
        )
    }
    return(
        <div className="dashboard">
            {
                notes.map(note =>
                    <DashboardNote
                        key={note._id}
                        note={note}
                    />
                )
            }
            <SignOutButton />
            <CreateNoteButton />
        </div>
    )
}

export default Dashboard