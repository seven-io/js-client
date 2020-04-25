![alt text](https://www.sms77.io/wp-content/uploads/2019/07/sms77-Logo-400x79.png "sms77")
# sms77io SMS Gateway API Client

This library relies on the the global fetch API.
So in order to to use it with node u may need to install [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

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
<script src="https://unpkg.com/browse/sms77-client@1.9.1/dist/Sms77Client.umd.js"></script>
```

### Example
```javascript
//import Sms77Client from 'sms77-client'; // uncomment in NodeJS environments

new Sms77Client('MY_SUPER_SECRET_SMS77_IO_API_KEY!')
.balance()
.then(balance => console.log(`My balance is: ${balance}`))
.catch(error => console.error(error));
```

#### Implemented endpoints:
- balance
- contacts
- lookup
- pricing
- sms
- status
- validate_for_voice
- voice

##### ToDo
- Tests