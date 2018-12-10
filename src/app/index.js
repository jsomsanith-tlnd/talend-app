import '@talend/bootstrap-theme/src/theme/theme.scss';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { bootstrap } from '../talend-app';
import storeUtilsModule from '../talend-app-store-utils';

import Home from './Home';
import services from './services';
/*
// v1
bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: Home,
	modules: [...services], // add external modules here
});
*/

// v2
bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: Home,
	modules: [storeUtilsModule, ...services], // add external modules here
});
