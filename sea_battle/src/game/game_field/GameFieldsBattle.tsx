import React from 'react'
import { IGameField, TCellState } from '../IGameField'
import GameFieldGrid from './GameFieldGrid'
import '../Game.css'

interface IGameFieldsBattleProps {
  gameFieldOwn: IGameField
  gameFieldEnemy: IGameField
  headerMessage: string
  onNextStep: () => void
  onWin: () => void
}

interface IGameFieldsBattleState {
  gameFieldEnemy: IGameField
  isMadeShot: boolean
}

class GameFieldsBattle extends React.Component<
  IGameFieldsBattleProps,
  IGameFieldsBattleState
> {
  constructor(props: IGameFieldsBattleProps) {
    super(props)
    this.state = {
      gameFieldEnemy: this.props.gameFieldEnemy,
      isMadeShot: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps: IGameFieldsBattleProps) {
    if (this.props.gameFieldEnemy !== prevProps.gameFieldEnemy) {
      this.setState({
        gameFieldEnemy: this.props.gameFieldEnemy,
        isMadeShot: false,
      })
    }
  }

  handleClick(x: number, y: number, prevState: TCellState) {
    const gameField = this.props.gameFieldEnemy
    if (
      this.state.isMadeShot ||
      gameField.cells[y][x] === 'missing_shot' ||
      gameField.cells[y][x] === 'damaged_ship'
    ) {
      return
    } else if (gameField.cells[y][x] === 'ship') {
      gameField.cells[y][x] = 'damaged_ship'
    } else if (gameField.cells[y][x] === 'empty') {
      gameField.cells[y][x] = 'missing_shot'
    }

    if (!gameField.hasAliveShips()) {
      this.props.onWin()
    }

    this.setState({ gameFieldEnemy: gameField, isMadeShot: true })
  }

  render() {
    return (
      <div>
        <h3>{this.props.headerMessage}</h3>
        <input
          type="button"
          value="Продолжить"
          onClick={this.props.onNextStep}
          disabled={!this.state.isMadeShot}
        />

        <div className="d-flex">
          <GameFieldGrid
            gameField={this.props.gameFieldOwn}
            hidden={false}
            onClick={() => {}}
          />

          <GameFieldGrid
            gameField={this.state.gameFieldEnemy}
            hidden={true}
            onClick={this.handleClick}
          />
        </div>
      </div>
    )
  }
}

export default GameFieldsBattle
