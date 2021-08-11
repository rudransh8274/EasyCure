const choosenDocDet = JSON.parse(localStorage.getItem("choosenDocDet"));
const pageTitle = document.getElementsByClassName("page-title")[0];
pageTitle.innerText = pageTitle.innerText +" "+ choosenDocDet["first_name"] +" "+ choosenDocDet["last_name"];

document.getElementById("docId").value=`${choosenDocDet.doctor_id}`;
console.log(document.getElementById("docId").value);
// Date Ranger --> Begin
const dateFormater = (inputDate)=>{
    let day = inputDate.getDate();
    let month = inputDate.getMonth()+1; //January is 0
    let year = inputDate.getFullYear();
    if(day<10){
        day='0'+day;
    } 
    if(month<10){
        month='0'+month;
    }
    inputDate = year+'-'+month+'-'+day;
    return inputDate;
}

let today = new Date();
today = dateFormater(today);
document.getElementById("dateBooked").setAttribute("min", today);
document.getElementById("dateBooked").setAttribute("value", today);

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let date = new Date();
let monthFromToday = date.addDays(30);
monthFromToday = dateFormater(monthFromToday);
document.getElementById("dateBooked").setAttribute("max", monthFromToday);
// Date Ranger --> End

// Time Ranger --> Begin
function attachZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var d = new Date();
var h = attachZero(d.getHours());
var m = attachZero(d.getMinutes());

document.getElementById("timeBooked").setAttribute("value", h + ":" + m);

function dateChecker(){
    const dateBooked=document.getElementById("dateBooked").value;
    console.log(dateBooked);
    console.log(today);
    var d = new Date();
    var h = attachZero(d.getHours());
    var m = attachZero(d.getMinutes());

    if(dateBooked==today)
    {       
        document.getElementById("timeBooked").setAttribute("min", h + ":" + m);
    }
}

 // Time Ranger --> End

// Form Validator --> Start
(function () {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        }

        form.classList.add('was-validated')
    }, false);
    })
})();
// Form Validator --> End

const populateModalBody = ()=>{
    const modalBody = document.getElementsByClassName("modal-body")[0];
    modalBody.setAttribute("style","text-transform:capitalize;");

    const dateBooked = document.getElementById("dateBooked").value;
    let timeBooked = document.getElementById("timeBooked").value;

    let minutes = parseInt(timeBooked.slice(3,5));
    timeBooked = timeBooked.slice(0,3);
    let timeEnd = timeBooked;

    const timeBookedID=document.getElementById("timeBooked");

    if(minutes < 15){
        timeBooked += "15";
        timeEnd += "30";
    }
    else if(minutes < 30){
        timeBooked += "30";
        timeEnd += "45";
    }
    else if(minutes < 45){
        timeBooked += "45";
        timeEnd += "00";
        let hours = parseInt(timeEnd.slice(0,2));
        timeEnd = timeEnd.slice(2,5);
        ++hours;
        timeEnd = attachZero(`${hours}`) + timeEnd;
    }
    else{
        timeBooked += "00";
        let hours = parseInt(timeBooked.slice(0,2));
        timeBooked = timeBooked.slice(2,5);
        ++hours;
        timeBooked = attachZero(`${hours}`) + timeBooked;
        timeEnd = attachZero(`${hours}`) + ":15";
    }
    timeBookedID.value=timeBooked;

    modalBody.innerHTML = `
    <h2><b>Dr. ${choosenDocDet["first_name"]} ${choosenDocDet["last_name"]} (${choosenDocDet["degree"]})</b></h2>

    <h4>
    ${choosenDocDet["specialization"]}, ${choosenDocDet["clinic_name"]}
    </h4>
    
    <div class="d-flex" style="justify-content:space-evenly">
        <div>
            <h6>
            <br><br>
            <b>Address</b>
            <br>
            Plot No. : ${choosenDocDet["plot_number"]}
            <br>
            Landmark : ${choosenDocDet["landmark"]}
            <br>
            Street : ${choosenDocDet["street"]}
            <br>
            City : ${choosenDocDet["city"]}
            </h6>
            <br>
            <h6>
            <b>Charges</b>
            <br>
            Rs. ${choosenDocDet["consulting_charges"]}
            </h6>
        </div>
        <div>
            <h6>
            <br><br>
            <b>Date To Be Booked</b>
            <br>
            ${dateBooked}
            <br>
            </h6>
            <br>
            <h6>
            <b>Slot Timing</b>
            <br>
            ${timeBooked} - ${timeEnd}
            </h6>
        </div>
    </div>
    `;
}