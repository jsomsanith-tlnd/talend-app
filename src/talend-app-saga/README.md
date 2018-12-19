# @talend/app-saga

`@talend/app-saga` is a `@talend/app` addon that
* add redux-saga middleware
* expose a HOC that start/stop a saga based on the component mount/unmout

## Installation

```
yarn install @talend/app-saga
```

## Bootstrap

Just pass the saga module to `@talend/app-bootstrap`.

```javascript
import { bootstrap } from '@talend/app';
import { sagaModule } from '@talend/app-saga';
import App from './App.component';

bootstrap({
    appId: 'app',
    store: {
        enhancers: [],
        initialState: {},
        middlewares: [],
        reducer: {},
        storeCallback: () => {},
    },
    rootComponent: App,
    modules: [sagaModule]
});
```

## WithSaga HOC

The `withSaga` HOC is the prefered way to start/stop a saga.
* it scales with the growth of sagas in your app, having only useful started sagas
* it allows cancellation when the component that uses it is unmounted

```javascript
import React from 'react';
import ProptTypes from 'prop-types';
import { withSaga } from '@talend/app';

import saga from './saga'; // preparations main saga

function Preparations() {
    return <div/>;
}

// start/stop saga with mount/unmount
export default withSaga(saga)(Preparations);
```

Every app can attach sagas on the component they want to match a component lifecycle.

`Permanent sagas` are attached to root component which is never unmounted.
