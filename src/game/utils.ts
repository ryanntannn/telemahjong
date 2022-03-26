import { TilesDatabase } from './tiles/TilesDatabase';
import { ITile, TileSuit, Wind } from './types';

export function TileSuitToChar(_suit: TileSuit) {
	switch (_suit) {
		case TileSuit.BAMBOO:
			return 'B';
		case TileSuit.CIRCLE:
			return 'C';
		case TileSuit.NUMBERS:
			return 'N';
	}
}

export function WindToTileId(_wind: Wind) {
	switch (_wind) {
		case Wind.EAST:
			return 'DF';
		case Wind.SOUTH:
			return 'NF';
		case Wind.WEST:
			return 'XF';
		case Wind.NORTH:
			return 'BF';
	}
}

export function shuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

export function tileIdToTiles(_tileIds: string[]): ITile[] {
	return _tileIds.map((_id) => TilesDatabase.tiles.get(_id)!);
}

export function randomGameCode() {
	return Math.floor(1000 + Math.random() * 9000);
}
