'use strict';

var when = require('when');

module.exports = function (prepromise, workerMainFunction) {
	return function (task, lambda) {
		when(prepromise)
			.then(function () {
				return workerMainFunction(task, lambda);
			})
			.then(lambda.succeed)
			.catch(lambda.fail)
		;
	};
};
