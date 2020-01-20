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
npm install --save sms77-client
```

### Example
```javascript
import Sms77Client from 'sms77-client';

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