import '@talend/bootstrap-theme/src/theme/theme.scss';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { bootstrap } from '../talend-app';

bootstrap({
	appId: 'app',
	appLoader: AppLoader,
});
