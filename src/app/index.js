import '@talend/bootstrap-theme/src/theme/theme.scss';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { bootstrap } from '../talend-app';
import sagaModule from '../talend-app-saga';
import storeUtilsModule from '../talend-app-store-utils';
import collectionsModule from '../talend-app-collections';

import App from './App';
import services from './services';

bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: App,
	modules: [sagaModule, collectionsModule, storeUtilsModule, ...services],
});
