var db = require('./db');

module.exports ={

    get: function(id, callback){
        var sql = "select * from patient where user_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result[0]);
                callback(result[0]);
            }else{
                callback([]);
            }
        });
    },

    getAll: function(callback){
        var sql = "select * from patient";
        db.getResults(sql, function(result){
            if(result.length > 0){
                callback(result);
            }else{
                callback([]);
            }
        });
    },

    insert: function(user, callback){
        var sql = "insert into patient values (NULL, '"+user.name+"', '"+user.email+"', '"+user.phone+"', '"+user.gender+"', '"+user.bloodtype+"', '"+user.propic+"', "+user.user_id+")";

        console.log(sql);

        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    update: function(user, callback){
        var sql = "update patient set name='"+user.name+"', email='"+user.email+"', phone='"+user.phone+"',gender='"+user.gender+"', bloodtype='"+user.bloodtype+"',propic='"+user.propic+"' where p_id="+user.p_id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },
    
	getAppointments: function(pid, callback){
        var sql = "select appointment.id,appointment.d_id,appointment.scheduled_date,appointment.status,doctor.name from appointment,doctor where appointment.d_id=doctor.d_id and p_id="+pid;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result);
                callback(result);
            }else{
                callback([]);
            }
        });
    },

	getPrescriptions: function(id, callback){
        var sql = "select * from prescription where p_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result);
                callback(result);
            }else{
                callback([]);
            }
        });
    },

	updatePassword: function(change, callback){
        var sql = "update users set password = "+change.newpassword+" where id="+change.id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

	/*updateAmount: function (user, callback){
        var sql = "update users set ammount="+user.amount+" where id="+user.id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

    delete: function(id, callback){
        var sql = "delete from users where id="+id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    }*/
}
