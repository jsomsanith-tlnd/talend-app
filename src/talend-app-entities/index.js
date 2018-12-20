import { entities } from 'redux-entity';
import { ENTITIES_STORE_ROOT, fetchEntity, getEntity } from './entities';

// @talend/app module
/* TODO this module depends on thunk and @talend/app-http
 it should add them in dependencies and module definition
 @talend/app bootstrap should remove duplicates during module merge
 */
export const entitiesModule = {
	store: {
		reducer: {
			[ENTITIES_STORE_ROOT]: entities,
		},
	},
};

// Service
export default {
	actions: { fetchEntity },
	selectors: { getEntity },
};
