const _ = require('lodash');
const nested = require('../');

let items = [
	{ id: 1, ref_id: 1, name: 'Kappa' },
	{ id: 2, ref_id: 1, name: 'KappaPride' },
	{ id: 3, ref_id: 1, name: 'Jebaited' },
	{ id: 4, ref_id: 1, name: 'PogChamp' }
];
let maxId = 4;

const createOrUpdate = nested({
	foreignKey: 'ref_id',
	methods: {
		query: (refId) => _.filter(items, { ref_id: refId }),
		create: (params) => { console.log('I\'m creating'); const item = { id: ++maxId, ref_id: params.ref_id, name: params.name}; items.push(item); return item; },
		remove: (params) => { console.log('I\'m removing'); items = _.filter(items, (item) => String(item.id) !== String(params.id)) }
	}
})


createOrUpdate(1, [
	{ id: 1, ref_id: 1, name: 'Kappa' },
	{ id: 2, ref_id: 1, name: 'KappaPride' },
	{ id: 3, ref_id: 1, name: 'Jebaited' },
	{ name: 'NotLikeThis' }
]).then(function (res) {
	console.log(res);
});