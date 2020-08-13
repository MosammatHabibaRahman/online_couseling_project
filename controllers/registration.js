var express=require('express');
var router = express.Router();
var userModel=require('../models/user');
var docModel=require('../models/doctor');

router.get('/',function (req,res){
    res.render('registration/index');
});

router.get('/doctor',function (req,res){
    res.render('registration/doctor');
});

router.get('/patient',function (req,res){
    res.render('registration/patient');
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
