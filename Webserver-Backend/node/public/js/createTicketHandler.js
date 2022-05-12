window.onload = function(){
  document.getElementById('createTicket_button').addEventListener('click', submitTicket);
  document.getElementById('abortTicket_button').addEventListener('click', clearTicketCreation);
  getTickets();
}

// // SEND THE TICKET DATA TO THE WEBSERVER
// function submitTicket(){
//   if (isTicketFormValid()){
//     var xhr = new XMLHttpRequest();
//     var url = "/ticketsystem";
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
    
//     xhr.onload  = function() {
//       console.log (xhr.status);
//       if (xhr.status >= 500){
//         displayNotification("error")
//       } else if (xhr.status >= 300 && xhr.status <= 400){
//         displayNotification("warning");
//       } else if (xhr.status < 300){
//         displayNotification("success");
//       }
//       return;
//     };

//     var data = JSON.stringify({"title": document.getElementById('ticket-title').value,
//                               "creator": document.getElementById('ticket-creator').value,
//                               "date": document.getElementById('ticket-date').value,
//                               "description": document.getElementById('ticket-description').value,
//                               "category": document.getElementById('ticket-category').value,
//                               "status": document.getElementById('ticket-status').value 
//                               });
       
//     xhr.send(data);
//   }
//   else {
//     displayNotification("error");
//   }
// }

// SEND THE TICKET DATA TO THE WEBSERVER
function submitTicket(){
  if (isTicketFormValid()){
    var xhr = new XMLHttpRequest();
    var url = "/ticketsystem";
    xhr.open("POST", url, true);
    
    xhr.onload  = function() {
      console.log (xhr.status);
      if (xhr.status >= 500){
        displayNotification("error")
      } else if (xhr.status >= 300 && xhr.status <= 400){
        displayNotification("warning");
      } else if (xhr.status < 300){
        displayNotification("success");
      }
      return;
    };

    var data = new FormData();
    var fileInput = document.getElementById('ticket-attachment');
    data.append("title", document.getElementById('ticket-title').value);
    data.append("creator", document.getElementById('ticket-creator').value);
    data.append("date", document.getElementById('ticket-date').value);
    data.append("description", document.getElementById('ticket-description').value);
    data.append("category", document.getElementById('ticket-category').value);
    data.append("status", document.getElementById('ticket-status').value);
    data.append("attachment", fileInput.files[0]);
    console.log(data);
       
    xhr.send(data);
    clearTicketCreation();
  }
  else {
    displayNotification("error");
  }
}

// CLEAR THE TICKET INPUTS
function clearTicketCreation(){
  document.getElementById('ticket-title').value = "";
  document.getElementById('ticket-creator').value = "";
  document.getElementById('ticket-date').value = "";
  document.getElementById('ticket-description').value = "";
  document.getElementById('ticket-category').selectedIndex = 0;
  document.getElementById('ticket-status').selectedIndex = 0;
  document.getElementById('ticket-attachment').value = "";
}

// CHECK IF TICKET-FORM IS VALID
function isTicketFormValid(){
  var ticketForm = document.getElementById('ticketForm');
  return ticketForm.checkValidity();
}
