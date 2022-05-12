// USE THIS ONLY FOR DEV PURPOSES
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// REQUIRE
const { setDefaultResultOrder } = require('dns');
const express = require('express');
const https = require('https');
const FormData = require('form-data');
const multer = require('multer');
const uuid = require('uuid').v4;
const fs = require('fs');
const axios = require('axios');
const config = require('config');


// VARIABLES
const options = {
	key: fs.readFileSync(__dirname + config.get('server.key')),
	cert: fs.readFileSync(__dirname + config.get('server.cert'))
};
const app = express();
const PORT = config.get('server.port');
const databaseServerOptionsPOST = {
    hostname: config.get('databaseServer.host'),
    port: config.get('databaseServer.port'),
    path: '/api/ticketsystem',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};
const databaseServerOptionsGET = {
  hostname: config.get('databaseServer.host'),
  port: config.get('databaseServer.port'),
  path: '/api/ticketsystem',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};


// MULTER SETTINGS
var attachmentFileName = "";
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


// LISTEN
//app.listen(
//	PORT,
//    () => console.log(`Listening on http://127.0.0.1:${PORT}`)
//);

const httpsServer = https.createServer(
	options,
	app
);

httpsServer.listen(PORT, () => {
	console.log(`Listening on https://127.0.0.1:${PORT}`);
});

// REDIRECT TO FRONTEND
app.get('/', (req, res) =>{
    res.redirect('/ticketsytem')
});


// SEND THE FRONTEND TO THE USER
app.get('/ticketsystem', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})


// HANDLE THE POST OF THE TICKET DATA
// SEND THE PREVIOUSLY COLLECTED DATA TO THE DATABASE SERVER'S API
app.post('/ticketsystem', upload.single('attachment'), (req, res) =>{
  var formData = new FormData(req.body);
  var attachment;

  try {
    attachment = req.file.filename;
  } catch { attachment = null; }

  var data = JSON.stringify(formData);
  data = JSON.parse(data);  
  data.filename = attachment;
  console.log(data);
  data = JSON.stringify(data);
  
  var postReq = https.request(databaseServerOptionsPOST, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });   
       
   
  });
 
  postReq.write(data);
  postReq.end();

  postReq.on('error', function(err) {
    fs.unlinkSync('./uploads' + attachment);
    console.log();
    console.log(err);
    console.log();
    res.sendStatus(500);
  });    
})


app.get('/ticketsystem/tickets', (req, res) =>{ 
  axios.get(`https://${databaseServerOptionsGET.hostname}/api/ticketsystem/`).then(function (response) {
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error){
    console.log(error)
    if (error.response){
      let {status,statusText} = error.response;
      console.log(status,statusText);
      res.sendStatus(500);
    }
  })
})
