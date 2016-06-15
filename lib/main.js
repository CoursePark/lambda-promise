'use strict';

module.exports = function (prePromise, lambdaFunction) {
	if (typeof prePromise === 'function' && typeof lambdaFunction !== 'function') {
		lambdaFunction = prePromise;
		prePromise = null;
	}
	return function (task, lambda) {
		Promise.resolve(typeof prePromise === 'function' ? prePromise() : prePromise)
			.then(function () {
				return lambdaFunction(task, lambda);
			})
			.then(lambda.succeed)
			.catch(lambda.fail)
		;
	};
};
