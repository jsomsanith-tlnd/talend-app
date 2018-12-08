# Pre-requisites

* Components : uncontrolled mode by default
* Components : controlled if some props are provided
* Containers : add somelogic on top of controlled components
* Connect : redux connect containers. Perhaps, add services ? (continue to read to know more about services).

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
        preReducers: [],
        reducers: [],
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

The idea is to write
* reducers
* saga
* actions
* a simplified exposed api that dispatch an action, handled by sagas/reducers

A service is a business part. We can have a DataseService to deal with datasets, or a HomeService to deal with things like side panel state, ...

?? : Not sure how to pass reducers/saga/actions to the bootstrap for now

There are built in services

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
In practice, collections results from api calls, and it could be really nice to have the fetch status stores in collections entities.
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
