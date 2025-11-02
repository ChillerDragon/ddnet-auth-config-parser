# ddnet-auth-config-parser

```
npm i ddnet-auth-config-parser
```

```
# autoexec_server.cfg
# my sample config

auth_add joe helper "securepass123" # comment for joe
 auth_add        drunk     mod               non quoted pass

# auth_add alice helper 123
```

```javascript
const config = require('ddnet-auth-config-parser')

console.log(config.getAuthsSync('autoexec_server.cfg'))
// [
//   { username: 'joe', role: 'helper', password: 'securepass123' },
//   { username: 'drunk', role: 'mod', password: 'non quoted pass' }
// ]
```
