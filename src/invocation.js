import { personas, relationship, episode } from './personas.js';

export function retrievePersonaContext({ speakers=['phil','jim'], episodeData=episode }={}) {
  const selected = speakers.map(key => personas[key]).filter(Boolean);
  return { identity: selected.map(({id,name,origin,role})=>({id,name,origin,role})), behavioral: selected.map(({id,traits})=>({id,traits})), voice: selected.map(({id,voice})=>({id,voice})), relationship, episode: episodeData };
}

export function buildModelRequest({ userPrompt, speakers=['phil','jim'], episodeData=episode }={}) {
  const context = retrievePersonaContext({speakers, episodeData});
  return { system: 'You are a dialogue generator conditioned by the supplied persona context. Traits modulate; they do not determine fixed roles. Both speakers may initiate, challenge, tell a story, or joke. Keep episodic jokes framed as jokes. Do not overwrite identity.', personaContext: context, user: userPrompt, outputSchema: {type:'object',required:['turns'],properties:{turns:{type:'array',items:{type:'object',required:['speakerId','text','sourceReferences']}}}} };
}
