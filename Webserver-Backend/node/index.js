// REQUIRE
const { setDefaultResultOrder } = require('dns');
const express = require('express')
const http = require('http')

// VARIABLES
const app = express();
const PORT = 80;
const databaseServerOptions = {
    hostname: '192.168.19.6',
    port: 80,
    path: '/api/ticketsystem',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
}

// USING
app.use(express.json());
app.use(express.static('public'));


// LISTEN ON PORT 80
app.listen(
    PORT,
    () => console.log(`Listening on http://127.0.0.1:${PORT}`)
);


// REDIRECT TO TICKETSYSTEM
app.get('/', (req, res) =>{
    res.redirect('/ticketsytem')
})


// SEND THE WEBSITE TO THE USER
app.get('/ticketsystem', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})


// HANDLE THE POST OF THE TICKET DATA
// SEND THE PRIVIOUSLY COLLECTED DATA TO THE DATABASE SERVER'S API
app.post('/ticketsystem', (req, res) =>{
  res.sendStatus(200)  
  
  var data = req.body
  console.log(data)

  try {
    const postReq = http.request(databaseServerOptions, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        process.stdout.write(d)
      })    

      res.on('error', d => {
        throw "connectionRefused_EXEPTION"
      })
    })         

    postReq.write(JSON.stringify(data))
    postReq.end() 

  } catch (e) {
    console.log('[ERROR]: Could not reach Database-Server')
  }
  res.end()
})

