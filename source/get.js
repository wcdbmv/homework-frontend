'use strict';

/**
 * Gets the value at `path` of `object`.
 * @param {Object} object
 * @param {string} path
 * @returns {*} value if exists else undefined
 */
const get = (object, path) => {
	const keys = path.split('.').filter(key => key.length);
	return keys.reduce((dive, key) => dive && dive[key], object);
};
