import express, { Application } from "express"

const application: Application = express()

application.listen(3000, () => console.log("Listening on port 3000..."))
