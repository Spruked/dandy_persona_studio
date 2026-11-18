import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { relationship, episode, CANON_VERSION } from './personas.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function loadCanonicalPersona(key) { return JSON.parse(fs.readFileSync(path.join(root, 'canonical', `${key}.persona.json`), 'utf8')); }
export function loadCanonicalPersonas(keys=['phil','jim']) { return Object.fromEntries(keys.map(key => [key, loadCanonicalPersona(key)])); }
export function retrievePersonaContext({ speakers=['phil','jim'], episodeData=episode }={}) {
  const canonical = loadCanonicalPersonas(speakers);
  return { canonVersion:CANON_VERSION, immutable:true, identity:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,{...p.identity, sourceDocument:p.source_document}])), household:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,p.household])), personality:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,p.personality])), speech:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,p.speech])), behaviorRules:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,p.behavior_rules])), relationship, continuity:Object.fromEntries(Object.entries(canonical).map(([key,p])=>[key,p.continuity_rules])), episode:episodeData };
}
export function buildModelRequest({ userPrompt, speakers=['phil','jim'], episodeData=episode }={}) { const personaContext=retrievePersonaContext({speakers,episodeData}); return { system:'Generate dialogue using the complete canonical context. Identity is frozen at bible-v1.2. Missing fields are unknown and must not be invented. Episodic memories are append-only and cannot write to identity. Voice/TTS settings are separate from biography. Both speakers can initiate, challenge, tell stories, or joke; do not force a questioner/explainer script.', personaContext, user:userPrompt, outputSchema:{type:'object',required:['turns'],properties:{turns:{type:'array',items:{type:'object',required:['speakerId','text','sourceReferences']}}}} }; }
