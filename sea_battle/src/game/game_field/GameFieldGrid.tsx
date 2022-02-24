import React from 'react'
import { IGameField, TCellState } from '../IGameField'
import FieldCell from './FieldCell'
import './GameField.css'
import SelectedFieldCell from './SelectedFieldCell'

interface IGameFieldGridProps {
  gameField: IGameField
  hidden: boolean
  selectedCellX?: number
  selectedCellY?: number
  onClick?: (x: number, y: number) => void
}

interface IGameFieldGridState {
  gameField: IGameField
}

class GameFieldGrid extends React.Component<
  IGameFieldGridProps,
  IGameFieldGridState
> {
  constructor(props: IGameFieldGridProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(x: number, y: number) {
    if (this.props.onClick) {
      this.props.onClick(x, y)
    }
  }

  render() {
    return (
      <div className="m-10">
        {this.props.gameField.cells.map((row, y) => {
          return (
            <div key={y} className="row">
              {row.map((cellType, x) => {
                let selected =
                  x === this.props.selectedCellX &&
                  y === this.props.selectedCellY
                return (
                  <FieldCell
                    key={`${x}-${y}`}
                    cellType={cellType}
                    hidden={this.props.hidden}
                    x={x}
                    y={y}
                    selected={selected}
                    onClick={this.handleClick}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default GameFieldGrid
