import StoreUtilsService from '../../../talend-app-store-utils';

const MENU_DOCKED_PATH = ['home', 'menu', 'docked'];

export function getMenuDocked(state) {
	return StoreUtilsService.selectors.getFromStore(state, MENU_DOCKED_PATH);
}

export function toggleMenu() {
	return (dispatch, getState) =>
		StoreUtilsService.actions.setInStore(dispatch, MENU_DOCKED_PATH, !getMenuDocked(getState()));
}
