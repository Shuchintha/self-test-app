const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()

// =========================dotenv.config()===========================================
// dotenv.config() will load the evirnment variables from .env file to the application
// =========================dotenv.config()===========================================
dotenv.config()

// =========================cors()===========================================
// Calling use(cors()) will enable the express server to respond to preflight requests.
// A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
// So CORS are basically a set of headers sent by the server to the browser. calling cors() with no additional information will set the following defaults:
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
// these are translated into these headers:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
// Status Code: 204
// What is this doing is basically making your server accessible to any domain that requests a resource from your server via a browser.
// =========================cors()===========================================
app.use(cors())

// =========================express.json()===========================================
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// =========================express.json()===========================================
app.use(express.json())

const db = process.env.ATLAS_URI
console.log('db', db)
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect(function (err, DB) {
  // Verify we got a good "DB" object
  if (DB) {
    console.log('DB', DB)
    console.log('Successfully connected to MongoDB.')
  } else {
    console.log('error', err)
  }
})

app.get('/api', (req, res) => {
  res.json({ text: 'Hello World' })
  // res.send(
  //   'HEloo+++++++++++++++++++++++++++++++===================================='
  // )
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))
