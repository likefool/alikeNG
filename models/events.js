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
            } else if (opts.topicId) {
                filtered = events.filter(function (eventA) {
                    return eventA.topicId == opts.topicId;
                })[0];
                return done(filtered);
            } else {

                var filtered = events;

                if (opts.catId) {
                    filtered = filtered.filter(function (eventA) {
                        return eventA.catId == opts.catId;
                    });
                }
/*
                if (opts.type) {
                    filtered = filtered.filter(function (eventA) {
                        return eventA.type == opts.type;
                    });
                }

                if (opts.capacity) {
                    filtered = filtered.filter(function (eventA) {
                        return eventA.capacity == opts.capacity;
                    });
                }
*/
                return done(filtered);
            }

        },

/*
        close: function (eventAName) {
            this.fetch({ name: eventAName }, function (eventA) {
                eventA.status = 'closed';
            });
        },

        hold: function (eventAName) {
            this.fetch({ name: eventAName }, function (eventA) {
                eventA.status = 'hold';
            });
        },

        open: function (eventAName) {
            this.fetch({ name: eventAName }, function (eventA) {
                eventA.status = 'open';
            });

        }
        */

    };

};



