type TCellState = 'empty' | 'ship' | 'damaged_ship' | 'missing_shot'

interface IGameField {
  cells: TCellState[][]
  size: number
  hasAliveShips: () => boolean
}

function _hasAliveShips(this: IGameField) {
  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      if (this.cells[i][j] === 'ship') return true
    }
  }

  return false
}

function createEmptyGameField(size: number): IGameField {
  const cells: TCellState[][] = []

  for (let i = 0; i < size; i++) {
    const row: TCellState[] = []
    for (let j = 0; j < size; j++) {
      row.push('empty')
    }
    cells.push(row)
  }

  let gameField: IGameField = {
    cells,
    size,
    hasAliveShips: () => {
      return false
    },
  }
  gameField.hasAliveShips = _hasAliveShips.bind(gameField)
  return gameField
}

export type { IGameField, TCellState }
export { createEmptyGameField }
