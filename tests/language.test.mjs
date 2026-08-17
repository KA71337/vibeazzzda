import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_LANG,isLang} from '../src/lib/i18n.ts';

test('Azerbaijani is the first-visit language',()=>{
 assert.equal(DEFAULT_LANG,'az');
});

test('only AZ, RU and EN can be restored from storage',()=>{
 assert.equal(isLang('az'),true);
 assert.equal(isLang('ru'),true);
 assert.equal(isLang('en'),true);
 assert.equal(isLang('de'),false);
 assert.equal(isLang('<script>'),false);
});
