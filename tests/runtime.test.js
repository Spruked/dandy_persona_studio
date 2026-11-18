import assert from 'node:assert/strict';
import { verifyLockedCanon } from '../src/canon-lock.js';
import { buildModelRequest, verifyDialogue, loadCanonicalPersonas } from '../src/index.js';

assert.equal(verifyLockedCanon(), true);
const request = buildModelRequest({userPrompt:'Talk about the old tractor.'});
assert.equal(Object.keys(request.personaContext.identity).length, 2);
assert.equal(request.personaContext.relationship.id, 'rel:SharedRelationshipSKG');
assert.match(request.system, /bible-v1.2.2/);
assert.equal(loadCanonicalPersonas().phil.identity.birth_order, 'younger');
assert.equal(loadCanonicalPersonas().jim.identity.birth_order, 'older');

const pass = verifyDialogue({turns:[{speakerId:'pd:PhillipDandridge',text:'What if the tractor was a breakfast experiment?',sourceReferences:[]},{speakerId:'jd:JamesArthurDandridge',text:'Actually, the belt had grounds for complaint.',sourceReferences:[]}]});
assert.equal(pass.verdict,'pic:Passed');
assert.equal(pass.emitsDialogue,true);

const fail = verifyDialogue({turns:[{speakerId:'pd:PhillipDandridge',text:'As you know, I invented a tractor powered by coffee grounds.',sourceReferences:['external:bad']}]},{episodeIds:['ep:known']});
assert.equal(fail.verdict,'pic:Failed');
assert.equal(fail.emitsDialogue,false);
assert.ok(fail.failures.some(x=>x.includes('Canonical joke leak')));
assert.ok(fail.failures.some(x=>x.includes('Source boundary')));
console.log('Persona runtime tests passed.');
