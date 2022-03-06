// REQUIRE
const { setDefaultResultOrder } = require('dns');
const express = require('express');
const http = require('http');
const FormData = require('form-data');
const multer = require('multer');
const uuid = require('uuid').v4;


// VARIABLES
const app = express();
const PORT = 80;
const databaseServerOptionsPOST = {
    hostname: '192.168.19.6',
    port: 80,
    path: '/api/ticketsystem',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
}
const databaseServerOptionsGET = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/api/ticketsystem',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}
var attachmentFileName = "";


// MULTER SETTINGS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      const { originalname } = file;
      attachmentFileName = `${uuid()}-${originalname}`;
      cb(null, attachmentFileName);
  }
})
const upload = multer({ storage });


// FUNCTIONS


// USING
app.use(express.json());
app.use(express.static('public'));


// LISTEN ON PORT 80
app.listen(
    PORT,
    () => console.log(`Listening on http://127.0.0.1:${PORT}`)
);


// REDIRECT TO FRONTEND
app.get('/', (req, res) =>{
    res.redirect('/ticketsytem')
})


// SEND THE FRONTEND TO THE USER
app.get('/ticketsystem', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})


// HANDLE THE POST OF THE TICKET DATA
// SEND THE PRIVIOUSLY COLLECTED DATA TO THE DATABASE SERVER'S API
app.post('/ticketsystem', upload.single('attachment'), (req, res) =>{
  var formData = new FormData(req.body);
  var data = JSON.stringify(formData);
  data = JSON.parse(data);  
  data.filename = attachmentFileName;
  console.log(data);
  
  var postReq = http.request(databaseServerOptionsPOST, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });   
       
    postReq.write(data);
    postReq.end();
  });

  postReq.on('error', function(err) {
    console.log();
    console.log(err);
    console.log();
    res.sendStatus(500);
  });    
})

app.get('/ticketsystem/tickets', (req, res) =>{
  var getReq = http.request(databaseServerOptionsGET, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });   
       
    getReq.write(data);
    getReq.end();
  })
  
  getReq.on('error', function(err) {
    console.log();
    console.log(err);
    console.log();
    res.sendStatus(500);
  });  

  res.send(getReq.body);
})