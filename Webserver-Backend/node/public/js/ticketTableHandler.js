// GET ALL TICKETS FROM THE DATABASE
function getTickets(){
    var xhr = new XMLHttpRequest();
    var url = "/ticketsystem/tickets"
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onload  = function() {
      const data = JSON.parse(xhr.responseText);
      addTicketToList(data);
      return;
    };
  
    xhr.send();
  }
  
  // ADD TICKETS TO THE TICKET LIST
  function addTicketToList(data){
    for(var key in data) {
          var ticket = data[key];
  
          var table = document.getElementById('ticketTable');
          var row = table.insertRow(0);
  
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          
	  var TicketDate = new Date(ticket.date);
	  var day = TicketDate.getUTCDate();
	  var month = TicketDate.getMonth() + 1;
	  var year = TicketDate.getUTCFullYear();

	  if(ticket.filename == 'null') {
	      ticket.filename = '';
	  }

          cell1.innerHTML = ticket.title;
          cell2.innerHTML = ticket.creator;
          cell3.innerHTML = `${day}.${month}.${year}`;
          cell4.innerHTML = ticket.description;
          cell5.innerHTML = ticket.category;
          cell6.innerHTML = ticket.status;
          cell7.innerHTML = ticket.filename;

   } 
  } 
  
  // CLEAR THE TICKET TABLE
  function clearTicketTable()
  {
    var table = document.getElementById('ticketTable');
    table.innerHTML = '';
  }
