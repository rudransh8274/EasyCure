const express=require('express');
var bodyParser= require('body-parser');
const session=require('express-session');

var urlencodedParser=bodyParser.urlencoded({extended:false});

const authController=require('../controllers/auth');
const router=express.Router();

//after form submission, it has its action=auth/register then it wil call a funciton=register which is in auth controller
//which has been exported upwards, i.e. on another directory=contorllers/auth
router.post('/patientLogin', authController.patientSignup);
router.post('/registerPractice', authController.registerPractice);  
router.post('/afterLogin', authController.afterLogin);
router.post('/doctorSignup', authController.doctorSignup);
router.post('/searchDoctors', authController.searchDoctors);
router.post('/bookDoctor',authController.bookDoctor);
router.post('/bookingEntry',authController.bookingEntry);
router.post('/viewBookingsPat',authController.viewBookingsPat);
router.post('/cancelBookingsPat',authController.cancelBookingsPat);
router.post('/viewBookingsDoc',authController.viewBookingsDoc);



// router.post('/login', authController.login);
module.exports=router;