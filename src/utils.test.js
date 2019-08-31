import { getNeighbour, createMyNetwork, getXYindex } from './utils';

describe('utils', () => {
  describe('getXYindex', () => {
    it('10x10: 11 -> 1,1', () => {
      expect(getXYindex(11, 10, 10)).toEqual([1, 1]);
    });

    it('5x5: 3 -> 0,3', () => {
      expect(getXYindex(3, 5, 5)).toEqual([0, 3]);
    });

    it('5x5: 5 -> 1,0', () => {
      expect(getXYindex(3, 5, 5)).toEqual([0, 3]);
    });

    it('7x6: 1 -> 0,1', () => {
      expect(getXYindex(1, 7, 6)).toEqual([0, 1]);
    });
  });

  describe('getNeighbour', () => {
    it('top left corner', () => {
      const cells = [
        1, 0,
        1, 1,
      ];
      expect(getNeighbour(cells, 0, 0, 'left', 3, 3)).toEqual(undefined);
      expect(getNeighbour(cells, 0, 0, 'right', 3, 3)).toEqual(0);
      expect(getNeighbour(cells, 0, 0, 'bottom', 3, 3)).toEqual(1);
      expect(getNeighbour(cells, 0, 0, 'top', 3, 3)).toEqual(undefined);
    });

    it('central cell', () => {
      const cells = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
      ];
      expect(getNeighbour(cells, 1, 1, 'left', 3, 3)).toEqual(4);
      expect(getNeighbour(cells, 1, 1, 'right', 3, 3)).toEqual(6);
      expect(getNeighbour(cells, 1, 1, 'bottom', 3, 3)).toEqual(8);
      expect(getNeighbour(cells, 1, 1, 'top', 3, 3)).toEqual(2);
    });
  });

  describe('getNeighboursNetwork', () => {
    const config = {
      boardSizeX: 3,
      boardSizeY: 3,
    };

    it('should get connected neighbours', () => {
      const cells = [
        1, 0, 0,
        0, 1, 1,
        1, 1, 1,
      ].map((value, id) => ({ value, id }));

      expect(
        createMyNetwork(
          cells,
          cells[1],
          config,
        ),
      ).toEqual(
        new Set([1, 2]),
      );

      expect(
        createMyNetwork(
          cells,
          cells[4],
          config,
        ),
      ).toEqual(
        new Set([4, 5, 7]),
      );

      expect(
        createMyNetwork(
          cells,
          cells[5],
          config,
        ),
      ).toEqual(
        new Set([4, 5, 8]),
      );
    });
  });
});
