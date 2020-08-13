var db = require('./db');

module.exports = {

checkRecord: function(id, callback){
        var sql = "select * from healthrecord where p_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(true);
                callback(true);
            }else{
                callback(false);
            }
        });
    },

	getRecord: function(id, callback){
        var sql = "select * from healthrecord where p_id="+id;
        db.getResults(sql, function(result){
            if(result.length > 0){
                console.log(result[0]);
                callback(result[0]);
            }else{
                callback([]);
            }
        });
    },

}