var friendData = require("../data/friends.js");

var path = require("path");

module.exports = function(app) {
        
    app.post("/api/friends", function(req, res) {
        res.json(friends);
    });


	// Add new friend entry
	app.post("/api/friends", function(req, res) {
		
		var userInput = req.body;
		
		var userResponses = userInput.scores;

		// Compute best friend match
		var matchName = "";
		var totalDifference = 1000; 

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: "OK", matchName: matchName});
	});
};
