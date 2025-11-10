require('dotenv').config();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = (() => {
  if (process.env.APPLE_PRIVATE_KEY && process.env.APPLE_PRIVATE_KEY.trim()) {
    return process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  }

  if (process.env.APPLE_KEY_PATH && process.env.APPLE_KEY_PATH.trim()) {
    const absolutePath = path.isAbsolute(process.env.APPLE_KEY_PATH)
      ? process.env.APPLE_KEY_PATH
      : path.join(process.cwd(), process.env.APPLE_KEY_PATH);
    return fs.readFileSync(absolutePath, 'utf8');
  }

  throw new Error('Apple private key bulunamadı. APPLE_PRIVATE_KEY veya APPLE_KEY_PATH değişkenlerinden birini tanımlayın.');
})();

const payload = {
  iss: process.env.APPLE_TEAM_ID,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (86400 * 180),
  aud: 'https://appleid.apple.com',
  sub: process.env.APPLE_SERVICE_ID
};

if (!payload.iss || !payload.sub) {
  throw new Error('The APPLE_TEAM_ID and APPLE_SERVICE_ID variables are required.');
}

const token = jwt.sign(payload, privateKey, {
  algorithm: 'ES256',
  header: { kid: process.env.APPLE_KEY_ID }
});

console.log('JWT Token:');
console.log(token);