const GameConfig = new Map();

const _class = new Map();
_class.set(0, '🗡️');
_class.set(1, '🔥');
_class.set(2, '🐅');
_class.set(3, '🏹');
GameConfig.set('class', _class);

const evolution = new Map();
evolution.set(0, 'Mortal');
evolution.set(1, 'Arch');
evolution.set(2, 'Celestial');
evolution.set(3, 'Celestial');
evolution.set(4, 'SubCelestial');
GameConfig.set('evolution', evolution);

const kingdom = new Map();
kingdom.set(0, '⬜');
kingdom.set(7, '🟦');
kingdom.set(8, '🟥');
GameConfig.set('kingdom', kingdom);

export default GameConfig as Map<string, Map<number, string>>;