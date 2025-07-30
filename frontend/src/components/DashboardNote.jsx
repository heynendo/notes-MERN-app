import { useNavigate } from "react-router-dom"

function DashboardNote({note}) {

    const navigate = useNavigate();

    return(
        <div className="dashboard-note" >
            <div className="note-header">
                <h3>{note.title}</h3>
                <button onClick={() => navigate(`/note/${note._id}`)}>
                    <img className="edit-icon" src="../../editIcon.png"/>
                </button>
            </div>
            <div className="break"></div>
            <p>{note.content}</p>
        </div>
    )
}

export default DashboardNote