import express from "express"
import { routerNotes } from "./routes/notesRoutes.mjs"

const app = express()

app.use(express.json())

app.use("/api/v1/", routerNotes)


app.listen(3000, () => {
    console.log("Serving running on port 3000 ...");
    
})

