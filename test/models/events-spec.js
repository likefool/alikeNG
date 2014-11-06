var expect = require('chai').expect,
    model = require('../../models/events');

describe("Event Model", function () {

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
               "activityImg": "http://express.culture.gov.tw/Files/Event/LogoTemp/3ee7552070ab440b9981e902a5d0314d.jpg",
               "topicId": "1668",
               "catId": 5,
               "pb_organization": "臺北市政府文化局文化快遞網站",
               "lat": "25.053279",
               "lng": "121.52216099999998",
               "activityName": "魔幻月光 Magic in the Moonlight",
               "locationAddr": "中山北路二段18號",
               "activityStartDate": "2014-11-01 00:00:00.0",
               "activityEndDate": "2014-11-20 00:00:00.0",
               "activityStartHour": "",
               "activityEndHour": "",
               "webPageTitle": "魔幻月光 Magic in the Moonlight",
               "webPageContent": ""
            },
            { 
                "activityImg": '',
                "topicId": '19',
                "catId": 1, 
                "pb_organization": '臺北市政府文化局文化快遞網站',
                "lng": '121.563',
                "lat": '25.0431',
                "activityName": '快樂星期三',
                "locationAddr": '臺北市信義區忠孝東路4段553巷20號(近市政府捷運站)',
                "activityStartDate": '2014-02-05 00:00:00.0',
                "activityEndDate": '2014-12-31 00:00:00.0',
                "activityStartHour": '',
                "activityEndHour": '',
                "webPageTitle": '快樂星期三',
                "webPageContent": '\r\n快樂星期三\r\nHappy Wednesday\r\n\r\n時間：每週三 8:00PM\r\n\r\nComedy Club 最牛企劃「快樂星期三」\r\n免費入場、低消100元，一樣給你最佳的表演！\r\n\r\n＊免費入場，低消100元\r\n＊在表演結束後，便進入Open Mic時段，歡迎大家上台試試自己搞笑的功夫，可獲得免費的飲料或小禮物。報名去！\r\n＊每月第二週「ok的即興工作室」即興劇演出\r\n＊歡迎舉辦求婚、慶生等各式派對！\r\n'
            },
            {
               "activityImg": "http://express.culture.gov.tw/Files/Event/LogoTemp/d8f3056bf78b4f7fbb3f830b7d7f8e65.jpg",
               "topicId": "1986",
               "catId": 5,
               "pb_organization": "臺北市政府文化局文化快遞網站",
               "lng": "121.53333999999995",
               "lat": "25.0573936",
               "activityName": "黃金時代－－電影原創劇本",
               "locationAddr": "松江路209號",
               "activityStartDate": "2014-10-21 00:00:00.0",
               "activityEndDate": "2014-11-30 00:00:00.0",
               "activityStartHour": "",
               "activityEndHour": "",
               "webPageTitle": "黃金時代－－電影原創劇本",
               "webPageContent": ""
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

    it("should fetch a single eventA by name", function () {
        var self = this;
        this.eventModel.fetch({ topicId: '1986'}, function (eventA) {
            expect(eventA).to.deep.equal(self.data[2]);
        });
    });
/*    
    it("should fetch lifts by status", function (done) {

        var self = this,
            finished = steps(3, done);

        this.liftModel.fetch({ status: 'closed' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[3]);
            finished();
        });

        this.liftModel.fetch({ status: 'hold' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[2]);
            finished();
        });

        this.liftModel.fetch({ status: 'open' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(2);
            expect(lifts[0]).to.deep.equal(self.data[0]);
            finished();
        });

    });*/

    it("should fetch events by catId", function (done) {

        var self = this,
            finished = steps(2, done);

        this.eventModel.fetch({ catId: '1' }, function (events) {
            expect(events).to.have.property('length').that.equals(1);
            expect(events[0]).to.deep.equal(self.data[1]);
            finished();
        });

        this.eventModel.fetch({ catId: '5' }, function (events) {
            expect(events).to.have.property('length').that.equals(2);
            expect(events[0]).to.deep.equal(self.data[0]);
            finished();
        });

    });
    
    /*
    it("should fetch lifts by capacity", function (done) {

        var self = this,
            finished = steps(3, done);

        this.liftModel.fetch({ capacity: 1 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[3]);
            finished();
        });

        this.liftModel.fetch({ capacity: 2 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[0]);
            finished();
        });

        this.liftModel.fetch({ capacity: 8 }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[2]);
            finished();
        });

    });
    it("should fetch lifts by a combination of filters", function (done) {

        var self = this;

        this.liftModel.fetch({ status: 'open', capacity: 4, type: 'chair' }, function (lifts) {
            expect(lifts).to.have.property('length').that.equals(1);
            expect(lifts[0]).to.deep.equal(self.data[1]);
            done();
        });

    });
    it("should set lift status to closed", function () {
        this.liftModel.close('Chairlift One');
        this.liftModel.fetch({ name: 'Chairlift One' }, function (chair) {
            expect(chair.status).to.equal("closed");
        });
    });
    it("should set lift status to open", function () {
        this.liftModel.open('Rope Tow');
        this.liftModel.fetch({ name: 'Rope Tow' }, function (chair) {
            expect(chair.status).to.equal("open");
        });
    });
    it("should set lift status to hold", function () {
        this.liftModel.hold('Chairlift Two');
        this.liftModel.fetch({ name: 'Chairlift Two' }, function (chair) {
            expect(chair.status).to.equal("hold");
        });
    });
*/

});