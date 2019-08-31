export interface IAppConfig {
  boardSizeX: number;
  boardSizeY: number;
}

export interface ICell {
  value: number;
  id: number;
}

export type IDirection = 'top' | 'right' | 'bottom' | 'left';

export type IOneCellNetwork = Set<ICell['id']>;

export type IAllCellsNetwork = {
  [key: string]: IOneCellNetwork
}
