'use strict';

/**
 * Gets the value at `path` of `object`.
 * @param {Object} object
 * @param {string} path
 * @returns value if exists else undefined
 */
const get = (object, path) => {
	if (!isObject(object) || typeof path !== 'string' || path[0] !== '.') {
		return undefined;
	}

	const keys = path.split('.').filter(key => key.length);
	return keys.reduce((dive, key) => dive && dive[key], object);
};

/**
 * Checks if type of `variable` is object
 * @param variable
 * @returns {boolean}
 */
const isObject = variable => typeof variable === 'object' && variable !== null;
