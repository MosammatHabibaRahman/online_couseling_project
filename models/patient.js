var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from patient where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from patient";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql = "select * from users where username=? and password=?";
		db.getResults(sql, [user.uname, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into patient values(?, ?, ?, ?, ?, ?, ?, ?)";

		db.execute(sql, ['', user.name, user.email, user.phone, user.gender, user.bloodtype, user.propic,''], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update patient set name=?, email=?, phone=?, gender=?, bloodtype=?, propic=? where id=?" ;
		db.execute(sql, [user.name, user.email, user.phone, user.gender, user.bloodtype, user.propic,'',user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from patient where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}