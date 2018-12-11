import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import mergeModules from './modules';
import App from '../App';

export function bootstrapSaga(options) {
	if (!options.store || !options.store.sagas || !options.store.sagas.length) {
		return () => {};
	}

	// create saga middleware and add it in the options as first middleware
	const middleware = createSagaMiddleware();
	// eslint-disable-next-line no-param-reassign
	options.store.sagas = [middleware].concat(options.store.sagas);

	// main saga that will start all sagas from options
	function* rootSaga() {
		for (const saga of options.store.sagas) {
			yield spawn(saga);
		}
	}
	return () => middleware.run(rootSaga);
}

function bootstrapRedux(options) {
	const { enhancers = [], initialState, middlewares = [], reducer = {} } = options.store;
	return createStore(
		combineReducers(reducer),
		initialState,
		compose(
			applyMiddleware(thunk, ...middlewares),
			...enhancers,
		),
	);
}

export default function bootstrap(configuration) {
	const options = mergeModules(configuration);
	const runSaga = bootstrapSaga(options);
	const store = bootstrapRedux(options);
	runSaga();
	render(
		<App store={store} loading={options.AppLoader} RootComponent={configuration.rootComponent} />,
		document.getElementById(options.appId),
	);
}
