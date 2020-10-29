![Sms77.io Logo](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "Sms77.io Logo")
# Sms77.io SMS Gateway API Client for JavaScript

This library relies on the the global fetch API.
In order to to use it with NodeJS u may need to install [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

## Installation
Via Yarn
```shell script
yarn add sms77-client
```
Via NPM
```shell script
npm install sms77-client
```
In the Browser
```html
<script src="https://unpkg.com/browse/sms77-client/dist/Sms77Client.umd.js"></script>
```

### Example
```javascript
//import Sms77Client from 'sms77-client'; // uncomment in NodeJS environments

new Client('MY_SUPER_SECRET_SMS77_IO_API_KEY!')
.balance()
.then(balance => console.log(`My balance is: ${balance}`))
.catch(error => console.error(error));
```