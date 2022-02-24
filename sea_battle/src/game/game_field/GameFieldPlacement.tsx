import React from 'react'
import { IGameField, TCellState } from '../IGameField'
import GameFieldGrid from './GameFieldGrid'

interface IGameFieldPlacementProps {
  gameField: IGameField
  shipCount: number
  headerMessage: string
  onConfirm: () => void
}

interface IGameFieldPlacementState {
  gameField: IGameField
  shipsLeft: number
}

class GameFieldPlacement extends React.Component<
  IGameFieldPlacementProps,
  IGameFieldPlacementState
> {
  constructor(props: IGameFieldPlacementProps) {
    super(props)
    this.state = { gameField: props.gameField, shipsLeft: props.shipCount }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps: IGameFieldPlacementProps) {
    if (this.props.gameField !== prevProps.gameField) {
      this.setState({
        gameField: this.props.gameField,
        shipsLeft: this.props.shipCount,
      })
    }
  }

  handleClick(x: number, y: number, prevState: TCellState) {
    const gameField = this.state.gameField
    let newShipCount = this.state.shipsLeft
    if (this.state.shipsLeft !== 0 && gameField.cells[y][x] === 'empty') {
      gameField.cells[y][x] = 'ship'
      newShipCount -= 1
    } else if (gameField.cells[y][x] === 'ship') {
      gameField.cells[y][x] = 'empty'
      newShipCount += 1
    }

    this.setState({ gameField, shipsLeft: newShipCount })
  }

  render() {
    return (
      <div>
        <h3>{this.props.headerMessage}</h3>
        <h5>
          Кораблей осталось {this.state.shipsLeft} из {this.props.shipCount}
        </h5>
        <input
          type="button"
          value="Продолжить"
          onClick={this.props.onConfirm}
          disabled={this.state.shipsLeft !== 0}
        />

        <GameFieldGrid
          gameField={this.state.gameField}
          hidden={false}
          onClick={this.handleClick}
        />
      </div>
    )
  }
}

export default GameFieldPlacement
