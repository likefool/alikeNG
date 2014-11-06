var sqlite3 = require('sqlite3').verbose();
var request = require('request');

var getLv1 = function(xargs, callback) {
	request('http://www.api.cloud.taipei.gov.tw/CSCP_API/pnc/cei/categories/' + xargs.cat_id + '/topics' , 
			function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(xargs, JSON.parse(body));
			//console.log(events);
		}
	})
}

var getLv2 = function(xargs, callback) {
	var eventL1 = xargs.eventL1;
	request('http://www.api.cloud.taipei.gov.tw/CSCP_API/pnc/cei/rows/'+ eventL1.topicId , 
			function(error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(xargs, JSON.parse(body));
		}
	});
}

var db = new sqlite3.Database('db/events.db');
db.serialize(function() {
    db.run("DROP TABLE IF EXISTS lorem");
    db.run("CREATE TABLE lorem (info TEXT)");
});


var getDB = function() { 
db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    console.log(row.id + ": " + row.info);
});
}

var addDB = function(eventA) { 
	var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	stmt.run(eventA.webPageTitle);
	stmt.finalize();
}

var rowNo = 0;
var progressNo = 0;

for (var cat_id = 1; cat_id <= 1; cat_id++) {
getLv1({'cat_id': cat_id}, function(args, eventsL1){
	//console.log(args.cat_id);
	rowNo += eventsL1.length;
	for (var i = 0; i < eventsL1.length; i++) {
		//var x = [];
		getLv2({'eventL1': eventsL1[i], 'cat_id': args.cat_id}, function(args, eventsL2){
			//console.log(eventsL2);
			//console.log(args);
			catId = args.cat_id;
			eventL1 = args.eventL1;
			for (var j = 0; j < eventsL2.length; j++) {
				all_event = eventsL2[j];
				all_event.topicId= eventL1.topicId;
				all_event.activityImg= eventL1.activityImg;
				all_event.catId= catId;
				//topic_events.push(all_event);
				//console.log(all_event.catId + ' : ' + all_event.topicId + ' : ' +all_event.webPageTitle);

				/*
				// insert into db
				var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
		        stmt.run(all_event.webPageTitle);
			    stmt.finalize();
			    */
			    addDB(all_event);

			    progressNo ++;
			    console.log(progressNo+'/'+rowNo);
			    if (progressNo == rowNo) {
			    	//console.log(all_event);
			    	getDB();
			    	db.close();
			    }
			}
		});
	}
});
}
 
//db.close();
	
/*
new_events.forEach(function(event, index, array){
	console.log(index + ':' + event.activityImg);
});
*/