export const COLLECTIONS_STORE_ROOT = 'collections';

export function getCollection(state, collectionId) {
	return state[COLLECTIONS_STORE_ROOT][collectionId];
}
