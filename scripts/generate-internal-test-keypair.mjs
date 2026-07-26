import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

ed.etc.sha512Sync = (...messages) => sha512(ed.etc.concatBytes(...messages));

const privateKey = ed.utils.randomPrivateKey();
const publicKey = ed.getPublicKey(privateKey);

console.log(`INTERNAL_TEST_PRIVATE_KEY=${ed.etc.bytesToHex(privateKey)}`);
console.log(`NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY=${ed.etc.bytesToHex(publicKey)}`);
