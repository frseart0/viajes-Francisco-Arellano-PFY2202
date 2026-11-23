import express from 'express'
import { destinos, ejecutarGraphql } from './graphql.js'

const app = express()
app.use(express.json())

app.get('/api/destinos', (_req, res) => {
  res.json(destinos)
})

app.post('/graphql', async (req, res) => {
  const query = req.body?.query
  if (typeof query !== 'string' || query.trim() === '') {
    res.status(400).json({ errors: [{ message: 'Falta la consulta GraphQL' }] })
    return
  }

  res.json(await ejecutarGraphql(query, req.body.variables))
})

const port = 4000
app.listen(port, () => {
  console.log(`Mock API en http://localhost:${port}`)
})
