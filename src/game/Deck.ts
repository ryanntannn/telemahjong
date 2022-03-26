import { TilesDatabase } from './tiles/TilesDatabase';
import { shuffle } from './utils';

export class Deck {
	tiles: string[];

	constructor() {
		this.tiles = shuffle([...TilesDatabase.template]);
	}
}
