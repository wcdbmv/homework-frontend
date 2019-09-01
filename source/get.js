'use strict';

const get = (object, path) => {
	const keys = path.split('.').filter(key => key.length);
	return keys.reduce(
		(dive, key) => (dive && dive[key] ? dive[key] : undefined),
		object
	);
};
