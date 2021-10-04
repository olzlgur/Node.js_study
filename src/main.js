// @ts-check
/* eslint-disable-next-line no-console */
// Type checking: TypeScript

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}. `)
})
