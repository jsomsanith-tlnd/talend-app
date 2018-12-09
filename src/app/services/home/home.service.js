import { HOME_SIDE_PANEL_TOGGLE, HOME_STORE_ROOT } from './constants';

function getSidePanelDocked(state) {
	return state[HOME_STORE_ROOT].sidePanelDocked;
}

function toggleSidePanel(event) {
	return {
		type: HOME_SIDE_PANEL_TOGGLE,
		event,
	};
}

export default {
	getSidePanelDocked,
	toggleSidePanel,
};
