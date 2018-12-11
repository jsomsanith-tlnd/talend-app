import '@talend/bootstrap-theme/src/theme/theme.scss';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { bootstrap } from '../talend-app';
import storeUtilsModule from '../talend-app-store-utils';

import App from './App';
import services from './services';
/*
// v1
bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: App,
	modules: [...services], // add external modules here
});
*/

// v2 - with @talend/app-store-utils
// Abandoned because the code is not explicit enough
bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: App,
	modules: [storeUtilsModule, ...services], // add external modules here
});
