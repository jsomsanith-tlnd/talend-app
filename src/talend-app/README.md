# @talend/app

`@talend/app` is a lightweight module that manage the bootstrap of your app. It contains 3 things
* react
* state management using redux
* additional modules management

## Installation

```
yarn install @talend/app
```

## Bootstrap

```javascript
import { bootstrap } from '@talend/app';
import { datasetModule } from '@talend/dataset';
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
    modules: [datasetModule]
});
```

| Property | Description |
|---|---|
| appId | The id of the html element where to bootstrap. |
| store | The redux store configuration. See [redux documentation](https://redux.js.org/introduction/getting-started) for each sub property details. |
| store.storeCallback | Function that is executed after the store creation. The store is passed as first argument. |
| rootComponent | Your main app component. |
| modules | The list of additional modules. (See next section) |

## Modules

Modules are part of configurations.

When you bootstrap your app, you pass your main app configuration. Modules are merged with this main configuration, that is handled by `bootstrap()`.

``` javascript
// my-addon module
const myAddonModule = {
    store: {
        middlewares: [myAddonMiddleware],
        reducer: {
            'my-addon': myAddonReducer,
        },
        storeCallback: (store) => myAddonDoSomething(store),
    }
};


// the main app
bootstrap({
    appId: 'app',
    store: {
        middlewares: [myMiddleware],
        reducer: {
            app: appReducer,
        },
    },
    rootComponent: App,
    modules: [myAddonModule]
});
```

In this example, myAddonModule is merged with the configuration passed to `bootstrap()`
* middlewares will be `[myMiddleware, myAddonMiddleware]`
* reducer will contains `app` and `my-addon` reducer keys
* storeCallback will trigger only myAddonModule storeCallback as it's the only one.

Modules can be internal modules that are parts of your applications (see next Architecture section), or external modules.
You can find some interesting external modules :
* [Collections](../talend-app-collections/README.md) : helps to manage collections with the fetch status and errors.
* [Saga](../talend-app-saga/README.md) : add redux-saga with a HOC to start/stop the saga depending on components mount/unmount.
* [Http](../talend-app-http/README.md) : helps to manage http request, with the possibility to configure 1 global configuration, or 1 configuration per request.
* [Store utils](../talend-app-store-utils/README.md) : a way to avoid writing reducers for very simple cases.
* Injection : a way to inject props and components dynamically.

## Architecture

A `@talend/app` project follow the redux philosophy
* a store
* components that are not aware of the store
* react-redux connected components that `select` store parts, and `actions` functions

But it's important to keep the `store reducer`, `selector`, and `actions` in the same business entity in a same `module`, to make it
* easy to reason about
* easy to read and navigate within you folder architecture
* easy to maintain

Each of these modules exposes
* a `@talend/app` module configuration. It's the right place to pass a reducer for example. This configuration must be passed to `bootstrap()` as module.
* a service

Services are the entities that hold the logic. They can have 2 natures
* redux service : holds the logic to communicate with redux (selectors, actions creators). They are used  in `react-redux > connect()` HOC (`mapStateToProps` and `mapDispatchToProps`).
* javascript service : holds computation logic. They are used in components or other services.

Example of redux service usage.
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

## Conventions

### Modules

The module exposed
* a named exported module configuration
* a default exported service

```javascript
// index.js

// DO
export const myModule = {
    store: { reducer: { home: homeReducer } }
}

export default HomeService;


// DON'T
export default {
    store: { reducer: { home: homeReducer } }
}

export HomeService;
```

### Redux modules services

Redux modules would export
* a module configuration, containing reducers for example
* a service that contains `selectors` and `action creators`

The shape of the service should have a clear separation between the 2 type of entities
```javascript
// DO
const MyNonReduxService = {
    sum() {...},
    average() {...},
};

const MyReduxService = {
    selectors: {
        isOpen(store) {...},
        getTags(store) {...}
    },
    actions: {
        toggle() {...},
        setTags(tags) {...}
    }
}


// DON'T
const MyReduxService = {
    isOpen(store) {...},
    getTags(store) {...}
    toggle() {...},
    setTags(tags) {...}
}

```
