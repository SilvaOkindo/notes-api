import { mockNotes } from "../notes.mjs";

export const resolverNoteById = (request, response, next) => {
    const {
        params: { id },
      } = request;
      const parsedId = parseInt(id);
    
      if (isNaN(parsedId))
        return response.status(400).send({ message: "Bad request" });
    
      const findNoteIndex = mockNotes.findIndex((note) => note.id === parsedId);
    
      if (findNoteIndex === -1)
        return response.status(404).send({ message: "Note not foiund" });
    
      request.findNoteIndex = findNoteIndex;
    
      next();
}