import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 })//show newest note first
        res.status(200).json(notes)
        console.log(`Sending all notes to user`)
    } catch(e) {
        console.error(`Error sending all notes to user: `,e)
        res.status(500).json({message: "internal server error"})
    }
}
export const getNoteById = async (req, res) => {
    try{
        const getNote = await Note.findById({ _id: req.params.id, user: req.user.id })
        if (!getNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(getNote)
        console.log(`Sending note by ID`)
    } catch(e){
        console.error(`Error sending note by ID: `,e)
        res.status(500).json({message: "internal server error"})
    }
}
export const createNote = async (req, res) =>{
    try{
        const {title,content} = req.body
        const newNote = new Note({title, content, user: req.user.id})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
        console.log(`Creating new note`)
    }catch(e){
        console.error(`Error creating new note: `,e)
        res.status(500).json({message: "internal server error"})
    }
}
export const updateNote = async (req, res) =>{
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{new:true})

        if(!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)
        console.log(`Updating note`)
    } catch(e){
        console.error(`Error updating note: `,e)
        res.status(500).json({message: "internal server error"})
    }
}
export const deleteNote = async (req, res) =>{
    try{
        const {title} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({ message: "Note deleted successfully"})
        console.log(`Deleting note`)
    } catch(e){
        console.error(`Error deleting note: `,e)
        res.status(500).json({message: "internal server error"})
    }
}