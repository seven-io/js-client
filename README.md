![](https://www.seven.io/wp-content/uploads/Logo.svg "seven Logo")

# Official JavaScript API Client for [seven](https://www.seven.io)

## Installation

**This library relies on the global fetch API. To use this library with
Node.js, [node-fetch](https://github.com/node-fetch/node-fetch) is required.**

For compatibility with Node.js versions < 12, please also install
the [globalThis polyfill](https://github.com/es-shims/globalThis).

### Via NPM

```bash
npm install @seven.io/client
```

### Via Yarn

```bash
yarn add @seven.io/client
```

### Browser

```html

<script src='https://unpkg.com/browse/@seven.io/client/dist/SevenApi.umd.js'></script>
```

## Example

```javascript
// const globalThis = require('globalthis')(); // uncomment if NodeJS < NodeJS versions < 12
// globalThis.fetch = require('node-fetch').default; // uncomment in NodeJS environments
// const SevenApi = require('@seven.io/api'); // uncomment in NodeJS environments

const client = new SevenApi.Client('MY_SUPER_SECRET_SEVEN_IO_API_KEY!')
const balanceResource = new SevenApi.BalanceResource(client)
balanceResource.json()
    .then(console.log)
    .catch(console.error);
```

## Tests

1. `git clone https://github.com/seven-io/js-client seven-client`
2. `cd seven-client && npm install`
3. `SEVEN_API_KEY=<InsertSevenApiKey> npm run test`

Set `SEVEN_DEBUG=1` for details printed to `stdout`.

### Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/).

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
