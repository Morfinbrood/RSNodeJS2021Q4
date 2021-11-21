import { createRequire } from "module";
const require = createRequire(import.meta.url);
const json = require('./app/assets/alphabets.json');

export const ALPHABET = json.en;
export const CAESAR_SHIFT = 1;
export const ROT8_SHIFT = 8;

export const CONFIG_X_ARGS = ['C', 'R', 'A'];
export const CONFIG_Y_ARGS = ['0', '1'];

export const CHUNK_LENGTH = 10;