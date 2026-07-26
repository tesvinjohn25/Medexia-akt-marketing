import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

ed.etc.sha512Sync = (...messages) => sha512(ed.etc.concatBytes(...messages));

const privateKeyHex = process.env.INTERNAL_TEST_PRIVATE_KEY;
if (!privateKeyHex || !/^[a-f0-9]{64}$/i.test(privateKeyHex)) {
  console.error("Set INTERNAL_TEST_PRIVATE_KEY to the 64-character private seed generated for QA.");
  process.exit(1);
}

const requestedLifetime = Number(process.argv[2] || 1800);
if (
  !Number.isSafeInteger(requestedLifetime) ||
  requestedLifetime < 60 ||
  requestedLifetime > 86400
) {
  console.error("Lifetime must be an integer from 60 to 86400 seconds.");
  process.exit(1);
}

const expiresAt = Math.floor(Date.now() / 1000) + requestedLifetime;
const payload = `v1.${expiresAt}`;
const signature = Buffer.from(
  ed.sign(
    new TextEncoder().encode(payload),
    ed.etc.hexToBytes(privateKeyHex),
  ),
).toString("base64url");

console.log(`${payload}.${signature}`);
