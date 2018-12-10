import { MENU_DOCKED_PATH } from './constants';
import { getFromStore, setInStore } from '../../../talend-app-store-utils';

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
