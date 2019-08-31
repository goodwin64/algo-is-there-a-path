import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import './App.css';
import isTherePath, { getCellsNeighboursNetwork } from './utils.ts';

export const config = {
  boardSizeX: 25,
  boardSizeY: 25,
  boardSizePx: 720,
};
export const styles = {
  cellSizePx: config.boardSizePx / config.boardSizeX,
};

const cells = Array(config.boardSizeX * config.boardSizeY)
  .fill(null)
  .map((value, index) => ({
    value: Math.round(Math.random()),
    id: index,
  }))
;

// const cells = [{"value":1,"id":0},{"value":0,"id":1},{"value":0,"id":2},{"value":1,"id":3},{"value":1,"id":4},{"value":1,"id":5},{"value":1,"id":6},{"value":0,"id":7},{"value":0,"id":8},{"value":1,"id":9},{"value":0,"id":10},{"value":0,"id":11},{"value":0,"id":12},{"value":1,"id":13},{"value":1,"id":14},{"value":1,"id":15},{"value":0,"id":16},{"value":1,"id":17},{"value":1,"id":18},{"value":1,"id":19},{"value":0,"id":20},{"value":1,"id":21},{"value":1,"id":22},{"value":1,"id":23},{"value":1,"id":24},{"value":1,"id":25},{"value":1,"id":26},{"value":1,"id":27},{"value":1,"id":28},{"value":1,"id":29},{"value":1,"id":30},{"value":0,"id":31},{"value":0,"id":32},{"value":1,"id":33},{"value":0,"id":34},{"value":1,"id":35},{"value":0,"id":36},{"value":0,"id":37},{"value":0,"id":38},{"value":1,"id":39},{"value":0,"id":40},{"value":0,"id":41},{"value":1,"id":42},{"value":1,"id":43},{"value":1,"id":44},{"value":1,"id":45},{"value":0,"id":46},{"value":0,"id":47},{"value":1,"id":48},{"value":0,"id":49},{"value":1,"id":50},{"value":0,"id":51},{"value":0,"id":52},{"value":0,"id":53},{"value":1,"id":54},{"value":0,"id":55},{"value":0,"id":56},{"value":0,"id":57},{"value":0,"id":58},{"value":0,"id":59},{"value":0,"id":60},{"value":0,"id":61},{"value":1,"id":62},{"value":0,"id":63},{"value":1,"id":64},{"value":1,"id":65},{"value":1,"id":66},{"value":1,"id":67},{"value":1,"id":68},{"value":1,"id":69},{"value":1,"id":70},{"value":0,"id":71},{"value":1,"id":72},{"value":1,"id":73},{"value":1,"id":74},{"value":0,"id":75},{"value":0,"id":76},{"value":0,"id":77},{"value":1,"id":78},{"value":0,"id":79},{"value":0,"id":80},{"value":1,"id":81},{"value":1,"id":82},{"value":0,"id":83},{"value":0,"id":84},{"value":0,"id":85},{"value":0,"id":86},{"value":0,"id":87},{"value":1,"id":88},{"value":1,"id":89},{"value":1,"id":90},{"value":1,"id":91},{"value":0,"id":92},{"value":0,"id":93},{"value":1,"id":94},{"value":1,"id":95},{"value":0,"id":96},{"value":0,"id":97},{"value":1,"id":98},{"value":0,"id":99}]

const cellToNeighbourhood = getCellsNeighboursNetwork(cells, config);

function App() {
  const [startPointId, setStartPointId] = React.useState(-1);
  const [endPointId, setEndPointId] = React.useState(-1);

  const startPointNeighbours = cellToNeighbourhood[startPointId] || new Set();
  console.log('startPointNeighbours', startPointNeighbours);

  const handleCellClick = (e) => {
    const cellId = +e.target.dataset.cellId;
    if (cellId === startPointId) {
      setStartPointId(-1);
    } else if (cellId === endPointId) {
      setEndPointId(-1);
    } else if (startPointId === -1) {
      setStartPointId(cellId);
    } else {
      setEndPointId(cellId);
    }
  };

  return (
    <div>
      <div
        id="board"
        style={{ width: config.boardSizePx, height: config.boardSizePx }}
      >
        {
          _.chunk(cells, config.boardSizeY).map(row => (
            <div className="row" key={row[0].id}>
              {
                row.map((cell) => (
                  <div
                    key={cell.id}
                    className={classnames('cell', {
                      filled: cell.value,
                      startPoint: startPointId === cell.id,
                      endPoint: endPointId === cell.id,
                      isInNeighbour: startPointNeighbours.has(cell),
                    })}
                    data-cell-id={cell.id}
                    onClick={handleCellClick}
                    style={{ width: styles.cellSizePx, height: styles.cellSizePx }}
                  >
                    {startPointId === cell.id || endPointId === cell.id || cell.id}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <h1 className="result">
        {
          startPointId === -1 || endPointId === -1
            ? 'select start & end points'
            : isTherePath(cells, startPointId, endPointId, config) ? 'path exists' : 'no path'
        }
      </h1>
    </div>
  );
}

export default App;
