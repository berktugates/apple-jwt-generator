# Apple JWT Generator

A simple Node.js script that generates the Sign in with Apple client secret (JWT). The script reads the private key and all Apple Developer identifiers from environment variables.

## Requirements

- Node.js 18+
- npm or pnpm (optional, the script itself has no dependencies to install)
- A p8 private key created in the Apple Developer portal

## Setup

```bash
git clone git@github.com:berktugates/apple-jwt-generator.git
cd apple-jwt-generator
npm install
```

## Environment Variables

`jwt.js` expects the following variables:

| Variable | Description |
| --- | --- |
| `APPLE_PRIVATE_KEY` | Raw contents of the p8 key (single line with `\n` escapes). |
| `APPLE_KEY_PATH` | (Optional) Absolute path to the p8 key file. Used when `APPLE_PRIVATE_KEY` is not set. |
| `APPLE_TEAM_ID` | Apple Developer Team ID (`iss` claim). |
| `APPLE_KEY_ID` | Key ID of the p8 key (`kid` header). |
| `APPLE_SERVICE_ID` | Sign in with Apple Service ID (`sub` claim). |

Check `.env.example` for a filled template. Your actual `.env` file will be ignored by git thanks to `.gitignore`.

## Usage

Create your `.env` file (based on `.env.example`) and then run:

```bash
node jwt.js
```

The generated token can be used as the client secret when communicating with Apple.

## Security Notes

- Never commit the p8 key or your `.env` file; store secrets in environment variables or a secret manager.
- Prefer using separate keys for production and staging/test environments.
- The token expiration is set to Apple’s recommended maximum (~6 months). Adjust the `exp` value in `jwt.js` if you need a shorter lifetime.

