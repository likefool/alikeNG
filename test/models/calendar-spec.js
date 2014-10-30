var expect = require('chai').expect,
    model = require('../../models/calendar');

describe("Calendar Model", function () {

    function steps(steps, done) {
        var i = 0;
        return function () {
            if (++i == steps) {
                done();
            }
        }
    }

    beforeEach(function () {
        this.data = [
        {
            "id": "Snowface",
            "title": "Snow Face Concert",
            "img": "/img/snowface-sm.jpg",
            "start": "3/28/2015 09:00:00 AM",
            "end": "3/29/2015 11:00:00 PM",
            "description": "The Snow Face tour hits Snowtooth.  Tickets on sale now",
            "html": "<h3>Snowface Tickets on sale now!!</h3><p>To purchase your tickets goto this <a href=\"#\">fake link</a>.</p>"
        },
        {
            "id": "Party",
            "title": "Passholder Party",
            "img": "/img/party.jpg",
            "start": "4/10/2015 05:00:00 PM",
            "end": "4/10/2015 10:00:00 PM",
            "description": "Come join us at the annual snowtooth passholder party.",
            "html": "<h1>Party with the passholders</h1><ol><li>Come to the Mountain</li><li>Put your boots on</li><li>Ride the chairlift up to the top</li><li>Party with us!</li></ol>"
        },
        {
            "id": "Race",
            "title": "The Totally Fast Totally Nuts tour returns to snowtooth",
            "img": "/img/jump.jpg",
            "start": "2/12/2015 09:00:00 AM",
            "end": "2/12/2015 04:00:00 PM",
            "description": "Come out and watch this big skiers rip big pow!",
            "html": "<h3>Big MTN Ski Tour</h3><p>More info on this event can be found at this <a href=\"#\">fake link</a>.</p>"
        }
        ];
        this.eventModel = model(this.data);
    });

    it("should fetch all events", function (done) {
        this.eventModel.fetch(function (allEvents) {
            expect(allEvents).to.be.an.instanceof(Array);
            expect(allEvents.length).to.equal(3);
            done();
        });
    });


});
