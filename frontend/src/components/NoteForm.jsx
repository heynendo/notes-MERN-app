import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import '../styles/note-form.css'
import Loading from "./Loading"

function NoteForm({newNote}) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [note, setNote] = useState({
        title: "",
        content: ""
    })
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()
    const { id } = useParams()

    const updateNote = (e) => {
        const { name, value } = e.target

        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }))
    }
    
    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setError("No token found. Please log in.")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${backendUrl}/api/notes/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok){
                    throw new Error(data.error || "Failed to fetch note")
                }
                setNote(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        if (!newNote){
            getNote()
        } else {
            setLoading(false)
        }
    },[])

    const sendNote = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
            setError("No token found. Please log in.")
            return
        }

        try{
            const response = newNote ?
                await fetch(`${backendUrl}/api/notes`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(note),
                })
                :
                await fetch(`${backendUrl}/api/notes/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(note),
                })
            if (response.ok) {
                setNote({ title: "", content: "" })
                navigate('/dashboard')
            } else {
                console.error("Error saving note:", response.status);
            }
        }catch(e){
            console.error("Failed to send note:", e)
        }
    }

    const deleteNote = async () => {
        const token = localStorage.getItem("token")

        try{
            const response = await fetch(`${backendUrl}/api/notes/${id}`,{
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })
            if (response.ok) {
                setNote({ title: "", content: "" })
                navigate('/dashboard')
            } else {
                console.error("Error deleteing note: ", response.status);
            }
        }catch (e){
            console.error("Network error: ", e)
        }
    }

    if (loading) {
        return(<Loading />)
    }

    if (error) {
        return(
        <div className="error-note-form">
            <p>An error occurred. <Link to="/dashboard">Return to notes</Link></p>
        </div>)
    }
    return(
        <div className="note-form">
            <div className="note-form-header">
                <Link to='/dashboard'><img src='../../backArrow.png'/></Link>
                <h2>{newNote ? "New " : "Edit "}Note</h2>
                {!newNote ?
                <img 
                    className="trashcan" 
                    src='../../trashcan.png' 
                    onClick={deleteNote}
                /> : <div className="placeholder"></div>
                }
            </div>
            <form onSubmit={sendNote}>
                <input 
                    name="title"
                    value={note.title}
                    onChange={updateNote}
                    placeholder="Note Title"
                    required
                />
                <textarea 
                    name="content"
                    value={note.content}
                    onChange={updateNote}
                    placeholder="Note Content"
                    required
                />
                <button className="submit" type="submit">{newNote ? "Create" : "Update"} Note</button>
            </form>
        </div>
    )
}

export default NoteForm