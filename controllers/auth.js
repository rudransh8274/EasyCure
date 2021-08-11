const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
const session=require('express-session');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database: process.env.Database
});

var patientSess;

//for Patient login
exports.afterLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        db.query('Select * FROM patient_login WHERE email= ?', [email], async (error, results) => {
            if(error){
                console.log(error);
            }
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(400).render('patientLogin', {
                    message: 'Email or password is incorrect!',
                    messageClass:'alert-warning'
                });
            }

            else {
                //creating session
                db.query('select * from patient where email=?',[email],(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }else{
                        
                        sess=req.session;
                        sess.patient={};
                        sess.patient.city=result[0].city;
                        sess.patient.name=result[0].first_name;
                        sess.patient.ids=result[0].patient_id;

                        
                       // console.log(sess.patient);
                        patientSess=Object.assign(sess.patient);
                        
                       // console.log(patientSess);
                
                    }
                });
                // console.log(sess.city);
                
                //session


                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/searchDoctors");
            }
        })

    } catch (error) {
        console.log(error);
    }
}

//afterDrLogin
var doctorSess;
exports.viewBookingsDoc = async (req, res) => {
   
    try {
        const { email, password } = req.body;
      

        db.query('Select * FROM doctor_login WHERE email= ?', [email], async (error, results) => {
            if(error){
                console.log(error);
            }
           // console.log(results);
            // if (!results || !( await bcrypt.compare(password, results[0].password))) {
            //     res.status(400).render('doctorLogin', {
            //         message: 'Email or password is incorrect!',
            //         messageClass:'alert-warning'
            //     });
            // }

            else {
                //creating session
                db.query('select * from doctor where email=?',[email],(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                    }else{
                        
                        sess=req.session;
                        console.log(sess);
                        sess.doc={};
                        //sess.doc.city=result[0].city;
                        sess.doc.clinic=result[0].clinic_id;
                        sess.doc.idss=result[0].doctor_id;

                        
                       // console.log(sess.patient);
                        doctorSess=Object.assign(sess.doc);
                        
                        console.log(doctorSess);
                
                    }
                });

                
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("Token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);

                //query for retreiving bookings for doctor
                db.query('SELECT * FROM ((SELECT booking_id,patient_id,appointment_type, DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime FROM booking WHERE doctor_id = ?) filtered_booking) LEFT JOIN ((SELECT * FROM ((SELECT patient_id, first_name, last_name, age, email FROM patient) filtered_patient) LEFT JOIN ((SELECT patient_id,contact_number contact_no FROM patient_contact group by patient_id) filtered_patient_contact) USING (patient_id)) filtered_patient_join) USING (patient_id)', [doctorSess.idss], (err, result) => {
        
                    console.log(result);
            
                    if (err) {
                        console.log(err);
                    }
            
                    if (result.length === 0) {
                        return res.render('viewBookingsDoc', {
                            message: 'No Bookings Found',
                            messageClass:'alert-warning'
                        });
                    }
                    else{
                        //res.status(200).redirect("/viewBookingsDoc",{bookingDetails:JSON.stringify(result)});
                        return res.render('viewBookingsDoc',{bookingDetails:JSON.stringify(result)});
                    }
                });
                //below line needs to be deleted
                //res.status(200).redirect("/viewBookingsDoc");
            }
        })

    } catch (error) {
        console.log(error);
    }
}



exports.viewBookingsPat = (req,res) => {
    // console.log(req.body);

    // const { name, email, contact, plot, landmark, street, city } = req.body;

    db.query('SELECT DATE_FORMAT(appointment_Dtime,"%Y-%m-%d %T") appointment_Dtime,appointment_type,booking_id,booking.doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city from booking left join (SELECT doctor_id,clinic_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city FROM doctor JOIN clinic using (clinic_id) where city=?) as doc_clinic on booking.doctor_id=doc_clinic.doctor_id where booking.patient_id = ?', [patientSess.city,patientSess.ids], (error, results) => {
        
        console.log(results);

        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('viewBookingsPat', {
                message: 'No Bookings Found',
                messageClass:'alert-warning'
            });
        }
        else{
            return res.render('viewBookingsPat',{bookingDetails:JSON.stringify(results)});
        }
    });
}


exports.cancelBookingsPat = (req,res) => {
    console.log(req.body);
    const {booking_id}=req.body;
    console.log(req.body);
  
    db.query('DELETE from booking where booking_id=?',[booking_id],(errors,result)=>{
        if(errors){
            console.log(errors);
        }
    else{

    db.query('SELECT appointment_Dtime,appointment_type,booking_id,booking.doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city from booking left join (SELECT doctor_id,clinic_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city FROM doctor JOIN clinic using (clinic_id) where city=?) as doc_clinic on booking.doctor_id=doc_clinic.doctor_id where booking.patient_id = ?', [patientSess.city,patientSess.ids], (error, results) => {
        
        console.log(results);

        if (error) {
            console.log(error);
        }

        if (results.length === 0) {
            return res.render('viewBookingsPat', {
                message: 'No Bookings Found',
                messageClass:'alert-warning'
            });
        }
        else{
            return res.render('viewBookingsPat',{bookingDetails:JSON.stringify(results)});
        }
    });
    }
});
}



//function for patient registration
exports.patientSignup = (req, res) => {
    console.log(req.body);

    const { fname, lname, email, age, password, contact, altContact, house, street, city } = req.body;

    db.query('SELECT email from patient_login where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }


        if (results.length > 0) {
            return res.render('patientSignup', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);


        db.query('INSERT INTO patient_login SET ?', { email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

            }
        });


        db.query('INSERT INTO patient SET ?', { first_name: fname, last_name: lname, email: email, age: age, house_number: house, street: street, city: city }, (error, results) => {
            if (error) {
                console.log(error);
            } else {

        db.query('select max(patient_id) lastPatient from patient',(err,resu)=>{

                db.query('INSERT INTO patient_contact SET ?',{patient_id:resu[0].lastPatient,contact_number:contact},(error,results)=>{
                    if(error)
                    {
                        console.log(error);
                    }else{
                            console.log(results);
        
                    }
                });

                //For alternate contact number
                db.query('INSERT INTO patient_contact SET ?',{patient_id:resu[0].lastPatient,contact_number:altContact},(error,results)=>{
                    if(error)
                    {
                        console.log(error);
                    }else{
                            console.log(results);
        
                    }
                });

            });

                return res.render('patientLogin', {
                    message: 'User Registered!',
                    messageClass:'alert-primary'
                });
            }

        });

        



    });

    // res.send("Form Submitted");
}

//Wen patient selects specialization
//Needed doctor- doctor name,cnsultationcharges,full name,degree,specialization
//Needed clinic-,clinic name and full address

exports.searchDoctors = (req, res) => {

    

    const { specialization } = req.body;

    db.query('SELECT * FROM doctor WHERE specialization = ?', [specialization], (error, results, fields) => {

        // console.log(results);
        if (error) {
            console.log(error);
        }


        if (results.length === 0) {
            return res.render('searchDoctors', {
                message: 'Sorry, no doctors for selected specialization in your city!',
                messageClass:'alert-warning'
            });

        }

        db.query('SELECT doctor_id,first_name,last_name,consulting_charges,degree,specialization,clinic_name,plot_number,landmark,street,city FROM doctor JOIN clinic using (clinic_id) WHERE specialization=? and city=?',[specialization,patientSess.city],(err,data)=>{

            if(err)
            {
                console.log(err);
            }
            else if(data.length===0)
            {
                return res.render('searchDoctors', {
                message: 'Sorry, no doctors for selected specialization in your city!',
                messageClass:'alert-warning'   
            });
        }
            else{

                console.log(data);
            return res.render('afterSearch', { items: JSON.stringify(data)});

            }
        })
        
        // let clinicData = {};

        // const chirag = () => {
        //     return new Promise((resolve, reject)=>{
        //         setTimeout(()=>{
        //             var i = 0;
        //             results.forEach((e) => {
    
        //                 db.query('SELECT clinic_name,plot_number,landmark,street,city FROM clinic where clinic_id= ?', [e.clinic_id], (err, data) => {
         
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        
        //                             clinicData = Object.assign(clinicData, data[0]);
        //                            resolve(clinicData); 
        //                         }  
        //                     }
        //                 );      
        //             });

        //         },1000);
     
        //     });
        // }

        // const chiragCaller=async()=>{
        //     console.log(results);
        //     const clinicData2=await chirag();
        //     console.log(clinicData2);
            
        // }
        // chiragCaller();




        // db.query('')

        

    });


}




exports.doctorSignup = (req, res) => {
    console.log(req.body);

    const { clinicId, fname, lname, email, consultingCharges, password, contactNo, altContactNo, degree, specialization } = req.body;

    db.query('SELECT email from doctor_login where email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }


        if (results.length > 0) {
            return res.render('doctorSignup', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }




        //for clinic id search

        db.query('SELECT * from clinic WHERE clinic_id =?', [clinicId], async (err, results) => {
            if (err) {
                console.log(err);

            } else if (results.length > 0) {
                //entering into table=doctor_login

                let hashedPassword = await bcrypt.hash(password, 8);
                console.log(hashedPassword);


                db.query('INSERT INTO doctor_login SET ?', { email: email, password: hashedPassword }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);

                    }
                });

                //entering into table=doctor
                db.query('INSERT INTO doctor SET ?', { first_name: fname, last_name: lname, email: email, clinic_id: clinicId, degree: degree, consulting_charges: consultingCharges, specialization: specialization }, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        
                        db.query('select max(doctor_id) lastDoctor from doctor',(err,resu)=>{

                            db.query('INSERT INTO doctor_contact SET ?',{doctor_id:resu[0].lastDoctor,contact_no:contactNo},(error,results)=>{
                                if(error)
                                {
                                    console.log(error);
                                }else{
                                        console.log(results);
                    
                                }
                            });
            
                            //For alternate contact number
                            db.query('INSERT INTO doctor_contact SET ?',{doctor_id:resu[0].lastDoctor,contact_no:altContactNo},(error,results)=>{
                                if(error)
                                {
                                    console.log(error);
                                }else{
                                        console.log(results);
                    
                                }
                            });
            
                        });
            

                        return res.render('doctorSignup', {
                            message: 'Data Saved, you will get registered once authenticated!',
                            messageClass:'alert-primary'
                        });
                    }

                });

            }
            else {
                return res.render('doctorSignup', {
                    message: 'Your clinic is not registered, kindly register your clinic first!',
                    messageClass:'alert-warning'
                });
            }
        });

        //End-for clinic id search       

    });

}

exports.bookDoctor=(req,res)=>{
    return res.render('bookDoctor');
}


//Clinic Registration
exports.registerPractice = (req, res) => {
    console.log(req.body);

    const { name, email, contact, plot, landmark, street, city } = req.body;

    db.query('SELECT email from clinic where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'The email is already in use',
                messageClass:'alert-warning'
            });
        }


        // let hashedPassword = await bcrypt.hash(password,8);
        // console.log(hashedPassword);

        db.query('INSERT INTO clinic SET ?', { clinic_name: name, email: email, contact_no: contact, plot_number: plot, landmark: landmark, street: street, city: city }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

                return res.render('registerPractice', {
                    message: 'Authentication initiated...Please check your mail for document submission!',
                    messageClass:'alert-primary'
                });
            }

        });
    });


}

//Booking
exports.bookingEntry = (req, res) => {
    console.log(req.body);

    const { docId, dateBooked,timeBooked,appointment_type} = req.body;
    const dTime=dateBooked + ' ' + timeBooked + ':00';

    db.query('SELECT appointment_Dtime,doctor_id from booking where appointment_Dtime= ? and doctor_id = ?', [dTime,docId], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('bookDoctor', {
                message: 'This slot is unavailable, try another slot!',
                messageClass:'alert-warning'
            });
        }

        
        console.log(patientSess);
        db.query('INSERT INTO booking SET ?', { appointment_Dtime: dTime, patient_id:patientSess.ids, doctor_id: docId,appointment_type:appointment_type}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);

                return res.render('bookDoctor', {
                    message: 'Appointment Fixed!',
                    messageClass:'alert-primary'
                });
            }

        });
    });
    
}
