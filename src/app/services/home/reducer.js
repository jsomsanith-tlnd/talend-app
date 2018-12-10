import { HOME_MENU_TOGGLE } from './constants';

const initialState = {
	menuDocked: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case HOME_MENU_TOGGLE:
			return { ...state, menuDocked: !state.menuDocked };
		default:
			return state;
	}
}
