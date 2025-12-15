<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# Official JavaScript/TypeScript API Client for [seven.io](https://www.seven.io)

[![npm version](https://badge.fury.io/js/%40seven.io%2Fclient.svg)](https://badge.fury.io/js/%40seven.io%2Fclient)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern, fully-typed JavaScript/TypeScript client for the seven.io communications platform. Send SMS, make voice calls, perform phone number lookups, manage contacts, and access all seven.io services with a simple, intuitive API.

## Features

- 📱 **SMS & Voice**: Send SMS messages and make voice calls
- 🔍 **Phone Lookups**: HLR, MNP, and CNAM lookups
- 👥 **Contact Management**: Organize contacts and groups
- 📊 **Analytics & Reporting**: Track usage and performance
- 🎯 **Rich Communication**: RCS messaging support
- 🔐 **Secure**: Optional request signing with HMAC-SHA256
- 🌐 **Cross-platform**: Works in Node.js and browsers
- 📝 **Fully Typed**: Complete TypeScript definitions
- ⚡ **Modern**: Built with ES modules and async/await

## Installation

**This library relies on the global fetch API. To use this library with
Node.js < 18, [node-fetch](https://github.com/node-fetch/node-fetch) is required.**

For compatibility with Node.js versions < 12, please also install
the [globalThis polyfill](https://github.com/es-shims/globalThis).

### Package Managers

```bash
# npm
npm install @seven.io/client

# yarn
yarn add @seven.io/client

# pnpm
pnpm add @seven.io/client
```

### Browser CDN

```html
<script src="https://unpkg.com/@seven.io/client/dist/seven-client.umd.cjs"></script>
```

## Authentication

The seven.io client supports two authentication methods:

### API Key Authentication

```javascript
import { Client } from '@seven.io/client'

const client = new Client({
  apiKey: 'YOUR_SEVEN_IO_API_KEY'
})
```

### Bearer Token Authentication

```javascript
import { Client } from '@seven.io/client'

const client = new Client({
  apiKey: 'Bearer YOUR_BEARER_TOKEN'
})
```

### Request Signing (Optional)

For enhanced security, you can enable request signing using HMAC-SHA256. When enabled, all requests will be signed with a timestamp, nonce, and hash of the request data:

```javascript
import { Client } from '@seven.io/client'

const client = new Client({
  apiKey: 'YOUR_SEVEN_IO_API_KEY',
  signingSecret: 'YOUR_SIGNING_SECRET'
})
```

With request signing enabled:
- Each request includes `X-Timestamp`, `X-Nonce`, and `X-Signature` headers
- The signature is computed as `HMAC-SHA256(timestamp + nonce + HTTP_METHOD + URL + MD5(request_body), signingSecret)`
- This ensures request authenticity and prevents replay attacks

### Debug Mode

Enable debug mode to see detailed request/response information:

```javascript
const client = new Client({
  apiKey: 'YOUR_API_KEY',
  debug: true
})
```

## Quick Start

### Basic Usage

```javascript
// ESM (modern environments)
import { Client, BalanceResource } from '@seven.io/client'

// CommonJS (Node.js)
// const { Client, BalanceResource } = require('@seven.io/client')

// For Node.js < 18, add fetch polyfill:
// globalThis.fetch = require('node-fetch').default

const client = new Client({
  apiKey: 'YOUR_SEVEN_IO_API_KEY'
})

const balance = new BalanceResource(client)
const result = await balance.get()
console.log('Account balance:', result)

// Or with promises
balance.get()
  .then(result => console.log('Account balance:', result))
  .catch(error => console.error('Error:', error))
```

### Send Your First SMS

```javascript
import { Client, SmsResource } from '@seven.io/client'

const client = new Client({
  apiKey: 'YOUR_SEVEN_IO_API_KEY'
})

const sms = new SmsResource(client)
const result = await sms.dispatch({
  to: '+49176123456789',
  text: 'Hello from seven.io!',
  from: 'MyApp'
})

console.log('SMS sent:', result)
```

## Available Resources

All seven.io services are organized into resource classes. Each resource provides methods to interact with specific API endpoints:

### 📱 Messaging
- **`SmsResource`** - Send and manage SMS messages
- **`VoiceResource`** - Text-to-speech voice calls
- **`RcsResource`** - Rich Communication Services messaging

### 🔍 Lookup & Validation
- **`LookupResource`** - Phone number lookup (HLR, MNP, CNAM)
- **`ValidateResource`** - Phone number validation

### 👥 Contact Management
- **`ContactsResource`** - Manage individual contacts
- **`GroupsResource`** - Organize contacts into groups

### 📊 Analytics & Monitoring
- **`AnalyticsResource`** - Usage analytics and reporting
- **`BalanceResource`** - Account balance queries
- **`PricingResource`** - Service pricing information
- **`JournalResource`** - Message history and logs
- **`StatusResource`** - Message delivery status

### ⚙️ Configuration & Management
- **`HooksResource`** - Webhook management
- **`NumbersResource`** - Phone number management
- **`SubaccountsResource`** - Subaccount administration

### Basic Usage Example

```javascript
import { Client, SmsResource, BalanceResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })

// Use any resource
const sms = new SmsResource(client)
const balance = new BalanceResource(client)
const pricing = new PricingResource(client)
```

## Code Examples

### SMS Messaging

```javascript
import { Client, SmsResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const sms = new SmsResource(client)

// Send a simple SMS
const result = await sms.dispatch({
  to: '+49176123456789',
  text: 'Hello World!',
  from: 'YourApp'
})

// Send to multiple recipients
const bulkResult = await sms.dispatch({
  to: ['+49176123456789', '+49176987654321'],
  text: 'Bulk message',
  from: 'YourApp'
})

// Schedule SMS for later
const scheduled = await sms.dispatch({
  to: '+49176123456789',
  text: 'Scheduled message',
  from: 'YourApp',
  delay: '2024-12-25 10:00:00' // Christmas morning
})
```

### Phone Number Lookup

```javascript
import { Client, LookupResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const lookup = new LookupResource(client)

// HLR Lookup (Home Location Register)
const hlr = await lookup.hlr({ number: '+49176123456789' })
console.log('Network:', hlr.network_name)
console.log('Status:', hlr.status)

// MNP Lookup (Mobile Number Portability)
const mnp = await lookup.mnp({ number: '+49176123456789' })
console.log('Original network:', mnp.network)
console.log('Ported to:', mnp.mnp_network)

// CNAM Lookup (Caller Name)
const cnam = await lookup.cnam({ number: '+1234567890' })
console.log('Caller name:', cnam.name)
```

### Contact Management

```javascript
import { Client, ContactsResource, GroupsResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const contacts = new ContactsResource(client)
const groups = new GroupsResource(client)

// Create a contact
const contact = await contacts.create({
  name: 'John Doe',
  number: '+49176123456789'
})

// Create a group
const group = await groups.create({
  name: 'VIP Customers'
})

// Add contact to group
await contacts.update(contact.id, {
  group_id: group.id
})

// Send SMS to entire group
const sms = new SmsResource(client)
const result = await sms.dispatch({
  to: group.id, // Use group ID instead of phone number
  text: 'Special offer for VIP customers!',
  from: 'YourBrand'
})
```

### Voice Calls (Text-to-Speech)

```javascript
import { Client, VoiceResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const voice = new VoiceResource(client)

// Make a TTS call
const call = await voice.dispatch({
  to: '+49176123456789',
  text: 'Hello, this is an automated message from Your Company.',
  from: '+49123456789', // Your seven.io number
  voice: 'female' // or 'male'
})

console.log('Call initiated:', call.id)
```

### Webhook Management

```javascript
import { Client, HooksResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const hooks = new HooksResource(client)

// Create webhook for SMS delivery reports
const webhook = await hooks.create({
  target_url: 'https://yourapp.com/webhooks/sms',
  event_type: 'sms_mo', // Mobile originated SMS
  request_method: 'POST'
})

// List all webhooks
const allWebhooks = await hooks.read()
console.log('Active webhooks:', allWebhooks)
```

### Webhook Verification

Verify the authenticity of incoming webhooks from seven.io:

```javascript
import { WebhookVerifier } from '@seven.io/client'

const verifier = new WebhookVerifier({
  signingSecret: 'YOUR_SIGNING_SECRET',
  maxAgeSeconds: 300 // Optional: reject webhooks older than 5 minutes
})

// Express.js example
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const result = await verifier.verify({
    headers: req.headers,
    body: req.body,
    url: req.originalUrl,
    method: req.method
  })

  if (result.valid) {
    console.log('Webhook verified successfully')
    // Process the webhook payload
    const payload = JSON.parse(req.body.toString())
    console.log('Webhook event:', payload.webhook_event)
    res.status(200).send('OK')
  } else {
    console.error('Webhook verification failed:', result.error)
    res.status(401).send('Unauthorized')
  }
})

// Next.js API route example
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const result = await verifier.verify({
    headers: req.headers,
    body: req.body,
    url: req.url,
    method: req.method
  })

  if (result.valid) {
    // Process webhook
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: result.error })
  }
}

// Fastify example
fastify.post('/webhook', {
  config: {
    rawBody: true
  }
}, async (request, reply) => {
  const result = await verifier.verify({
    headers: request.headers,
    body: request.body,
    url: request.url,
    method: request.method
  })

  if (result.valid) {
    // Process webhook
    reply.code(200).send('OK')
  } else {
    reply.code(401).send({ error: result.error })
  }
})

// AWS Lambda example
export const handler = async (event) => {
  const result = await verifier.verify({
    headers: event.headers,
    body: event.body,
    url: event.path,
    method: event.httpMethod
  })

  if (result.valid) {
    // Process webhook
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: result.error })
    }
  }
}
```

### Webhook Security Best Practices

1. **Always verify signatures**: Never trust webhook data without verification
2. **Check timestamp**: Prevent replay attacks by validating webhook age
3. **Use HTTPS**: Ensure webhooks are delivered over secure connections
4. **Store secrets securely**: Keep signing secrets in environment variables
5. **Handle failures gracefully**: Return appropriate HTTP status codes

```javascript
import { WebhookVerifier } from '@seven.io/client'

const verifier = new WebhookVerifier({
  signingSecret: process.env.SEVEN_SIGNING_SECRET,
  maxAgeSeconds: 300 // 5 minutes
})

// Comprehensive webhook handler
async function handleWebhook(req, res) {
  try {
    const result = await verifier.verify({
      headers: req.headers,
      body: req.body,
      url: req.originalUrl || req.url,
      method: req.method
    })

    if (!result.valid) {
      console.warn('Invalid webhook received:', {
        error: result.error,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      })
      return res.status(401).json({ error: 'Webhook verification failed' })
    }

    // Parse webhook payload
    const payload = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body

    // Process different webhook types
    switch (payload.webhook_event) {
      case 'sms_mo':
        await handleInboundSms(payload.data)
        break
      case 'dlr':
        await handleDeliveryReport(payload.data)
        break
      case 'voice_status':
        await handleVoiceStatus(payload.data)
        break
      default:
        console.log('Unknown webhook event:', payload.webhook_event)
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
```

### Request Signing Example

```javascript
import { Client, SmsResource } from '@seven.io/client'

// Enable request signing for enhanced security
const client = new Client({
  apiKey: 'YOUR_API_KEY',
  signingSecret: 'YOUR_SIGNING_SECRET'
})

const sms = new SmsResource(client)

// All requests will now include signature headers:
// X-Timestamp, X-Nonce, X-Signature
const result = await sms.dispatch({
  to: '+49176123456789',
  text: 'Signed request',
  from: 'SecureApp'
})
```

## TypeScript Support

The client is written in TypeScript and provides full type definitions for all methods and responses:

```typescript
import { Client, SmsResource, SmsResponse, SmsParams } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const sms = new SmsResource(client)

// Full IntelliSense support
const params: SmsParams = {
  to: '+49176123456789',
  text: 'TypeScript message',
  from: 'TypedApp'
}

const result: SmsResponse = await sms.dispatch(params)
console.log('Message ID:', result.success) // Type-safe access
```

### Type Imports

```typescript
import type {
  SmsParams,
  SmsResponse,
  LookupHlrParams,
  LookupHlrResponse,
  BalanceResponse,
  ContactParams,
  // ... all other types
} from '@seven.io/client'
```

## Error Handling

The seven.io API returns status codes in the response body (not as HTTP status codes). All API calls return successfully with HTTP 200, but the response contains a status code indicating the actual result:

```javascript
import { Client, SmsResource } from '@seven.io/client'

const client = new Client({ apiKey: 'YOUR_API_KEY' })
const sms = new SmsResource(client)

try {
  const result = await sms.dispatch({
    to: '+49176123456789',
    text: 'Hello World!',
    from: 'YourApp'
  })

  // Check the response status code
  if (result.success === '100') {
    console.log('SMS sent successfully')
  } else if (result.success === '101') {
    console.log('Partial failure - some messages not sent')
  } else {
    console.log('Failed with code:', result.success)
  }
} catch (error) {
  // Network or other errors
  console.error('Request failed:', error)
}
```

### Response Status Codes

These codes are returned in the response body, not as HTTP status codes:

- `100` - Success: SMS has been accepted and is being sent
- `101` - Partial failure: Sending to at least one recipient failed
- `201` - Invalid sender (max 11 alphanumeric or 16 numeric characters)
- `202` - Invalid recipient number
- `301` - Missing parameter: 'to' not set
- `305` - Invalid parameter: 'text' is invalid
- `401` - Text too long: Message exceeds character limit
- `402` - Reload lock: SMS already sent within last 180 seconds
- `403` - Daily limit reached for this recipient
- `500` - Insufficient credits to send message
- `600` - Carrier delivery failed
- `900` - Authentication failed (invalid API key)
- `901` - Signature verification failed (when using request signing)
- `902` - API key lacks access rights to this endpoint
- `903` - Request from disallowed IP address

## Environment Variables

For testing and development, you can explicitly load values from environment variables:

```javascript
// Manually load from environment (not automatic)
const client = new Client({
  apiKey: process.env.SEVEN_API_KEY,
  signingSecret: process.env.SEVEN_SIGNING_SECRET, // optional
  debug: process.env.SEVEN_DEBUG === '1'
})
```

### Required Environment Variables for Tests

```bash
export SEVEN_API_KEY="your_api_key_here"
export SEVEN_SIGNING_SECRET="your_signing_secret_here"  # optional
export SEVEN_DEBUG="1"  # optional, enables debug output
```

## API Reference

- [seven.io API Documentation](https://docs.seven.io/)
- [TypeDoc Generated Documentation](./docs/index.html)

## Development & Contributing

### Running Tests

1. Clone the repository:
   ```bash
   git clone https://github.com/seven-io/js-client.git
   cd js-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   export SEVEN_API_KEY="your_test_api_key"
   export SEVEN_SIGNING_SECRET="your_signing_secret"  # optional
   ```

4. Run tests:
   ```bash
   npm test
   ```

   Set `SEVEN_DEBUG=1` for detailed output during testing.

### Building the Project

```bash
# Development build with watch mode
npm run dev

# Production build
npm run build

# Generate documentation
npm run document
```

### Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Browser Compatibility

- **Modern browsers**: Full support (Chrome 65+, Firefox 57+, Safari 12+)
- **Node.js**: Version 12+ (18+ recommended for native fetch)
- **Legacy support**: Use polyfills for older environments

## Support

Need help? We're here to assist:

- 📚 [API Documentation](https://docs.seven.io/)
- 💬 [Contact Support](https://www.seven.io/en/company/contact/)
- 🐛 [Report Issues](https://github.com/seven-io/js-client/issues)
- 📝 [Changelog](https://github.com/seven-io/js-client/releases)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
