export enum Wind {
	EAST,
	SOUTH,
	WEST,
	NORTH,
}

export enum TileType {
	NORMAL,
	GAMBLING,
}

export enum TileSuit {
	BAMBOO,
	CIRCLE,
	NUMBERS,
}

export enum HonorTileType {
	WIND,
	DRAGON,
}

export enum NormalTileType {
	COLOR,
	HONOR,
}

export enum GamblingTileType {
	FLOWER,
	ANIMAL,
}

export interface ITile {
	id: string; //Unique 2 Digit Identifier (i.e. 2 BAMBOO = 2B, Bai Ban = BB)
	type: TileType;
}

export interface INormalTile extends ITile {
	normalTileType: NormalTileType;
}

export interface IColorTile extends INormalTile {
	number: number;
	suit: TileSuit;
}

export interface IHonorTile extends INormalTile {
	honorTileType: HonorTileType;
}

export interface IWindTile extends IHonorTile {
	wind: Wind;
}

export interface IGamblingTile extends ITile {
	gamblingTileType: GamblingTileType;
}
