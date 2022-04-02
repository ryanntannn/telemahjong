import { GamblingTileType, IGamblingTile, TileType } from '../types';

export class AnimalTile implements IGamblingTile {
	gamblingTileType: GamblingTileType = GamblingTileType.ANIMAL;
	id: string;
	type: TileType = TileType.GAMBLING;
	eats: string;

	constructor(_id: string, _eats: string) {
		this.id = _id;
		this.eats = _eats;
	}
}
