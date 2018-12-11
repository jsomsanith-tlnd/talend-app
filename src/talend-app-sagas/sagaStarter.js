import { take, spawn, cancel } from 'redux-saga/effects';
import { SAGA_START, SAGA_STOP } from './constants';

const startedSagas = {};

export function* sagaStarter() {
	while (true) {
		const { id, saga } = yield take(SAGA_START);
		startedSagas[id] = yield spawn(saga);
	}
}

export function* sagaStopper() {
	while (true) {
		const { id } = yield take(SAGA_STOP);
		cancel(startedSagas[id]);
		delete startedSagas[id];
	}
}
