import { entities, loadEntity } from 'redux-entity';
import { COLLECTIONS_STORE_ROOT, getCollection } from './collections';

export default {
	store: {
		reducer: {
			[COLLECTIONS_STORE_ROOT]: entities,
		},
	},
};

export { loadEntity as fetchCollection, getCollection };
