# @talend/app-http

This module helps the http configuration
* global configuration
* specific configuration per request

## Installation

```
yarn install @talend/app-http
```

## Requests

### GET

```javascript
import HttpService from '@talend/app-http';

HttpService.get(url, specificConfiguration);
```

| Parameter | Type | Description |
|---|---|---|
| url | `string` | The url to request. |
| specificConfiguration | `object` | The configuration to merge with global configuration. |

### POST
### PUT
### DELETE
### PATCH
### TRACE
### HEAD

## Configuration

### Global

```javascript
import HttpService from '@talend/app-http';

HttpService.setConfiguration({
    headers,
    security: { csrfTokenKey: CSRF_TOKEN_KEY }
);
```

| Parameter | Type | Description |
|---|---|---|
| headers | `object` | Request headers to set. |
| security.csrfTokenKey | `string` | The key in cookie to get the csrf token. |

### Per request

By default, each request will use the global configuration.

All requests accept a specific specific configuration, that will be merged with default configuration.

```javascript
import HttpService from '@talend/app-http';

HttpService.setConfiguration({
    headers: { 'content-type': 'application/json },
});
HttpService.get(url, {
    headers: { customKey: 'A3424B9FD8' }
});

/* the request is performed with
{
    headers: {
        'content-type': 'application/json',
        customKey: 'A3424B9FD8'
    }
}
*/
```

To avoid global configuration, just pass `extends: false` in the custom configuration.

```javascript
import HttpService from '@talend/app-http';

HttpService.setConfiguration({
    headers: { 'content-type': 'application/json },
});
HttpService.get(url, {
    headers: { extends: false, customKey: 'A3424B9FD8' }
});

/* the request is performed with
{
    headers: {
        customKey: 'A3424B9FD8'
    }
}
*/
```
