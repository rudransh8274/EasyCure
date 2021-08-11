const express=require('express');
var bodyParser= require('body-parser');

var urlencodedParser=bodyParser.urlencoded({extended:false});

const router=express.Router();

router.get('/',urlencodedParser,(req,res)=>{
    res.render("index");
});

//For Patient
router.get('/patientLogin',urlencodedParser,(req,res)=>{
    res.render("patientLogin");
});

router.get('/patientSignup',urlencodedParser,(req,res)=>{
    res.render("patientSignup");
});

router.get('/searchDoctors',urlencodedParser,(req,res)=>{
    res.render("searchDoctors");
});

router.get('/afterSearch',urlencodedParser,(req,res)=>{
    res.render("afterSearch");
});

//For Doctor
router.get('/doctorLogin',urlencodedParser,(req,res)=>{
    res.render("doctorLogin");
});

router.get('/doctorSignup',urlencodedParser,(req,res)=>{
    res.render("doctorSignup");
});

// router.get('/afterLogin',urlencodedParser,(req,res)=>{
//     res.render("afterLogin");
// });


//Register Practice
router.get('/registerPractice',urlencodedParser,(req,res)=>{
    res.render("registerpractice");
});

router.get('/auth/bookDoctor',urlencodedParser,(req,res)=>{
    res.render("bookDoctor");
});

router.get('/viewBookingsPat',urlencodedParser,(req,res)=>{
    res.render("viewBookingsPat");
});

router.get('/auth/viewBookingsPat',urlencodedParser,(req,res)=>{
    res.render("viewBookingsPat");
});

router.get('/auth/cancelBookingsPat',urlencodedParser,(req,res)=>{
    res.render("viewBookingsPat");
});

router.get('/afterDrLogin',urlencodedParser,(req,res)=>{
    res.render("viewBookingsDoc");
});
router.get('/viewBookingsDoc',urlencodedParser,(req,res)=>{
    res.render("viewBookingsDoc");
});

router.get('/auth/viewBookingsDoc',urlencodedParser,(req,res)=>{
    res.render("viewBookingsDoc");
});

router.get('/auth/afterDrLogin',urlencodedParser,(req,res)=>{
    res.render("viewBookingsDoc");
});

module.exports=router;