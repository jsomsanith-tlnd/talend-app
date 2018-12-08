import HomeService from './home.service';
import reducer from './reducer';
import { HOME_STORE_ROOT } from './constants';

export const serviceModule = {
	store: {
		reducers: [{ [HOME_STORE_ROOT]: reducer }],
	},
};

export default HomeService;
