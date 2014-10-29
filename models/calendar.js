var fs = require('fs');

module.exports = function (data) {

    if (typeof data == "string") {
        events = JSON.parse(data);
    } else {
        events = data;
    }

    return {

        fetch: function () {

            var opts, done, filtered;

            if (arguments.length == 2) {
                opts = arguments[0];
                done = arguments[1];
            } else {
                opts = null;
                done = arguments[0];
            }

            if (!opts) {
                return done(events);
            } else if (opts.name) {
                filtered = events.filter(function (event) {
                    return event.name.toLowerCase() == opts.name.toLowerCase();
                })[0];
                return done(filtered);
            } else {

                var filtered = events;
/*
                if (opts.status) {
                    filtered = filtered.filter(function (lift) {
                        return lift.status == opts.status;
                    });
                }
*/

                return done(filtered);
            }

        },
/*
        close: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'closed';
            });
        },

        hold: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'hold';
            });
        },

        open: function (liftName) {
            this.fetch({ name: liftName }, function (lift) {
                lift.status = 'open';
            });

        }
*/
    };

};



