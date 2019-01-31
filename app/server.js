'use strict'

const app = require('./index')

const host = 'localhost'
const port = (process.env.PORT || 3000)

app.listen(port, () => console.info(`server starting on ${port}`))
