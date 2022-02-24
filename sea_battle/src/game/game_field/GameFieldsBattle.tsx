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
  isMissed: boolean
  selectedX: number
  selectedY: number
  lastShotMessage: string
}

class GameFieldsBattle extends React.Component<
  IGameFieldsBattleProps,
  IGameFieldsBattleState
> {
  constructor(props: IGameFieldsBattleProps) {
    super(props)
    this.state = {
      gameFieldEnemy: this.props.gameFieldEnemy,
      isMissed: false,
      selectedX: -1,
      selectedY: -1,
      lastShotMessage: '',
    }
    this.handleAttack = this.handleAttack.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.canNotAttack = this.canNotAttack.bind(this)
  }

  componentDidUpdate(prevProps: IGameFieldsBattleProps) {
    if (this.props.gameFieldEnemy !== prevProps.gameFieldEnemy) {
      this.setState({
        gameFieldEnemy: this.props.gameFieldEnemy,
        isMissed: false,
        lastShotMessage: '',
      })
    }
  }

  handleAttack() {
    const x = this.state.selectedX
    const y = this.state.selectedY
    const gameField = this.props.gameFieldEnemy
    let isMissed = false
    let lastShotMessage = ''

    if (gameField.cells[y][x] === 'ship') {
      gameField.cells[y][x] = 'damaged_ship'
      lastShotMessage = 'Убил'
    } else if (gameField.cells[y][x] === 'empty') {
      gameField.cells[y][x] = 'missing_shot'
      isMissed = true
      lastShotMessage = 'Промах'
    }

    if (!gameField.hasAliveShips()) {
      this.props.onWin()
    }

    this.setState({
      gameFieldEnemy: gameField,
      selectedX: -1,
      selectedY: -1,
      isMissed,
      lastShotMessage,
    })
  }

  handleCellClick(x: number, y: number) {
    if (
      this.state.isMissed ||
      this.props.gameFieldEnemy.cells[y][x] === 'missing_shot' ||
      this.props.gameFieldEnemy.cells[y][x] === 'damaged_ship'
    ) {
      return
    } else if (this.state.selectedX === x && this.state.selectedY === y) {
      this.setState({ selectedX: -1, selectedY: -1 })
    } else {
      this.setState({ selectedX: x, selectedY: y })
    }
  }

  canNotAttack() {
    return (
      this.state.isMissed ||
      this.state.selectedX === -1 ||
      this.state.selectedY === -1
    )
  }

  render() {
    return (
      <div>
        <h3>{this.props.headerMessage}</h3>
        {this.state.isMissed ? (
          <input
            type="button"
            value="Продолжить"
            onClick={this.props.onNextStep}
            className="m-10"
          />
        ) : (
          <input
            type="button"
            value="Атаковать"
            onClick={this.handleAttack}
            disabled={this.canNotAttack()}
            className="m-10"
          />
        )}

        <strong>{this.state.lastShotMessage}</strong>

        <div className="d-flex">
          <GameFieldGrid gameField={this.props.gameFieldOwn} hidden={false} />

          <GameFieldGrid
            gameField={this.state.gameFieldEnemy}
            hidden={true}
            selectedCellX={this.state.selectedX}
            selectedCellY={this.state.selectedY}
            onClick={this.handleCellClick}
          />
        </div>
      </div>
    )
  }
}

export default GameFieldsBattle
