# Pre-requisites

* Components : uncontrolled mode by default
* Components : controlled if some props are provided
* Containers : add somelogic on top of controlled components

# Summary

## Keep

|CMF feature|Proposition|
|---|---|
| <span style="color: green">Modules</span> | Keep, to configure store, http specific things, add settings from url |
| <span style="color: orange">Router</span> | Keep, need abstraction to be able to upgrade versions or switch library without pain. But app write their routes in JS using tApp abstraction. App can then use React.lazy for code splitting per route. |

## Transform

|CMF feature|Proposition|
|---|---|
| <span style="color: orange">Settings</span> | Simplifie with limited settings if need to override + context. But if no override, no settings. |
| <span style="color: orange">Collections</span> | Service to set/get collection from id. Store it with a reducer in store.collections. <br/>Need api to simply modify element in collection. |
| <span style="color: orange">Http</span> | Keep the http but not in middleware --> http Service, that will be configurable, resolve token, etc. It can use Collection service to store collection. |

## Drop

|CMF feature|Proposition|
|---|---|
| <span style="color: red">Component state</span> | Drop.<br/>If need to share/control from outside --> Service |
| <span style="color: red">CmfConnect</span> | Drop.<br/>Use connect(), Services selectors in mapStateToProps, Services setters in mapDispatchToProps. |
| <span style="color: red">Saga</span> | Drop everything, and expose a withSaga HOC that will start/stop saga on mount/unmount. <br/>So every app can do whatever they want with saga, and we can attach sagas to main components in common modules. |
| <span style="color: red">Selectors</span> | Drop, they will be in services. There will be some Services from tApp (collections), and some you write in own services. |
| <span style="color: red">Expressions</span> | Drop.<br/>Write it in js in mapStateToProps or in render |
| <span style="color: red">Registries/Inject</span> | Drop.<br/>Until we have the need to override a component, we don't implement registries. If we need, component registries (EE) with inject feature via context. |
| <span style="color: red">Action api</span> | Drop.<br/>Write js. |

# Bootstrap

```javascript
import { bootstrap } from '@talend/app';
import { datasetModule } from '@talend/dataset';
import App from './App.component';

bootstrap({
    appId: 'app', // DOM id to insert react app
    store: {
        enhancers: [],
        initialState: {},
        middlewares: [],
        reducers: {},
        sagas: [],
        storeCallback: () => {},
    },
    http: {
        // things to configure http service ?
    },
    settingsUrl: '', // the result will populate Settings context value
    rootComponent: App,
    modules: [datasetModule]
});
```

# Router

```javascript
import '@talend/bootstrap-theme/src/theme/theme.scss';
import React, { Suspense } from 'react';
import ProptTypes from 'prop-types';
import { Router, Route } from '@talend/app/route';
import Loader from '@talend/components/lib/Loader';

import { LazyDataset } from '@talend/dataset'; // exposes a lazy component
import Home from './Home'; // Layout + header + side panel

const LazyPreparations = React.lazy(() => import('./Preparations'));

function App() {
    return (
        <Router>
            <Home>
                <Suspense fallback={Loader}>
                    <Route path="/datasets" component={LazyDataset}>
                    <Route path="/preparations" component={LazyPreparations}>
                </Suspense>
            </Home>
        </Router>
    );
}

```

Or if the external module defines a common path mapping

```javascript
import '@talend/bootstrap-theme/src/theme/theme.scss';
import React, { Suspense } from 'react';
import ProptTypes from 'prop-types';
import { Router, Route } from '@talend/app/route';
import Loader from '@talend/components/lib/Loader';

import { DatasetRoutes } from '@talend/dataset'; // exposes route components with lazy component
import Home from './Home'; // Layout + header + side panel

const LazyPreparations = React.lazy(() => import('./Preparations'));

function App() {
    return (
        <Router>
            <Home>
                <Suspense fallback={Loader}>
                    <DatasetRoutes />
                    <Route path="/preparations" component={LazyPreparations}>
                </Suspense>
            </Home>
        </Router>
    );
}

```

# Saga

```javascript
import React from 'react';
import ProptTypes from 'prop-types';
import { withSaga } from '@talend/app';

import saga from './saga'; // preparations main saga

// can be redux connected
function Preparations() {
    return <div/>;
}

// start/stop saga with mount/unmount
// so every app can attach sagas on the component they want to match a component lifecycle.
// permanent sagas are attached to root component.
// no need any sagaRouter with route duplication.
export default withSaga(saga)(Preparations);

```

# Settings

Drop actions, routes, views parts.

The idea from a crazy guy : https://codesandbox.io/s/j73z71p9n9

# Services

A service a business module. We can have a DataseService to deal with datasets, or a HomeService to deal with things like side panel state, ...
There are 2 types of services :
* pure js service
* redux module

## Pure js service

A pure js service expose an api to compute business entities.

## Redux module

A redux module contains
* reducers
* saga
* actions
* a simplified exposed api that dispatch an action, handled by sagas/reducers

A redux module has to register like any module.

```javascript
import { HOME_STORE_ROOT, reducer, getMenuDocked, toggleMenu } from './home.service';

export const serviceModule = {
	store: {
		reducer: { [HOME_STORE_ROOT]: reducer },
	},
};

export default {
	selectors: { getMenuDocked },
	actions: { toggleMenu },
};

```

Register the module
```javascript
import { serviceModule as homeServiceModule } from './services/home';

bootstrap({
    ...
    modules: [homeServiceModule],
);

```

Use the service api. In this example it's in a connect.
```javascript
import HomeService from '../services/home';

function mapStateToProps(state) {
	return { docked: HomeService.selectors.getMenuDocked(state) };
}

const mapDispatchToProps = {
	onToggleDock: HomeService.actions.toggleMenu,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Menu);
```

## Simplify redux module

A first attempt to simplify redux api has been done in @talend/app-store-utils but it was abandoned because the code is not explicit enough.
No need to develop something else, if the devs want to use some helpers, a lot of them exist, like https://github.com/adrienjt/redux-data-structures.

# Built-in services

## Collections Service

```javascript
import React from 'react';
import ProptTypes from 'prop-types';
import { CollectionService } from '@talend/app';

import saga from './saga'; // preparations main saga

// can be redux connected
function Preparations({ preps, removePrep }) {
    return <div/>;
}

function mapStateToProps(state) {
    return {
        preps: CollectionService.select('preparations');
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removePrep: prep => CollectionService.remove(dispatch, 'preparation', prep),
    };
}
```

This example is a dummy example, without backend.
In practice, collections results from api calls, and it could be really nice to have the fetch status and errors stores in collections entities.
This can be managed by Http service (continue to read for http service).

## Http service

Pure js service that is responsible to fetch.
It is configured using bootstrap().

```javascript
import { HttpService, CollectionService } from '@talend/app';

CollectionService.setStatus('preparations', HttpStatus.inProgress);
await preparations = HttpService.fetch(preparationsUrl);
CollectionService.set('preparations', preparations);
CollectionService.setStatus('preparations', HttpStatus.success);
```

## Router service

Service that dispatch the actions for connected-react-router.
Like the router, the implem can be changed easily, without changing the api.

# Drawbacks

## Connected components

Some components can't really be connected at first (in @talend/containers).
Those have to be connected in each project (if needed).

Let's take an example : the side panel. It will be only a component, with uncontrolled behavior by default, and controlled if it has props.onToggle and props.isExpanded.
If a project need to control it to open it from the outside, they have to connect it themself, and manage its place in the project store.
This can be then part of a service (ex: HomeService that manage all common home pages state (panel, header, etc).

# Feedback

* router
Router abstraction can remove some features. Perhaps no abstraction, choose 1 lib, 1 version and keep it.
Router should not be mandatory

* services
Look at https://github.com/cerebral/cerebral for ideas to simplify services and immer for immutability

* collections
More a data (collections, objects, ...) instead of collection that implies an array of things
See https://github.com/mikechabot/redux-entity

# Migration path from CMF

1. Get out of settings hell
2. Use a real router instead of route settings

## Get out of settings hell

## Remove route settings

