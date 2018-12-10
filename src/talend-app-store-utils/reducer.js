import { TALEND_APP_SET } from './constants';

function setValue(obj = {}, path = [], value) {
	if (path.length === 0) {
		// eslint-disable-next-line no-console
		console.warn('@Talend/app, TALEND_APP_SET should have a valid path.');
		return obj;
	}
	const [propName, ...rest] = path;
	if (rest.length === 0) {
		return {
			...obj,
			[propName]: value,
		};
	}
	return {
		...obj,
		[propName]: setValue(obj[propName], rest, value),
	};
}

export default function reducer(state = {}, action) {
	if (action.type === TALEND_APP_SET) {
		return setValue(state, action.path, action.value);
	}
	return state;
}
