import feathers from "@feathersjs/feathers"
import express from "@feathersjs/express"

import documents from "./services/documents"
import mongoose from "mongoose"
import revisions from "./services/revisions"
import content from "./services/content"
import log from "./hooks/log"

const app = express(feathers())
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())

mongoose.set("debug", true)
mongoose.connect("mongodb://localhost:27017/flare-cms-development", {
  useNewUrlParser: true,
  useCreateIndex: true
})

app.hooks({
  before: {
    all: [log]
  },
  after: {
    all: [log]
  },
  error: {
    all: [log]
  }
})

app.use("/content", content)
app.use("/documents", documents)
app.use("/revisions", revisions)

app.use(express.errorHandler())

app.listen(port, () => console.log(`Server listening on port ${port}`))
