import React from 'react'
import { IGameField, TCellState } from '../IGameField'
import GameFieldGrid from './GameFieldGrid'

interface IGameFieldEnemyProps {
  gameField: IGameField
}

interface IGameFieldEnemyState {
  gameField: IGameField
}

class GameFieldEnemy extends React.Component<
  IGameFieldEnemyProps,
  IGameFieldEnemyState
> {
  constructor(props: IGameFieldEnemyProps) {
    super(props)
    this.state = { gameField: props.gameField }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(x: number, y: number, prevState: TCellState) {
    const gameField = this.state.gameField
    if (gameField.cells[y][x] === 'empty') {
      gameField.cells[y][x] = 'ship'
    } else {
      gameField.cells[y][x] = 'empty'
    }

    this.setState({ gameField })
  }

  render() {
    return (
      <GameFieldGrid
        gameField={this.state.gameField}
        hidden={false}
        onClick={this.handleClick}
      />
    )
  }
}

export default GameFieldEnemy
