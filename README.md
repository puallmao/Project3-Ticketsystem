# **Project3-Ticketsystem**

This is my solution for the Ticketsystem required for the Project-3 in LF9.     

The Ticketsystem consists of two parts. The Webserver and the Database-API. The backend of both is written using node.js and express.js. The Frontend is build with plain HTML, JavaScript and CSS. Bootstrap 5 is being used for styling.

<br>


## **Requirements**
To run the Webserver and the Database-API on your System, you need to have [Node.js](https://nodejs.org/en/) installed. 

<br>

## **Deploy Webserver**
All the necessary files for the Webserver are located in the Webserver-Backend folder.

- Copy the **whole** Folder to your Machine, you want to run the Webserver on.

- The Webserver is listening on Port 80. Depending on the System you want to use, Firewall changes may be necessary.


### **Run the Webserver**
*Execute in "./Webserver-Backend/node"*
```bash
$   npm start
```

### **Config**
Use the additional Config-File. *".webserver-backend/node/config/local.toml"*   
**Don't edit the *"default.toml"*!**

<br>

## **Deploy Database-API**
All the necessary files for the Webserver are located in the Databaseserver-Backend folder.

- Copy the **whole** Folder to your Machine, you want to run the Webserver on.

- The Database-API is listening on Port 80. Depending on the System you want to use, Firewall changes may be necessary.

### **Run the Database-API**
*Execute in "./databaseserver-backend/node"*
```bash
$   npm start
```

### **Config**
Use the additional Config-File. *".databaseserver-backend/node/config/local.toml"*  
**Don't edit the *"default.toml"*!**

### **Setup Database** 
The Database-API ist build to use MariaDB. Make sure to install and configure it before using the API. 

Use the provided tickets.sql. 

<br>

*Changing some code is probably required, since there are no proper config-files yet.*