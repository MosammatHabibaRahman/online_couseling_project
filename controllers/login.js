var express=require('express');
var router = express.Router();
var userModel=require('../models/user');

router.get('/',function (req,res){
    res.render('login/index');
});

router.post('/', function (req,res){
    var user={
        username:req.body.username,
        password:req.body.password
    };
    userModel.validate(user,function (results) {
        if(results!=false){
            req.session.user_id=results[0].id;
            req.session.username=results[0].username;
            req.session.password=results[0].password;
            req.session.status=results[0].status;
            req.session.amount=results[0].ammount;
            if(req.session.status=="doctor"){
                res.redirect('/doctor');
            }
            else if(req.session.status=="patient"){
				res.redirect('/patient');
            }
			else if(req.session.status=="staff"){

            }
            else {
				//res.send('invalid username or password');
            }
        }
    });
});



module.exports=router;
