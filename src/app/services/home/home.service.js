export const HOME_MENU_TOGGLE = 'HOME_MENU_TOGGLE';
export const HOME_STORE_ROOT = 'home';
const initialState = {
	menuDocked: false,
};

export function reducer(state = initialState, action) {
	switch (action.type) {
		case HOME_MENU_TOGGLE:
			return { ...state, menuDocked: !state.menuDocked };
		default:
			return state;
	}
}

export function getMenuDocked(state) {
	return state[HOME_STORE_ROOT].menuDocked;
}

export function toggleMenu(event) {
	return {
		type: HOME_MENU_TOGGLE,
		event,
	};
}
