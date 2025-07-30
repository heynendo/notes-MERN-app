import { useNavigate } from "react-router-dom"

function CreateNote() {
    //button with link to CreateNote.jsx route
    const navigate = useNavigate()

    return(
        <button 
            onClick={() => navigate('/note/create')}
            className="create-note"
        >
            New Note
        </button>
    )
}

export default CreateNote