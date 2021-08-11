const showDocType = ()=>{
    this.doctypes = new Array(
        "Dentist",
        "ENT Specialist",
        "Gynaecologist",
        "Paediatrician",
        "Pulmonologist"
    );
    const doctypeContainer = document.getElementById("doc-type");
    
    // console.log(doctypeContainer.innerText);
    var i=0;
    setInterval(() => {
        if(i<this.doctypes.length){
            const j = i;
            i += 1;
            doctypeContainer.innerText = (this.doctypes[j]);
        }else{
            i = 0;
            doctypeContainer.innerText =  this.doctypes[0];
        }
    }, 1000);
};

showDocType();