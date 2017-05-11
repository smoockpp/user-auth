describe("MongoDB", function() {
    it("is there a server running", function(next) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://heroku_2gqdt714:2osklgtr34eh3b80rjm9he6jnc@ds127321.mlab.com:27321/heroku_2gqdt714', function(err, db) {
            expect(err).toBe(null);
            next();
        });
    });
});

