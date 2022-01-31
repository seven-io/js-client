![](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77 Logo")

# Official JavaScript API Client for [sms77](https://www.sms77.io)

## Installation

**This library relies on the global fetch API. To use this library with
Node.js, [node-fetch](https://github.com/node-fetch/node-fetch) is required.**

For compatibility with Node.js versions < 12, please also install
the [globalThis polyfill](https://github.com/es-shims/globalThis).

### Via NPM

```bash
npm install sms77-client
```

### Via Yarn

```bash
yarn add sms77-client
```

### Browser

```html
<script src='https://unpkg.com/browse/sms77-client/dist/Sms77Client.umd.js'></script>
```

## Example

```javascript
// const globalThis = require('globalthis')(); // uncomment if NodeJS < NodeJS versions < 12
// globalThis.fetch = require('node-fetch').default; // uncomment in NodeJS environments
// const Sms77Client = require('sms77-client'); // uncomment in NodeJS environments

new Sms77Client('MY_SUPER_SECRET_SMS77_IO_API_KEY!')
	.balance()
	.then(balance => console.log(`Current balance: ${balance}`))
	.catch(console.error);
```

## Tests

1. `git clone https://github.com/sms77io/js-client`
2. `cd js-client && npm install`
3. `SMS77_API_KEY=InsertSms77ApiKey npm run test`

Set `SMS77_LIVE_TEST=1` for live tests performing actual HTTP requests.

Set `SMS77_DEBUG=1` for details printed to `stdout`.

### Support

Need help? Feel free to [contact us](https://www.sms77.io/en/company/contact/).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
