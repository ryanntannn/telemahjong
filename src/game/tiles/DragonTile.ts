import {
	HonorTileType,
	IHonorTile,
	NormalTileType,
	TileSuit,
	TileType,
} from '../types';

export class DragonTile implements IHonorTile {
	id: string;

	type: TileType = TileType.NORMAL;
	normalTileType: NormalTileType = NormalTileType.HONOR;
	honorTileType: HonorTileType = HonorTileType.DRAGON;

	constructor(_id: string) {
		this.id = _id;
	}
}
