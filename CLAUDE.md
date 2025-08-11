# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official JavaScript/TypeScript API client for seven.io, a communications platform providing SMS, voice, lookup, and other messaging services. The client supports both Node.js and browser environments.

## Development Commands

### Building
- `npm run build` - Clean dist folder, compile TypeScript, and build with Vite
- `npm run dev` - Start Vite development server
- `npm run preview` - Preview the built application

### Testing
- `npm test` - Run Jest test suite
- Test files are located in `tests/` directory with `.spec.ts` extension
- Tests require environment variables: `SEVEN_API_KEY` and `SEVEN_SIGNING_SECRET`
- Set `SEVEN_DEBUG=1` for detailed output during testing

### Documentation
- `npm run document` - Generate TypeDoc documentation in markdown format to `./md` directory
- Documentation is also generated as HTML in `./docs` directory

## Architecture

### Core Components

**Client (`src/Client.ts`)**
- Main HTTP client handling all API requests to `https://gateway.seven.io/api`
- Supports both API key authentication (`X-Api-Key` header) and Bearer token authentication
- Implements request signing with HMAC-SHA256 when `signingSecret` is provided
- Cross-platform fetch implementation (browser native, Node.js with polyfill)

**AbstractResource (`src/resources/AbstractResource.ts`)**
- Base class for all API resource classes
- Provides access to the shared Client instance

**Resource Pattern**
Each API endpoint is organized into resource modules under `src/resources/`:
- `analytics/` - Usage analytics and reporting
- `balance/` - Account balance queries
- `contacts/` - Contact management 
- `groups/` - Contact group management
- `hooks/` - Webhook management
- `journal/` - Message history/journal
- `lookup/` - Phone number lookup (HLR, MNP, CNAM)
- `numbers/` - Phone number management
- `pricing/` - Pricing information
- `rcs/` - Rich Communication Services
- `sms/` - SMS messaging
- `status/` - Message status tracking
- `subaccounts/` - Subaccount management
- `validate/` - Phone number validation
- `voice/` - Voice/TTS services

Each resource follows the pattern:
- `{Resource}Resource.ts` - Main resource class extending AbstractResource
- `{Resource}Payload.ts` - Request payload transformation classes
- `types.ts` - TypeScript type definitions
- `constants.ts` - Resource-specific constants
- `index.ts` - Exports

### Build System

- **TypeScript**: Configured for ES2020 target with strict mode
- **Vite**: Primary build tool for library bundling
- **Output**: Dual ESM/UMD builds in `dist/` directory
- **Types**: TypeScript declarations generated via vite-plugin-dts

### Environment Support

The client handles browser/Node.js differences for:
- Global fetch API (uses node-fetch polyfill for Node.js < 18)
- Crypto operations (Web Crypto API vs Node.js crypto module)
- MD5 hashing (js-md5 for browser, Node.js crypto for server)

### Testing

- **Jest** with TypeScript support
- **jsdom** environment for browser API simulation
- Environment variables required for live API testing
- Coverage reports generated in `coverage/` directory