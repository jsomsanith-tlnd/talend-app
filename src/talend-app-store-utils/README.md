# @talend/app-store-utils

**Warning**
Do we keep that or do we favor redux-data-structures ?

This module offers you a place in redux store to get/set values.
It exposes a StoreUtilsService that follows `@talend/app` redux services conventions.

## Installation

```
yarn install @talend/app-store-utils
```

## Bootstrap

Just pass the saga module to `@talend/app-bootstrap`.

```javascript
import { bootstrap } from '@talend/app';
import { storeUtilsModule } from '@talend/app-store-utils';
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
    modules: [storeUtilsModule]
});
```

## Selector

**Method**

```javascript
StoreUtilsService.selectors.getFromStore(state, pathInStore);
```

| Argument | Type | Description |
|---|---|---|
| state | `object` | Redux state. |
| pathInStore | `array` | Path in redux store to value. Ex: `['home', 'menu', 'docked']`. |

**Example**

```javascript
import StoreUtilsService from '@talend/app-store-utils';

const MENU_DOCKED_PATH = ['home', 'menu', 'docked'];

export function getMenuDocked(state) {
	return StoreUtilsService.selectors.getFromStore(state, MENU_DOCKED_PATH);
}
```

## Action

**Method**

```javascript
StoreUtilsService.actions.setInStore(dispatch, pathInStore, value);
```

| Argument | Type | Description |
|---|---|---|
| dispatch | `function` | Redux `dispatch()` function. |
| pathInStore | `array` | Path in redux store to value. Ex: `['home', 'menu', 'docked']`. |
| value | `any` | The new value to set. |

**Example**

```javascript
import StoreUtilsService from '@talend/app-store-utils';

const MENU_DOCKED_PATH = ['home', 'menu', 'docked'];

export function getMenuDocked(state) {
	return StoreUtilsService.selectors.getFromStore(state, MENU_DOCKED_PATH);
}

export function toggleMenu() {
	return (dispatch, getState) =>
		StoreUtilsService.actions.setInStore(dispatch, MENU_DOCKED_PATH, !getMenuDocked(getState()));
}
```
