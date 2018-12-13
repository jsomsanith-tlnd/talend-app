import reducer from './reducer';
import { getFromStore, setInStore } from './service';
import { REDUX_STORE_ROOT } from './constants';

// @talend/app module
export const storeUtilsModule = {
	store: {
		reducer: {
			[REDUX_STORE_ROOT]: reducer,
		},
	},
};

// Service
export default {
	actions: { setInStore },
	selectors: { getFromStore },
};
