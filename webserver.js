const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
const app = express()
const port = process.env.PORT || 5000
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware) // this is intentional

app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, function () {
  console.log( 'Serving index.html + statics...' )
})