const {mergeAll} = require('ramda');

const makeChain = (getComposers, data) => {
	return makeNewChain(data);

	function makeNewChain(updatedData) {
		const composers = getComposers(updatedData);
		const chain = {};

		Object.defineProperties(chain, mergeAll(composers.map(composer => composer(updatedData, chain, makeNewChain))));

		return chain;
	}
};

module.exports = makeChain;