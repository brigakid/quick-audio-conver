// Minimal type declaration for the 'music-tempo' package (no official @types available).
// Constructor accepts a Float32Array of PCM audio data.
// .tempo is -1 when detection fails, or a numeric string e.g. "128.000" on success.
// .beats is an array of beat timestamps in seconds.
declare module 'music-tempo' {
  export default class MusicTempo {
    constructor(audioData: Float32Array);
    tempo: number | string;
    beats: number[];
  }
}
