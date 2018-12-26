import { boolean } from 'redux-data-structures';

export const HOME_STORE_ROOT = 'home';
const HOME_MENU_TOGGLE = 'HOME_MENU_TOGGLE';

export const reducer = boolean({ initialState: false, toggleActionTypes: [HOME_MENU_TOGGLE] });

export function getMenuDocked(state) {
	return state[HOME_STORE_ROOT].menuDocked;
}

export function toggleMenu() {
	return dispatch => dispatch({ type: HOME_MENU_TOGGLE });
}
