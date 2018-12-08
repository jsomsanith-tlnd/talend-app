import { HOME_SIDE_PANEL_TOGGLE, HOME_STORE_ROOT } from './constants';

function getDocked(store) {
	return store[HOME_STORE_ROOT].docked;
}

function toggle(dispatch) {
	dispatch({
		type: HOME_SIDE_PANEL_TOGGLE,
	});
}

export default {
	toggle,
	getDocked,
};
