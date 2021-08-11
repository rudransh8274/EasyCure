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

        

        

  // function addressChecker() {
  //   const address = landmark.value + " " + street.value + " " + city.value;
  //   console.log(address);

  //   // const address = 'Saini Hardware Netaji Shubhash Chandra Bose Marg New Delhi';

  //   const geocode = ()=>{
  //     axios.get('http://www.mapquestapi.com/geocoding/v1/address',{
  //       params:{
  //         key:'ZTcKk73PtmJy4hNkU1q9GDVok6nvBbxQ',
  //         location:address,
  //       }
  //     })
  //     .then((response)=>{
  //       console.log(response.data.results[0].locations[0].latLng);
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //     });
  //   }
  //   geocode();
  // }
  // addressChecker();

  function passwordMatcher() {
    confirmPassword.setCustomValidity(confirmPassword.value != password.value ? "Passwords do not match." : "");
  }

  mySignupValidator = ()=>{
    passwordMatcher();
  }
  