import React from 'react'
import { IGameField, TCellState } from '../IGameField'
import FieldCell from './FieldCell'
import './GameField.css'

interface IGameFieldGridProps {
  gameField: IGameField
  hidden: boolean
  onClick: (x: number, y: number, prevState: TCellState) => void
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
  }

  render() {
    return (
      <div className="m-10">
        {this.props.gameField.cells.map((row, y) => {
          return (
            <div key={y} className="row">
              {row.map((cellType, x) => {
                return (
                  <FieldCell
                    key={`${x}-${y}`}
                    cellType={cellType}
                    hidden={this.props.hidden}
                    x={x}
                    y={y}
                    onClick={this.props.onClick}
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
