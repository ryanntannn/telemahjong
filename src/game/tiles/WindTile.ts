import {
	HonorTileType,
	IHonorTile,
	IWindTile,
	NormalTileType,
	TileSuit,
	TileType,
	Wind,
} from '../types';
import { WindToTileId } from '../utils';

export class WindTile implements IWindTile {
	id: string;

	type: TileType = TileType.NORMAL;
	wind: Wind;
	normalTileType: NormalTileType = NormalTileType.HONOR;
	honorTileType: HonorTileType = HonorTileType.WIND;

	constructor(_wind: Wind) {
		this.wind = _wind;
		this.id = WindToTileId(_wind);
	}
}
