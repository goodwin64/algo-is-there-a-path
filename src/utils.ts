import { IAppConfig, ICell, IAllCellsNetwork, IDirection, IOneCellNetwork } from './Interfaces';

export default function isTherePath(
  cells: ICell[],
  id1: number,
  id2: number,
  config: IAppConfig,
): boolean {
  const cellToNeighbourhood = getCellsNeighboursNetwork(cells, config);
  const startNeigbourNetwork = cellToNeighbourhood[id1];
  const endPoint = cells[id2];
  return startNeigbourNetwork.has(endPoint.id);
}

export function getCellsNeighboursNetwork(
  cells: ICell[],
  config: IAppConfig,
) {
  const cellToNeighbourhood: IAllCellsNetwork = {};

  for (let i = 0; i < cells.length; i++) {
    const currentCell = cells[i];
    const [currentIndexY, currentIndexX] = getXYindex(i, config.boardSizeY, config.boardSizeX);
    const [t, r, b, l] = [
      getNeighbour(cells, currentIndexY, currentIndexX, 'top', config.boardSizeY, config.boardSizeX),
      getNeighbour(cells, currentIndexY, currentIndexX, 'right', config.boardSizeY, config.boardSizeX),
      getNeighbour(cells, currentIndexY, currentIndexX, 'bottom', config.boardSizeY, config.boardSizeX),
      getNeighbour(cells, currentIndexY, currentIndexX, 'left', config.boardSizeY, config.boardSizeX),
    ];
    const myNetwork = createMyNetwork(cells, currentCell, config);
    if (!(i in cellToNeighbourhood)) {
      cellToNeighbourhood[i] = myNetwork;
    }

    [t, r, b, l].forEach(neighbour => {
      if (!neighbour || !isConnected(currentCell, neighbour) || !(neighbour.id in cellToNeighbourhood)) {
        return;
      }
      mergeSets(myNetwork, cellToNeighbourhood[neighbour.id]);
    });

    [t, r, b, l].forEach(neighbour => {
      if (!neighbour || !isConnected(currentCell, neighbour) || !(neighbour.id in cellToNeighbourhood)) {
        return;
      }
      cellToNeighbourhood[neighbour.id].forEach((member) => {
        if (cellToNeighbourhood[member]) {
          mergeSets(cellToNeighbourhood[member], myNetwork);
        }
      })
    });
  }
  return cellToNeighbourhood;
}

export function mergeSets<T>(s1: Set<T>, s2: Set<T>) {
  s2.forEach(elem => s1.add(elem));
}

export function createMyNetwork(
  cells: ICell[],
  currentCell: ICell,
  config: IAppConfig,
): IOneCellNetwork {
  const [currentIndexY, currentIndexX] = getXYindex(currentCell.id, config.boardSizeY, config.boardSizeX);

  const [t, r, b, l] = [
    getNeighbour(cells, currentIndexY, currentIndexX, 'top', config.boardSizeY, config.boardSizeX),
    getNeighbour(cells, currentIndexY, currentIndexX, 'right', config.boardSizeY, config.boardSizeX),
    getNeighbour(cells, currentIndexY, currentIndexX, 'bottom', config.boardSizeY, config.boardSizeX),
    getNeighbour(cells, currentIndexY, currentIndexX, 'left', config.boardSizeY, config.boardSizeX),
  ];

  // @ts-ignore
  return new Set(
    [t, r, b, l, currentCell]
      .filter(Boolean)
      .filter(neighbour => isConnected(neighbour, currentCell))
      // @ts-ignore
      .map(cell => cell.id),
  );
}

export function getXYindex(
  flatIndex: number,
  rowsCount: number,
  cellsCount: number,
): [number, number] {
  return [
    Math.floor(flatIndex / rowsCount),
    flatIndex % cellsCount,
  ];
}

export function getNeighbour(
  cells: ICell[],
  indexY: number,
  indexX: number,
  direction: IDirection,
  boardSizeY: number,
  boardSizeX: number,
): ICell | undefined {
  let deltaX = 0;
  let deltaY = 0;

  if (direction === 'left') {
    if (indexX === 0) {
      return undefined;
    }
    deltaX = -1;
  } else if (direction === 'right') {
    if (indexX === boardSizeX - 1) {
      return undefined;
    }
    deltaX = 1;
  } else if (direction === 'top') deltaY = -1;
  else if (direction === 'bottom') deltaY = 1;

  const rowIndex = indexY + deltaY;
  const cellIndex = indexX + deltaX;

  return cells[(rowIndex) * boardSizeY + (cellIndex)];
}

function isConnected(
  cell1?: ICell,
  cell2?: ICell,
): Boolean {
  return Boolean(cell1 && cell2 && cell1.value === cell2.value);
}
