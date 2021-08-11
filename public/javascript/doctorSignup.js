degreeTypes = {
  MD: ["Anaesthesiology", "Biochemistry", "Community Health", "Dermatology", "Family Medicine", "Forensic Medicine", "General Medicine", "Microbiology", "Paediatrics", "Palliative Medicine", "Pathology", "Skin and Venereal diseases", "Pharmacology", "Physical Medicine and Rehabilitation", "Physiology", "Preventive and Social Medicine", "Psychiatry", "Radio-Diagnosis", "Radio-Therapy", "Tuberculosis and Respiratory diseases", "Emergency and Critical care", "Nuclear Medicine", "Transfusion Medicine", "Tropical Medicine"],
  MS: ["ENT", "General Surgery", "Opthalmology", "Orthopaedics", "Obsetrics, and Gynaecology", "Dermatology, Vererology, and Leprosy"],
  DNB: ["Anaesthesiology", "Anatomy", "Biochemistry", "Dermatology", "Emergency Medicine", "Family Medicine", "Field Epidemiology", "Forensic Medicine", "General Medicine", "General Surgery", "Health Administration"],
  DM: ["Psychiatry", "Cardiology", "Cardiac-Anaesthesiology", "Pulmonary and Sleep disorders", "Cardiology", "Obstetrics and Gynecology", "Haematology", "Nuclear Medicine", "Pharmacology", "Cardiac-Radiology", "Anaesthesiology, Pain Medicine and Critical Care", "Paediatrics", "Endocrinology", "Nephrology", "Gastroenterology", "Neuro-Anaesthesiology and Critical Care", "Medicine and Microbiology", "Neurology", "Onco-Anesthesiology and Palliative Medicine"],
  BDS: [],
  BAMS: [],
  BHMS: [],
  BUMS: [],
};

// Function to show degree types
(function () {

  const degreeTypeContainer = document.getElementById("degree");
  
  degreeTypeContainer.innerHTML="";

  for (let degreeType in degreeTypes) {
    const option = document.createElement("option");
    option.innerText = degreeType;
    degreeTypeContainer.appendChild(option);
  }

  degreeTypeContainer.selectedIndex = 4;
})();

const loadSpecializations = (event) => {
  const degree = event.target.value;
  const specializationContainer = document.getElementById("specialization");
  
  specializationContainer.innerHTML="";
  const option = document.createElement("option");
  option.innerText = "None";
  specializationContainer.appendChild(option);
  
  degreeTypes[degree].forEach((specialization)=>{
    const option = document.createElement("option");
    option.innerText = specialization;
    specializationContainer.appendChild(option);

    specializationContainer.selectedIndex = 0;
    // specializationContainer.options[specializationContainer.selectedIndex].defaultSelected = true;
  });
}

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

// function consultingChargesChecker() {
//   consultingCharges.setCustomValidity(consultingCharges.value > 2500 ? "Please keep your charges under Rs 2500" : "");
// }

function passwordMatcher() {
  confirmPassword.setCustomValidity(confirmPassword.value != password.value ? "Passwords do not match." : "");
}

function mySignupValidator() {
  passwordMatcher();
}