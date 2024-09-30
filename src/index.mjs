import express from "express"
import { checkSchema, query , validationResult, matchedData} from "express-validator"
import {mockNotes} from "./notes.mjs"
import { createNoteValidatorSchema } from "./createNoteValidatorSchema.mjs"
import {resolverNoteById} from "./middleware/resolverNoteById.mjs"


const app = express()

app.use(express.json())


// getting all notes and filtered notes
app.get("/api/notes", (request, response) => {
    const {query: { filter, value }} = request
    if(filter && value) {
        return response.send(mockNotes.filter(note => note[filter].includes(value)))
    }

    response.send(mockNotes)
    
})

// getting one note
app.get("/api/notes/:id", (request, response) => {

    const parsedId = parseInt(request.params.id)

    console.log(parsedId)

    if(isNaN(parsedId)) return response.status(400).json({message: "Bad request"})

    const findNote = mockNotes.find(note => note.id === parsedId)

    if(!findNote) return response.send(404)

    return response.send(findNote)
    
})

// creating a note
app.post("/api/notes", checkSchema(createNoteValidatorSchema), (request, response) => {

    const errors = validationResult(request)

    // check for errors

    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    const data = matchedData(request)

    const newNote = {id: mockNotes[mockNotes.length - 1].id + 1, ...data}
    mockNotes.push(newNote)

    return response.status(201).json(newNote)

})

// updating the note
app.put("/api/notes/:id", resolverNoteById, (request, response) => {

    const {body, findNoteIndex} = request

    mockNotes[findNoteIndex] = {id: mockNotes[findNoteIndex].id, ...body}
    return response.status(201).json({message: "Note updated"})

})


// editing a note
app.patch("/api/notes/:id", resolverNoteById, (request, response) => {
    const {body, findNoteIndex} = request

    mockNotes[findNoteIndex] = {...mockNotes[findNoteIndex], ...body}
    
    return response.status(201).json({message: "Note updated"})
})



app.listen(3000, () => {
    console.log("Serving running on port 3000 ...");
    
})

