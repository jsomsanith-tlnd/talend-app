import get from 'lodash/get';
import { REDUX_STORE_ROOT, TALEND_APP_SET } from './constants';

export function getFromStore(state, path) {
	return get(state, [REDUX_STORE_ROOT, ...path]);
}

export function setInStore(dispatch, path, value) {
	dispatch({
		type: TALEND_APP_SET,
		path,
		value,
	});
}
