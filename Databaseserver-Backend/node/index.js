// REQUIRE
const express = require('express')
const https = require('https')
const mariadb = require('mariadb');
const config = require('config');
const fs = require('fs');

// VARIABLES
const options = {
	key: fs.readFileSync(__dirname + config.get('server.key')),
	cert: fs.readFileSync(__dirname + config.get('server.cert'))
};
const app = express();
const PORT = config.get('server.port');
const sqlSettings = {
    host: config.get('sqlConnection.host'),
    port: config.get('sqlConnection.port'),
    database: config.get('sqlConnection.database'),
    user: config.get('sqlConnection.user'),
    password: config.get('sqlConnection.password')
}


// FUNCTIONS
async function insertTicket(data, sqlConnection){
    try{
        let conn = await sqlConnection.getConnection();
        let result = await conn.query(`INSERT INTO tickets (title, creator, date, description, category, status, filename) VALUES ('${data.title}', '${data.creator}', '${data.date}', '${data.description}', '${data.category}', '${data.status}', '${data.filename}')`);
        console.log(result);
        conn.end();
    } catch{
        console.log('[ERROR]: Can`t insert ticket');
    }
}

async function getTickets(sqlConnection){
    try{
        let conn = await sqlConnection.getConnection();
        let result = await conn.query('SELECT * FROM tickets');
	console.log(result);
        conn.end();
        return result;
    } catch {
        console.log('[ERROR]: Can`t get tickets');
        return null;
    }
}


// USING
app.use(express.json());


// LISTEN
//app.listen(
//    PORT,
//    () => console.log(`Listening on http://127.0.0.1:${PORT}`)
//);

const httpsServer = https.createServer(
	options,
	app
);

httpsServer.listen(PORT, () => {
	console.log(`Listening on https://127.0.0.1:${PORT}`);
});

// REDIRECT TO TICKETSYSTEM API
app.get('/', (req, res) =>{
    res.redirect('/api/ticketsytem')
});


// SEND THE TICKET DATA TO THE WEBSERVER
app.get('/api/ticketsystem', async(req, res) =>{
	console.log('test');
    var sqlConnection = mariadb.createPool({
	host: sqlSettings.host,
	user: sqlSettings.user,
	port: sqlSettings.port,
	password: sqlSettings.password,
	database: sqlSettings.database
    });

    var data = await getTickets(sqlConnection);   
    console.log(data)
    
    if(data){
        res.send(data);	
    } else {
        res.sendStatus(500);
    }
})


// HANDLE THE POST OF THE TICKET DATA
app.post('/api/ticketsystem', (req, res) =>{
   var data = req.body;
    console.log(data)  

    var sqlConnection = mariadb.createPool({
	host: sqlSettings.host,
	user: sqlSettings.user,
	port: sqlSettings.port,
        password: sqlSettings.password,
        database: sqlSettings.database
    });    

    insertTicket(data, sqlConnection);
    res.sendStatus(200)
})

