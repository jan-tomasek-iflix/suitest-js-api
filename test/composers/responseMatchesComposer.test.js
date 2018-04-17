const assert = require('assert');
const sinon = require('sinon');
const {responseMatchesComposer} = require('../../lib/composers');
const {NETWORK_PROP} = require('../../lib/constants/networkRequest');
const {
	SUBJ_COMPARATOR,
	PROP_COMPARATOR,
} = require('../../lib/constants/comparator');

describe('Network Request Match Composer', () => {
	it('should provide .requestMatch and .requestMatches methods', () => {
		const data = {};
		const chain = {};
		const makeChain = sinon.spy();

		Object.defineProperties(chain, responseMatchesComposer(data, chain, makeChain));

		assert.strictEqual(typeof chain.responseMatch, 'function');
		assert.strictEqual(typeof chain.responseMatches, 'function');

		const matchDescriptor = Object.getOwnPropertyDescriptor(chain, 'responseMatch');
		const matchesDescriptor = Object.getOwnPropertyDescriptor(chain, 'responseMatches');

		assert.strictEqual(matchDescriptor.enumerable, true);
		assert.strictEqual(matchDescriptor.writable, false);
		assert.strictEqual(matchDescriptor.configurable, false);

		assert.strictEqual(matchesDescriptor.enumerable, true);
		assert.strictEqual(matchesDescriptor.writable, false);
		assert.strictEqual(matchesDescriptor.configurable, false);
	});

	it('should accept single property spread to arguments', () => {
		const data = {};
		const chain = {};
		const makeChain = sinon.spy();

		Object.defineProperties(chain, responseMatchesComposer(data, chain, makeChain));

		chain.responseMatch(NETWORK_PROP.STATUS, 200);
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: NETWORK_PROP.STATUS,
						val: 200,
						compare: PROP_COMPARATOR.EQUAL,
					},
				],
			},
		});

		chain.responseMatch('Content-Type', 'text/html');
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: 'Content-Type',
						val: 'text/html',
						compare: PROP_COMPARATOR.EQUAL,
					},
				],
			},
		});

		chain.responseMatch(NETWORK_PROP.BODY, 'test', PROP_COMPARATOR.CONTAIN);
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: NETWORK_PROP.BODY,
						val: 'test',
						compare: PROP_COMPARATOR.CONTAIN,
					},
				],
			},
		});

		// Invalid
		assert.throws(() => chain.responseMatch('Content-Type'), 'No value to compare to');
		assert.throws(() => chain.responseMatch(Symbol('unknown'), 'test'), 'Property is unknown Symbol');
		assert.throws(
			() => chain.responseMatch(NETWORK_PROP.STATUS, 200, '='),
			'Comparator is not a Symbol'
		);
		assert.throws(
			() => chain.responseMatch(NETWORK_PROP.STATUS, 200, Symbol('=')),
			'Comparator is unknown Symbol'
		);
		assert.throws(
			() => chain.responseMatch('Content-Type', 500),
			'Header is not a string'
		);
		assert.throws(() => chain.responseMatch(NETWORK_PROP.STATUS, '200'), 'Status value is not a number');
		assert.throws(() => chain.responseMatch(NETWORK_PROP.BODY, 123), 'Body is not a string');
	});

	it('should accept object with single property as object', () => {
		const data = {};
		const chain = {};
		const makeChain = sinon.spy();

		Object.defineProperties(chain, responseMatchesComposer(data, chain, makeChain));

		chain.responseMatch({
			name: NETWORK_PROP.BODY,
			val: 'test',
			type: PROP_COMPARATOR.EQUAL,
		});
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: NETWORK_PROP.BODY,
						val: 'test',
						compare: PROP_COMPARATOR.EQUAL,
					},
				],
			},
		});

		chain.responseMatch({
			name: NETWORK_PROP.STATUS,
			val: 500,
		});
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: NETWORK_PROP.STATUS,
						val: 500,
						compare: PROP_COMPARATOR.EQUAL,
					},
				],
			},
		});
	});

	it('should accept array of property definitions as a shortcut', () => {
		const data = {};
		const chain = {};
		const makeChain = sinon.spy();

		Object.defineProperties(chain, responseMatchesComposer(data, chain, makeChain));

		chain.responseMatch([
			{
				name: NETWORK_PROP.BODY,
				val: 'test',
				type: PROP_COMPARATOR.CONTAIN,
			},
			{
				name: NETWORK_PROP.STATUS,
				val: 200,
				type: PROP_COMPARATOR.EQUAL,
			},
			{
				name: 'Content-Type',
				val: 'text/plain',
			},
		]);
		assert.deepStrictEqual(makeChain.lastCall.args[0], {
			response: {
				type: SUBJ_COMPARATOR.RESPONSE_MATCHES,
				props: [
					{
						name: NETWORK_PROP.BODY,
						val: 'test',
						compare: PROP_COMPARATOR.CONTAIN,
					},
					{
						name: NETWORK_PROP.STATUS,
						val: 200,
						compare: PROP_COMPARATOR.EQUAL,
					},
					{
						name: 'Content-Type',
						val: 'text/plain',
						compare: PROP_COMPARATOR.EQUAL,
					},
				],
			},
		});
	});
});