import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

ed.etc.sha512Sync = (...messages: Uint8Array[]) =>
  sha512(ed.etc.concatBytes(...messages));

const TOKEN_VERSION = "v1";
const MAX_TOKEN_LIFETIME_SECONDS = 60 * 60 * 24;

function decodeBase64Url(value: string): Uint8Array | null {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  } catch {
    return null;
  }
}

export function verifyInternalTestToken(
  token: string | null | undefined,
  publicKeyHex: string | null | undefined,
  nowMs = Date.now(),
): boolean {
  if (!token || !publicKeyHex || !/^[a-f0-9]{64}$/i.test(publicKeyHex)) return false;

  const [version, expiresRaw, signatureRaw, extra] = token.split(".");
  if (
    version !== TOKEN_VERSION ||
    extra !== undefined ||
    !/^\d{10}$/.test(expiresRaw ?? "") ||
    !/^[A-Za-z0-9_-]{86}$/.test(signatureRaw ?? "")
  ) {
    return false;
  }

  const expiresAt = Number(expiresRaw);
  const nowSeconds = Math.floor(nowMs / 1000);
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= nowSeconds ||
    expiresAt > nowSeconds + MAX_TOKEN_LIFETIME_SECONDS
  ) {
    return false;
  }

  const signature = decodeBase64Url(signatureRaw);
  if (!signature) return false;

  try {
    return ed.verify(
      signature,
      new TextEncoder().encode(`${TOKEN_VERSION}.${expiresRaw}`),
      ed.etc.hexToBytes(publicKeyHex),
      { zip215: false },
    );
  } catch {
    return false;
  }
}
