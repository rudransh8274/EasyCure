( function (){

    

    const cardHolder = document.getElementById("cardHolder");
    cardHolder.innerHTML = "";
    // cardHolder.setAttribute("style","background-color:#d6e5f3;");

    const card = document.createElement("div");
    card.setAttribute("class","container d-flex p-2");
    card.setAttribute("style","justify-content:space-evenly; align-items:center;background-color:#d6e5f3; flex-wrap:wrap;");

    const cardData = document.createElement("div");
    cardData.setAttribute("class","col-md-6");
    // cardData.setAttribute("style","background-color:tomato;");
    
    const title = document.createElement("h2");
    const name = document.createElement("b");
    name.innerText = "Rudransh Joshi";
    const docDegree = document.createElement("span");
    docDegree.innerText = " (MS) ";
    name.appendChild(docDegree);
    title.appendChild(name);
    cardData.appendChild(title);

    const clinicName = document.createElement("h4");
    clinicName.innerText = "Bhilwara's Top Clinic";
    cardData.appendChild(clinicName);

    const addressHolder = document.createElement("div");
    const plotNo = document.createElement("h6");
    plotNo.innerText = "Plot No: A-503";
    const landmark = document.createElement("h6");
    landmark.innerText = "Opposite GB road";
    const street = document.createElement("h6");
    street.innerText = "New kotha street";
    const city = document.createElement("h6");
    city.innerText = "Bhilwara";
    addressHolder.appendChild(plotNo);
    addressHolder.appendChild(landmark);
    addressHolder.appendChild(street);
    addressHolder.appendChild(city);
    cardData.appendChild(addressHolder);

    const consultationChargesHolder = document.createElement("div");
    consultationChargesHolder.setAttribute("class","d-flex flex-column");
    consultationChargesHolder.setAttribute("style","height:200px; width:200px; justify-content:center; align-items:center;");
    const chargesTitle = document.createElement("h4");
    chargesTitle.setAttribute("style","text-align:center; font-weight:bolder;");
    chargesTitle.innerText = `Consultation Charges`;
    const charges = document.createElement("h4");
    charges.setAttribute("class","mt-2");
    charges.setAttribute("style","font-weight:bolder;");
    charges.innerText = `Rs. 500`;
    consultationChargesHolder.appendChild(chargesTitle);
    consultationChargesHolder.appendChild(charges);


    const viewAvailability = document.createElement("button");
    viewAvailability.setAttribute("class","btn btn-dark");
    viewAvailability.setAttribute("style","height:40px;");
    viewAvailability.innerText = "View Availability";

    card.appendChild(cardData);
    card.appendChild(consultationChargesHolder);
    card.appendChild(viewAvailability);

    cardHolder.appendChild(card);
})();