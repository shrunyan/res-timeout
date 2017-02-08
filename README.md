# res-timeout
Express middleware for timing out responses

Can be used as a root level service response timeout or on individual routes.

## Usage

```js
var express = require('express')
var resTimeout = require('res-timeout')
var app = express()

app.use(resTimeout(5000)

// Will timeout after 5 seconds if the
// server does not respond in time
app.get('/user/abc', user)
```
