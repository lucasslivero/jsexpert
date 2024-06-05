const http = require("http")
const DEFAULT_USER = {
  username: "LucasLivero",
  password: "123"
}
const { once } = require("events")
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  '/login:post': async (request, response) => {
    const dataBuffer = await once(request, "data")
    const user = JSON.parse(dataBuffer)
    const lower = (text) => text.toLowerCase()
    if (lower(user.username) !== lower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
      response.writeHead(401)
      return response.end("Log in Failed")
    }
    return response.end("Log in succeeded")
  }
}

function handler(request, response) {
  const { url, method } = request
  const routerKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routerKey]
  if (!chosen) {
    response.writeHead(404)
    return response.end(`${routerKey} path not found`)
  }
  return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log("Running at port 3000"))

module.exports = app