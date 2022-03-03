window.onload = function(){
  document.getElementById('createTicket_button').addEventListener('click', submitTicket);
  document.getElementById('abortTicket_button').addEventListener('click', clearTicketCreation);
}

// SEND THE TICKET DATA TO THE WEBSERVER
function submitTicket(){
  var xhr = new XMLHttpRequest();
  var url = "/ticketsystem";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  
  var data = JSON.stringify({"title": document.getElementById('ticket-title').value,
                             "creator": document.getElementById('ticket-creator').value,
                             "date": document.getElementById('ticket-date').value,
                             "description": document.getElementById('ticket-description').value,
                             "category": document.getElementById('ticket-category').value,
                             "status": document.getElementById('ticket-status').value 
                            });
  xhr.send(data);
}

// CLEAR THE TICKET INPUTS
function clearTicketCreation(){
  document.getElementById('ticket-title').value = "";
  document.getElementById('ticket-creator').value = "";
  document.getElementById('ticket-date').value = "";
  document.getElementById('ticket-description').value = "";
  document.getElementById('ticket-catagory').selectedIndex = 0;
  document.getElementById('ticket-status').selectedIndex = 0;
}
