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

	insert: function(record, callback){
        var sql = "insert into healthrecord values (NULL, '"+record.height+"', '"+record.weight+"', '"+record.bp+"', '"+record.pulseRate+"', '"+record.mood+"', '"+record.sleepDuration+"', '"+record.description+"', "+record.p_id+",NULL)";

        console.log(sql);

        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

	update: function(record, callback){
        var sql = "update healthrecord set height='"+record.height+"', weight='"+record.weight+"', bp='"+record.bp+"',pulseRate='"+record.pulseRate+"',mood='"+record.mood+"',sleepDuration='"+record.sleepDuration+"',description='"+record.description+"' where p_id="+record.p_id;
        db.execute(sql, function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
    },

}