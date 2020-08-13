var express=require('express');
var router = express.Router();
var docModel=require('../models/doctor');
var userModel=require('../models/user');

router.get('/',function (req,res){
    if(req.session.user_id!=null){
        userModel.get(req.session.user_id,function (results){
            console.log(results);
            docModel.get(req.session.user_id, function (result){
                console.log(result);
                req.session.docId=result[0].d_id;
                result[0].username=req.session.username;
                result[0].amount=results.ammount;
                res.render('doctor/index',result[0]);
            });

        });

    }
    else {
        res.redirect('/login');
    }
});

router.post('/', function (req,res){
    res.send("Under construction");
});

router.get('/settings',function (req,res){
    if(req.session.username!=null){
        docModel.get(req.session.user_id,function (result){
            var doctor=result[0];
            doctor.username=req.session.username;
            doctor.password=req.session.password;
            console.log(doctor);

            res.render('doctor/settings',doctor);
        })
    }
    else {
        res.redirect('/login');
    }
});

router.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "propic") is used to retrieve the uploaded file
    let propic = req.files.propic;
    var doctor={
        user_id:req.session.docId,
        propic:req.session.docId+propic.name

    };
    console.log(req.files.propic.name);
    // Use the mv() method to place the file somewhere on your server

    docModel.updateProPic(doctor,function (status) {
        if(status){
            propic.mv('assets/img/'+req.session.docId+propic.name, function(err) {
                if (err)
                    console.log(err.stack);

                res.redirect('/doctor');
            });
        }
        else {
            res.redirect('/doctor/settings');
        }
    });


});

router.post('/edit/:id',function (req,res){
    console.log(req.body);
    var user={
        id:req.body.user_id,
        username:req.body.username,
        password: req.body.password
    }
    console.log(user);
    userModel.update(user,function (status){
        if(status){
            var doctor={
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                gender:req.body.gender,
                license: req.body.license,
                qualifications:req.body.qualifications,
                specialty:req.body.specialty,
                user_id:req.body.user_id,
                id:req.body.id
            };
            docModel.update(doctor,function (status){
                if(status){
                    console.log('success');
                    res.redirect('/doctor');
                }
                else {
                    res.redirect('/doctor/settings');
                }
            });

        }
        else {
            res.redirect('/doctor/settings');
        }
    })
});


module.exports=router;
