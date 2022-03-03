// REQUIRE
const express = require('express')
const mariadb = require('mariadb');

// VARIABLES
const app = express();
const PORT = 80;
const webserverOptions = {
    hostname: '192.168.242.4',
    port: 80,
    path: '/ticketsystem',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
}

const sqlSettings = {
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "rootPG9",
    database: "projekt3"
}

// FUNCTIONS
async function insertTicket(data, sqlConnection){
    try{
        let conn = await sqlConnection.getConnection();
        let result = await conn.query(`INSERT INTO tickets (title, creator, date, description, category, status) VALUES ('${data.title}', '${data.creator}', '${data.date}', '${data.description}', '${data.category}', '${data.status}')`);
        console.log(result);
    } catch{
        console.log('[ERROR]: Can`t insert ticket');
    }
}


// USING
app.use(express.json());


// LISTEN ON PORT 8080
app.listen(
    PORT,
    () => console.log(`Listening on http://127.0.0.1:${PORT}`)
);


// REDIRECT TO TICKETSYSTEM
app.get('/', (req, res) =>{
    res.redirect('/api/ticketsytem')
})


// SEND THE TICKET DATA TO THE WEBSERVER
app.get('/api/ticketsystem', (req, res) =>{
    
})


// HANDLE THE POST OF THE TICKET DATA
app.post('/api/ticketsystem', (req, res) =>{
    var data = req.body
    var sqlConnection = mariadb.createPool({
        host: sqlSettings.host,
        user: sqlSettings.user,
	port: sqlSettings.port,
        password: sqlSettings.password,
        database: sqlSettings.database
    });

    console.log(data)

    insertTicket(data, sqlConnection);

    res.sendStatus(200)
})
