import { loadEntity } from 'redux-entity';
import HttpService from '../talend-app-http';

export const COLLECTIONS_STORE_ROOT = 'collections';

export function getCollection(state, collectionId) {
	return state[COLLECTIONS_STORE_ROOT][collectionId];
}

export function fetchCollection(entityName, url) {
	return loadEntity(entityName, HttpService.get(url));
}
