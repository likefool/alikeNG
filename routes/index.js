var express = require('express');
var router = express.Router();
var fs = require('fs');
var liftModel = require('../models/lifts');
var data = JSON.parse(fs.readFileSync('data-init/lifts.json', 'UTF-8'));
var model = liftModel(data);

var calendarModel = require('../models/calendar');
var dataCal = JSON.parse(fs.readFileSync('data-init/calendar.json', 'UTF-8'));
var modelCal = calendarModel(dataCal);

/*
var request = require('request');
request('http://www.api.cloud.taipei.gov.tw/CSCP_API/pnc/cei/categories/1/topics', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
})
*/
var modelEvent = {};
var sqlite3 = require('sqlite3').verbose();
var eventsModel = require('../models/events');
var db = new sqlite3.Database('./db/events.db');
var eventsInLite = [];
db.each("select rowid AS id,* from lorem", function(err, row){
    //console.log(row.id + ": " + row.activityName);
    eventsInLite.push(JSON.parse(row.rowJson));
});
db.close(function(){
    //console.log(eventsInLite);        
    modelEvent = eventsModel(eventsInLite);
    modelEvent.fetch(function(eventA){
        console.log('load evnets from sqllite3:'+eventA.length);
    });
});

function printRoute(field, item) {
    if (field == "name") {
        return "/lift/" + item[field].replace(/ /g, "-");
    } else if (field == "status") {
        return "/lifts/status/" + item[field].replace(/ /g, "-");
    } else if (field == "type") {
        return "/lifts/" + item[field].replace(/ /g, "-");
    } else {
        return "/lifts/capacity/" + item[field].toString().replace(/ /g, "-");
    }
}

router.get('/', function (req, res) {
    res.render('index', { title: 'Snowtooth Lift Status API' });
});

router.get('/events', function (req, res) {
    modelCal.fetch(function (eventA) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(cals);
        } else {
            res.render('list', {
                title: 'All Snowtooth Events',
                description: 'All events at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(eventA[0]),
                items: eventA,
                printRoute: printRoute
            });
        }
    });
});

router.get('/calendar', function (req, res) {
    modelCal.fetch(function (cals) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(cals);
        } else {
            res.render('list', {
                title: 'All Snowtooth Calendars',
                description: 'All Calendars at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(cals[0]),
                items: cals,
                printRoute: printRoute
            });
        }
    });
});

router.get('/lifts', function (req, res) {
    model.fetch(function (lifts) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(lifts);
        } else {
            res.render('list', {
                title: 'All Snowtooth Lifts',
                description: 'All lifts at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(lifts[0]),
                items: lifts,
                printRoute: printRoute
            });
        }
    });
});

router.get('/lift/:name', function (req, res) {
    model.fetch({ name: req.params.name.replace(/-/g, " ") }, function (lift) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(lift);
        } else {
            res.render('oneLift', {
                title: lift.name,
                url: req.url,
                lift: lift
            });
        }
    });
});

router.get('/lifts/:type', function (req, res) {
    model.fetch({ type: req.params.type }, function (lifts) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(lifts);
        } else {
            res.render('list', {
                title: 'All Snowtooth Lifts',
                description: 'All lifts at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(lifts[0]),
                items: lifts,
                printRoute: printRoute
            });

        }
    });
});

router.get('/lifts/status/:status', function (req, res) {
    model.fetch({ status: req.params.status }, function (lifts) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(lifts);
        } else {
            res.render('list', {
                title: 'All Snowtooth Lifts',
                description: 'All lifts at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(lifts[0]),
                items: lifts,
                printRoute: printRoute
            });

        }

    });
});

router.get('/lifts/capacity/:capacity', function (req, res) {
    model.fetch({ capacity: parseInt(req.params.capacity) }, function (lifts) {
        if (req.ajax) {
            res.statusCode = 200;
            res.json(lifts);
        } else {
            res.render('list', {
                title: 'All Snowtooth Lifts',
                description: 'All lifts at snowtooth along with their status',
                url: req.url,
                fields: Object.keys(lifts[0]),
                items: lifts,
                printRoute: printRoute
            });
        }
    });
});

router.put('/lift/:name', function(req, res) {

    if (req.ajax) {
        if (req.body.status == 'open') {
            model.open(req.params.name.replace(/-/g," "));
        } else if (req.body.status == 'hold') {
            model.hold(req.params.name.replace(/-/g," "));
        } else {
            model.close(req.params.name.replace(/-/g," "));
        }

        res.json({ lift: req.params.name.replace(/-/g," "), status: req.body.status });

    } else {
        res.render('error', new Error("Cannot Update Lift"));
    }

});

module.exports = router;
