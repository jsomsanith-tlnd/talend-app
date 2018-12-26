# Pre-requisites

* Components : uncontrolled mode by default
* Components : controlled if some props are provided
* Containers : add somelogic on top of controlled components

# Summary

## Keep

|CMF feature|Proposition|
|---|---|
| <span style="color: green">Bootstrap</span> | Keep, but lighten.<br/>Additional modules to configure additional features. |
| <span style="color: green">Modules</span> | Keep. |

## Transform

|CMF feature|Proposition|
|---|---|
| <span style="color: orange">Collections</span> | Service to set/get entities from id. Store it with a reducer in store dedicated part. <br/>Need api to simply modify element in collection.<br/>Need to store status and errors. |
| <span style="color: orange">Saga</span> | Additional module. Exposes a withSaga HOC that will start/stop saga on mount/unmount. <br/>So every app can do whatever they want with saga, and we can attach sagas to main components in common modules. |
| <span style="color: orange">Http</span> | Keep the http but not in middleware: HTTPService, that will be configurable, resolve token, etc. EntityService will use it to fetch. |

## Drop

|CMF feature|Proposition|
|---|---|
| <span style="color: red">Action api</span> | Drop.<br/>Write js. |
| <span style="color: red">Expressions</span> | Drop.<br/>Write it in js in mapStateToProps, render, or service |
| <span style="color: red">Component state</span> | Drop.<br/>If need to share/control from outside: Service |
| <span style="color: red">CmfConnect</span> | Drop.<br/>Use connect(), Services selectors in mapStateToProps, Services actions in mapDispatchToProps. |
| <span style="color: red">Router</span> | Drop.<br/>Apps write their routes in JS using react-router directly. App can then use React.lazy for code splitting per route. |

## Drop until we have the need

|CMF feature|Proposition|
|---|---|
| <span style="color: red">Settings</span> | Simplify with limited settings, using context. |
| <span style="color: red">Registries/Inject</span> | Component registries (EE) with inject feature via context. |

# Packages

## @talend/app

This replaces the heavy react-cmf module by the minimum bootstrap code.

`@talend/app` is a lightweight module that manages 2 things
* the bootstrap of the app with state management using redux
* modules (external addons, or internal business modules)

[Go to documentation](./src/talend-app/README.md)

## @talend/app-saga

This addon enables redux-saga.
It replaces redux-saga management with sagaRouter and avoids route configuration duplication.
* add redux-saga middleware
* expose a HOC that start/stop a saga based on the component mount/unmout

[Go to documentation](./src/talend-app-saga/README.md)

## @talend/app-entities

This addon simplifies the management of entities.
* manage fetch status and errors
* store entities in redux store

[Go to documentation](./src/talend-app-entities/README.md)

## @talend/app-http

This module helps with the http configuration
* global configuration
* specific configuration per request

[Go to documentation](./src/talend-app-http/README.md)

## @talend/app-store-utils

**Warning**
Do we keep that or do we favor redux-data-structures ?

This module offers you a place in redux store to get/set values

[Go to documentation](./src/talend-app-store-utils/README.md)

# Next steps

## @talend/app-inject

The idea from a crazy guy : https://codesandbox.io/s/j73z71p9n9

## @talend/app-flags

Feature flipping / user rights HOC.
Based on the same idea as `@talend/app-inject` (context + HOC)

# Drawbacks

## Connected components

Components can't really be connected at first (in @talend/containers).
Those have to be connected in each project (if needed).

Let's take an example : the side panel. It will be only a component, with uncontrolled behavior by default, and controlled if it has props.onToggle and props.isExpanded.
If a project need to control it to open it from the outside, they have to connect it themself, and manage its place in the project store.
This can be then part of a service (ex: HomeService that manage all common home pages state (panel, header, etc).

# Migration path from CMF

1. Get out of settings hell
2. Get out of settings hell
3. Use a real router instead of route settings
4. Replace HTTP and collections middleware
5. Replace bootstrap()

## Get out of settings hell
TODO
* views --> create component
* actions --> add action in service
* sagas --> withSaga HOC

At the end, we only have route settings and components for each route in registry.

## Remove Injection
TODO
* use render props

## Remove route settings
TODO
* PR to extract router in progress
* Convert router settings to react-router use
* Convert router middleware use to connected-react-router use

At the end, no settings anymore

## HTTP and collections middlewares
TODO
* Switch to HTTPService and EntityService
* Move http bootstrap configuration to HTTPService configuration

## bootstrap
* use `@talend/app` bootstrap
* remaining sagas should be attached to root component via `WithSaga()`
