import { GamblingTileType, IGamblingTile, TileType } from '../types';

export enum FlowerTileColor {
	RED,
	BLUE,
}

export class FlowerTile implements IGamblingTile {
	gamblingTileType: GamblingTileType = GamblingTileType.FLOWER;
	id: string;
	type: TileType = TileType.GAMBLING;
	color: FlowerTileColor;
	number: number;

	colorToChar(_color: FlowerTileColor) {
		switch (_color) {
			case FlowerTileColor.RED:
				return 'R';
			case FlowerTileColor.BLUE:
				return 'B';
		}
	}

	constructor(_color: FlowerTileColor, _number: number) {
		this.color = _color;
		this.number = _number;
		this.id = `${this.colorToChar(_color)}F${this.number}`;
	}
}
