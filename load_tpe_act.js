//var new_events = {};
//var new_event = {};
//var BreakException= {};
var request = require('request');

var getLv2 = function(x, topicId, callback) {
	//var events;
	request('http://www.api.cloud.taipei.gov.tw/CSCP_API/pnc/cei/rows/'+topicId, 
			function(error, response, body){
		if (!error && response.statusCode == 200) {
			callback(x, JSON.parse(body));
		}
	});
	//return events;
}

var getLv1 = function(x, cat_id, callback) {
	//var 
	//all_events = {};
	request('http://www.api.cloud.taipei.gov.tw/CSCP_API/pnc/cei/categories/'+cat_id+'/topics', 
			function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(x, JSON.parse(body));
			//console.log(events);
			/*
			for (var i = 0; i < events.length; i++) {
				topic_events = {};
				var callbackLv2 = function(topic_events) {
					for (var j = 0; j < topic_events.length; j++) {
						all_event = topic_events[j];
						all_event.topicId= events[i].topicId;
						all_event.activityImg= events[i].activityImg;
						all_event.catId= cat_id;
						topic_events.push(all_event);
					}
				}

				getLv2(events[i].topicId, callbackLv2);

			}*/
		}
	})
}

/*
for (var cat_id = 1; cat_id <= 2; cat_id++) {

}
*/
var new_events = {} ;
getLv1(new_events, 1, function(args, events){
	//console.log(events);
	for (var i = 0; i < events.length; i++) {
		//var x = [];
		getLv2(events, events[i].topicId, function(eventsL1, eventsL2){
			console.log(eventsL2);
			//console.log(eventsL1);
		});
		//console.log(x);
	}
	/*
	var callbackLv2;
	for (var i = 0; i < events.length; i++) {
		topic_events = {};
		callbackLv2 = function(topic_events) {
			for (var j = 0; j < topic_events.length; j++) {
				all_event = topic_events[j];
				all_event.topicId= events[i].topicId;
				all_event.activityImg= events[i].activityImg;
				all_event.catId= cat_id;
				topic_events.push(all_event);
			}
		}
		getLv2(events[i].topicId, callbackLv2);

	}
	*/
});
//console.log(new_events);

/*
new_events.forEach(function(event, index, array){
	console.log(index + ':' + event.activityImg);
});
*/