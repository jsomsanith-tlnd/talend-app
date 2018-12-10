import { getFromStore, setInStore } from '../../../talend-app-store-utils';

const MENU_DOCKED_PATH = ['home', 'menu', 'docked'];

function getMenuDocked(state) {
	return getFromStore(state, MENU_DOCKED_PATH);
}

function toggleMenu() {
	return (dispatch, getState) => setInStore(dispatch, MENU_DOCKED_PATH, !getMenuDocked(getState()));
}

export default {
	getMenuDocked,
	toggleMenu,
};
