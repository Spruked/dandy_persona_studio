export const CANON_VERSION = 'bible-v1.2';
export const personas = {
  phil: { id:'pd:PhillipDandridge', name:'Phillip Dandridge', onAirName:'Phil Dandy', role:'The Engine / The Expander', origin:'Joplin, Missouri', birthOrder:'younger', source:'canonical/phil.persona.json' },
  jim: { id:'jd:JamesArthurDandridge', name:'James Arthur Dandridge', onAirName:'Jim Dandy', role:'The Filter / The Anchor', origin:'Joplin, Missouri', birthOrder:'older', source:'canonical/jim.persona.json' }
};
export const relationship = { id:'rel:SharedRelationshipSKG', familyName:'Dandridge', showName:'The Phil and Jim Dandy Show', showNameStatus:'OPEN', birthOrder:'Jim older, Phil younger', source:'canonical relationship SKG' };
export const episode = { id:'ep:EpisodeSKG', appendOnly:true, mustNotWriteTo:'rel:IdentitySKG', memories:[] };
