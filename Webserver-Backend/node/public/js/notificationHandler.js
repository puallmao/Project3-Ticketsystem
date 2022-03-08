// DISPLAY NOTIFICATION
function displayNotification(alertType){
    var myAlert = document.getElementById(`notification-${alertType}`);    
    var bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();    
}

