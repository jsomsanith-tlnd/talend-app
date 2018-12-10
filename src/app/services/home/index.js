import { HOME_STORE_ROOT, reducer, getMenuDocked, toggleMenu } from './home.service';

export const serviceModule = {
	store: {
		reducer: { [HOME_STORE_ROOT]: reducer },
	},
};

export default {
	getMenuDocked,
	toggleMenu,
};
