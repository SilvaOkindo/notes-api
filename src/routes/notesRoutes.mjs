import { Router } from "express"
import { matchedData, validationResult, checkSchema } from "express-validator"
import { createNoteValidatorSchema } from "../utlis/createNoteValidatorSchema.mjs"
import { mockNotes } from "../mockdata/notes.mjs"
import { resolverNoteById } from "../middleware/resolverNoteById.mjs"

export const routerNotes = Router()

// getting all notes and filtered notes
routerNotes.get("/notes", (request, response) => {
    const {query: { filter, value }} = request
    if(filter && value) {
        return response.send(mockNotes.filter(note => note[filter].includes(value)))
    }

    response.send(mockNotes)
    
})


// getting one note
routerNotes.get("/notes/:id", (request, response) => {

    const parsedId = parseInt(request.params.id)

    console.log(parsedId)

    if(isNaN(parsedId)) return response.status(400).json({message: "Bad request"})

    const findNote = mockNotes.find(note => note.id === parsedId)

    if(!findNote) return response.sendStatus(404)

    return response.send(findNote)
    
})




// creating a note
routerNotes.post("/notes", checkSchema(createNoteValidatorSchema), (request, response) => {

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
routerNotes.put("/notes/:id", resolverNoteById, (request, response) => {

    const {body, findNoteIndex} = request

    mockNotes[findNoteIndex] = {id: mockNotes[findNoteIndex].id, ...body}
    return response.status(201).json({message: "Note updated"})

})


// editing a note
routerNotes.patch("/notes/:id", resolverNoteById, (request, response) => {
    const {body, findNoteIndex} = request

    mockNotes[findNoteIndex] = {...mockNotes[findNoteIndex], ...body}

    return response.status(201).json({message: "Note updated"})
})

// delete a note
routerNotes.delete("/notes/:id", resolverNoteById, (request, response) => {
    const {findNoteIndex} = request
    mockNotes.splice(findNoteIndex, 1)

    response.status(200).json({message: "Deleted note successfully"})
})
