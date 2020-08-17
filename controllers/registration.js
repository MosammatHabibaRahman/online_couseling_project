var express=require('express');
var router = express.Router();
var userModel=require('../models/user');
var docModel=require('../models/doctor');
var patientModel = require('../models/patient');

router.get('/',function (req,res){
    res.render('registration/index');
});

router.get('/doctor',function (req,res){
    res.render('registration/doctor');
});

router.get('/patient',function (req,res){
    res.render('registration/patient');
});

router.post('/patient',function (req,res){
	console.log(req.body);
    var user={
        username:req.body.username,
        password:req.body.password,
        status: "patient"
    };
    var userFlag;
	if(req.body.name=="" || req.body.phone=="" || req.body.email==""){
		res.send("Name, phone or email fields cannot be empty! <a href="+"/registration/patient"+">Try Again</a>");
	}
	else if(req.body.phone.length > 15)
	{
		res.send("Phone cannot be longer than 15 characters. <a href="+"/registration/patient"+">Try Again</a>");
	}
	else
	{
		userModel.insert(user,function (result){
        console.log(result);
        if(result){
            userModel.validate(user, function (results){
                console.log(results);
                if(results!=false){
                    var patient={
                        name:req.body.name,
                        phone:req.body.phone,
                        email:req.body.email,
                        gender:req.body.gender,
                        bloodtype: req.body.bloodtype,
                        propic:req.body.propic,
                        user_id:results[0].id
                    };
					
					patientModel.insert(patient,function (status){
						if(status){
							console.log(status);
							res.redirect('/login');
						}
						else{
							console.log(status);
							res.redirect('registration/patient');
						}
					});
                }
                else{
                    res.send("username taken");
                }
            });
        }
        else{
            res.send("username taken </br> <a href='/registration/patient'>try again</a>");
        }
    });
	}

});

router.post('/doctor',function (req,res){
    console.log(req.body);
    var user={
        username:req.body.username,
        password:req.body.password,
        status: "doctor"
    };
    var userFlag;
    userModel.insert(user,function (result){
        console.log(result);
        if(result){
            userModel.validate(user, function (results){
                console.log(results);
                if(results!=false){
                    var doctor={
                        name:req.body.name,
                        phone:req.body.phone,
                        email:req.body.email,
                        gender:req.body.gender,
                        license: req.body.license,
                        qualifications:req.body.qualifications,
                        specialty:req.body.specialty,
                        user_id:results[0].id
                    };
                    docModel.insert(doctor,function (status){
                        if(status){
                            res.render("login/index");
                        }
                        else{
                            res.render("registration/doctor");
                        }
                    });
                }
                else{
                    res.send("username taken");
                }
            });
        }
        else{
            res.send("username taken </br> <a href='/registration/doctor'>try again</a>");
        }
    });

});



module.exports=router;
