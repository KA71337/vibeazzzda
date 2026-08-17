import test from 'node:test';
import assert from 'node:assert/strict';
import {decodeSession,newSession} from '../src/server/session-core.ts';

const secret='0123456789abcdef0123456789abcdef';

test('valid sessions verify and expire server-side',()=>{
 const now=1_800_000_000_000,{token,data}=newSession(secret,now);
 assert.deepEqual(decodeSession(token,secret,now+1000),data);
 assert.equal(decodeSession(token,secret,data.exp),null);
});

test('tampered, malformed and oversized sessions are rejected',()=>{
 const {token}=newSession(secret,1_800_000_000_000);
 assert.equal(decodeSession(token+'x',secret,1_800_000_000_001),null);
 assert.equal(decodeSession('invalid',secret),null);
 assert.equal(decodeSession('a'.repeat(1025),secret),null);
 assert.equal(decodeSession(token,'different-secret-different-secret',1_800_000_000_001),null);
});
