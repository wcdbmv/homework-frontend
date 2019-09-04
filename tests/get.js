'use strict';

QUnit.module('Тестируем функцию get', function () {
	QUnit.test('get работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, '.foo'), object.foo);
		assert.strictEqual(get(object, '.deep.hested.field'), object.deep.hested.field);

		assert.deepEqual(get(object, '.deep.hested'), object.deep.hested);
		assert.deepEqual(get(object, '.deep'), object.deep);
		assert.deepEqual(get(object, '.'), object);
	});

	QUnit.test('get работает правильно c массивами', function (assert) {
		const object = {
			foo: 'bar',
			baz: [ 1, 2, 3 ],
			deep: [
				{foobar: '42'}
			]
		};

		assert.strictEqual(get(object, '.foo.0'), object.foo[ 0 ]);
		assert.strictEqual(get(object, '.foo.length'), object.foo.length);
		assert.strictEqual(get(object, '.baz.0'), object.baz[ 0 ]);
		assert.strictEqual(get(object, '.baz.length'), object.baz.length);
		assert.strictEqual(get(object, '.deep.0.foobar'), object.deep[ 0 ].foobar);
	});

	QUnit.test('get работает правильно c объектами без свойств', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
	});

	QUnit.test('get работает правильно с путями', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.'), object);
		// valid because of get(get(object, '.'), '.') === object
		assert.strictEqual(get(object, '..foo.bar.'), object.foo.bar);
		assert.strictEqual(get(object, 'foo.bar'), undefined);
	});

	QUnit.test('get правильно валидирует', function (assert) {
		const object = {};

		assert.strictEqual(get(object, 123456), undefined);
		assert.strictEqual(get(object, true), undefined);
		assert.strictEqual(get(object, null), undefined);
		assert.strictEqual(get(object, undefined), undefined);
		assert.strictEqual(get(object, {}), undefined);

		assert.strictEqual(get('string', '.'), undefined);
		assert.strictEqual(get(123456, '.'), undefined);
		assert.strictEqual(get(true, '.'), undefined);
		assert.strictEqual(get(null, '.'), undefined);
		assert.strictEqual(get(undefined, '.'), undefined);
	});
});
