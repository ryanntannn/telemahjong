import {
	IColorTile,
	INormalTile,
	NormalTileType,
	TileSuit,
	TileType,
} from '../types';
import { TileSuitToChar } from '../utils';

export class ColorTile implements IColorTile {
	id: string;
	number: number;
	suit: TileSuit;

	type: TileType = TileType.NORMAL;
	normalTileType: NormalTileType = NormalTileType.COLOR;

	constructor(_number: number, _suit: TileSuit) {
		this.number = _number;
		this.suit = _suit;
		this.id = `${TileSuitToChar(_suit)}${_number}`;
	}
}
