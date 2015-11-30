'use strict';

var when = require('when');

module.exports = function (prePromise, lambdaFunction) {
	if (typeof prePromise === 'function' && typeof lambdaFunction !== 'function') {
		lambdaFunction = prePromise;
		prePromise = null;
	}
	return function (task, lambda) {
		when(typeof prePromise === 'function' ? prePromise() : prePromise)
			.then(function () {
				return lambdaFunction(task, lambda);
			})
			.then(lambda.succeed)
			.catch(lambda.fail)
		;
	};
};
