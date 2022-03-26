import { ITile, TileSuit, Wind } from '../types';
import { ColorTile } from './ColorTile';
import { DragonTile } from './DragonTile';
import { WindTile } from './WindTile';

export class TilesDatabase {
	private static _tiles: Map<string, ITile>;
	public static get tiles(): Map<string, ITile> {
		return TilesDatabase._tiles;
	}
	private static set tiles(value: Map<string, ITile>) {
		TilesDatabase._tiles = value;
	}

	private static _template: string[] = [];
	public static get template(): string[] {
		return TilesDatabase._template;
	}
	private static set template(value: string[]) {
		TilesDatabase._template = value;
	}

	static init() {
		let tilesList = [];
		for (let i = 1; i <= 9; i++) {
			tilesList.push(new ColorTile(i, TileSuit.BAMBOO));
			tilesList.push(new ColorTile(i, TileSuit.CIRCLE));
			tilesList.push(new ColorTile(i, TileSuit.NUMBERS));
		}

		tilesList.push(new DragonTile('HZ'));
		tilesList.push(new DragonTile('BB'));
		tilesList.push(new DragonTile('FC'));

		tilesList.push(new WindTile(Wind.EAST));
		tilesList.push(new WindTile(Wind.SOUTH));
		tilesList.push(new WindTile(Wind.WEST));
		tilesList.push(new WindTile(Wind.NORTH));

		tilesList.forEach((tile, i) => {
			TilesDatabase.tiles.set(tile.id, tile);
			this.template.push(tile.id, tile.id, tile.id, tile.id);
		});

		console.log('Initialised TileDB');
	}
	constructor() {
		TilesDatabase.tiles = new Map<string, ITile>();
		TilesDatabase.init();
	}
}
