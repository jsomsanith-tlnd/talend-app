import '@talend/bootstrap-theme/src/theme/theme.scss';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { bootstrap } from '../talend-app';

import Home from './Home';
import services from './services';

bootstrap({
	appId: 'app',
	appLoader: AppLoader,
	rootComponent: Home,
	modules: [...services], // add external modules here
});
