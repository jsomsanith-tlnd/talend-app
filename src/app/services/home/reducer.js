import { HOME_SIDE_PANEL_TOGGLE } from './constants';

export default function reducer(state, action) {
	switch (action.type) {
		case HOME_SIDE_PANEL_TOGGLE:
			return { ...state, sidePanelDocked: !state.sidePanelDocked };
		default:
			return state;
	}
}
