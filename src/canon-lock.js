import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LOCKED_SHA256 = Object.freeze({
  phil: '1e7dd4416c46edef890f939a45dccc84be0e08f89dc06b3c9bc204c82d74b4ab',
  jim: 'f81d0e2c0e218996c015b78b66d80bb38937ca96b3c8b7dec42690337cf77bda',
});
export function verifyLockedCanon() {
  const release = JSON.parse(fs.readFileSync(path.join(root, 'canon-release-v1.2.2.json'), 'utf8'));
  if (release.version !== '1.2.2' || release.status !== 'approved_locked') throw new Error('Canon release not approved/locked');
  for (const name of ['phil','jim']) {
    const expected = LOCKED_SHA256[name];
    if (release.files?.[name + '.persona.json']?.sha256 !== expected) throw new Error('Canon release manifest mismatch: ' + name);
    const raw = fs.readFileSync(path.join(root, 'canonical', name + '.persona.json'));
    const actual = crypto.createHash('sha256').update(raw).digest('hex');
    if (actual !== expected) throw new Error('Canon SHA-256 mismatch: ' + name);
    const data = JSON.parse(raw.toString('utf8'));
    if (data.version !== '1.2.2' || data.canon_status !== 'approved_locked' || data.character_id !== name) throw new Error('Canon metadata mismatch: ' + name);
  }
  return true;
}
