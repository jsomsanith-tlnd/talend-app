import createSagaMiddleware from 'redux-saga';
import withSaga from './withSaga';
import rootSaga from './sagaStarter';

// HOC
export { withSaga };

// @talend/app module
const sagaMiddleware = createSagaMiddleware();
export default {
	store: {
		middlewares: [sagaMiddleware],
		storeCallback: () => sagaMiddleware.run(rootSaga),
	},
};
