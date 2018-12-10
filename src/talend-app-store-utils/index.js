import reducer from './reducer';
import { getFromStore, setInStore } from './service';
import { REDUX_STORE_ROOT } from './constants';

export default {
	store: {
		reducer: {
			[REDUX_STORE_ROOT]: reducer,
		},
	},
};

export { getFromStore, setInStore };
