import { entities } from 'redux-entity';
import { COLLECTIONS_STORE_ROOT, fetchCollection, getCollection } from './collections';

// @talend/app module
/* TODO this module depends on thunk and @talend/app-http
 it should add them in dependencies and module definition
 @talend/app bootstrap should remove duplicates during module merge
 */
export const collectionsModule = {
	store: {
		reducer: {
			[COLLECTIONS_STORE_ROOT]: entities,
		},
	},
};

// Service
export default {
	actions: { fetchCollection },
	selectors: { getCollection },
};
