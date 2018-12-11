import { sagaStarter, sagaStopper } from './sagaStarter';
import withSaga from './withSaga';

// HOC
export { withSaga };

// @talend/app module
export default {
	store: {
		sagas: [sagaStarter, sagaStopper],
	},
};
