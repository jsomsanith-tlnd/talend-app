import { HOME_SIDE_PANEL_TOGGLE } from './constants';

const initialState = {
	sidePanelDocked: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case HOME_SIDE_PANEL_TOGGLE:
			return { ...state, sidePanelDocked: !state.sidePanelDocked };
		default:
			return state;
	}
}
