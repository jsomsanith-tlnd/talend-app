/**
 * Example with redux-data-structures
 */
import { HOME_STORE_ROOT, reducer, getMenuDocked, toggleMenu } from './home.service';

export const serviceModule = {
	store: {
		reducer: { [HOME_STORE_ROOT]: reducer },
	},
};

export default {
	selectors: { getMenuDocked },
	actions: { toggleMenu },
};
