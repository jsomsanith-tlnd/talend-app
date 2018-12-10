import { HOME_MENU_TOGGLE, HOME_STORE_ROOT } from './constants';

function getMenuDocked(state) {
	return state[HOME_STORE_ROOT].menuDocked;
}

function toggleMenu(event) {
	return {
		type: HOME_MENU_TOGGLE,
		event,
	};
}

export default {
	getMenuDocked,
	toggleMenu,
};
