import assert from 'node:assert/strict';
import { buildModelRequest, verifyDialogue } from '../src/index.js';

const request = buildModelRequest({userPrompt:'Talk about the old tractor.'});
assert.equal(request.personaContext.identity.length, 2);
assert.equal(request.personaContext.relationship.id, 'rel:SharedRelationshipSKG');
assert.match(request.system, /Traits modulate/);

const pass = verifyDialogue({turns:[{speakerId:'pd:PhilDandy',text:'What if the tractor was a breakfast experiment?',sourceReferences:[]},{speakerId:'jd:JimDandy',text:'Actually, the belt had grounds for complaint.',sourceReferences:[]}]});
assert.equal(pass.verdict,'pic:Passed');
assert.equal(pass.emitsDialogue,true);

const fail = verifyDialogue({turns:[{speakerId:'pd:PhilDandy',text:'As you know, I invented a tractor powered by coffee grounds.',sourceReferences:['external:bad']}]},{episodeIds:['ep:known']});
assert.equal(fail.verdict,'pic:Failed');
assert.equal(fail.emitsDialogue,false);
assert.ok(fail.failures.some(x=>x.includes('Canonical joke leak')));
assert.ok(fail.failures.some(x=>x.includes('Source boundary')));
console.log('Persona runtime tests passed.');
