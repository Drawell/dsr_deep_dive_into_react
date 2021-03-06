import React from 'react'
import GameFieldPlacement from './game_field/GameFieldPlacement'
import { createEmptyGameField, IGameField } from './IGameField'
import NotificationOverlay, { EOverlayMessages } from './NotificationOverlay'
import './Game.css'
import GameFieldsBattle from './game_field/GameFieldsBattle'
import GameFieldsEnding from './game_field/GameFieldsEnding'

type TGameState = 'placement' | 'battle' | 'result'
type TPlayerTurn = 'playerOneTurn' | 'playerTwoTurn'

interface IGameReactState {
  gameState: TGameState
  playerTurn: TPlayerTurn
  overlayMessage: EOverlayMessages
  gameFieldOne: IGameField
  gameFieldTwo: IGameField
  shipCount: number
}

class Game extends React.Component<any, IGameReactState> {
  constructor(props: any) {
    super(props)
    this.state = {
      gameState: 'placement',
      playerTurn: 'playerOneTurn',
      overlayMessage: EOverlayMessages.placementOne,
      gameFieldOne: createEmptyGameField(5),
      gameFieldTwo: createEmptyGameField(5),
      shipCount: 8,
    }

    this.handleConfirmMessage = this.handleConfirmMessage.bind(this)
    this.handlePlayerTwoPlace = this.handlePlayerTwoPlace.bind(this)
    this.handleTurnPlayerOne = this.handleTurnPlayerOne.bind(this)
    this.handleTurnPlayerTwo = this.handleTurnPlayerTwo.bind(this)
    this.handleWin = this.handleWin.bind(this)
    this.beginNewGame = this.beginNewGame.bind(this)
  }

  handleConfirmMessage() {
    this.setState({ overlayMessage: EOverlayMessages.empty })
  }

  handlePlayerTwoPlace() {
    this.setState({
      gameState: 'placement',
      playerTurn: 'playerTwoTurn',
      overlayMessage: EOverlayMessages.placementTwo,
    })
  }

  handleTurnPlayerOne() {
    this.setState({
      gameState: 'battle',
      playerTurn: 'playerOneTurn',
      overlayMessage: EOverlayMessages.turnOne,
    })
  }

  handleTurnPlayerTwo() {
    this.setState({
      gameState: 'battle',
      playerTurn: 'playerTwoTurn',
      overlayMessage: EOverlayMessages.turnTwo,
    })
  }

  handleWin() {
    if (this.state.playerTurn === 'playerOneTurn') {
      this.setState({
        gameState: 'result',
        overlayMessage: EOverlayMessages.resultWinOne,
      })
    } else {
      this.setState({
        gameState: 'result',
        overlayMessage: EOverlayMessages.resultWinTwo,
      })
    }
  }

  beginNewGame() {
    this.setState({
      gameState: 'placement',
      playerTurn: 'playerOneTurn',
      overlayMessage: EOverlayMessages.placementOne,
      gameFieldOne: createEmptyGameField(5),
      gameFieldTwo: createEmptyGameField(5),
    })
  }

  render() {
    console.log('render', this.state)

    return (
      <div className="game-container">
        <div>
          <input
            value="???????????? ????????????"
            type="button"
            onClick={this.beginNewGame}
          />
        </div>
        {this.state.overlayMessage !== EOverlayMessages.empty && (
          <NotificationOverlay
            message={this.state.overlayMessage}
            onConfirm={this.handleConfirmMessage}
          />
        )}
        {this.state.gameState === 'placement' ? (
          this.state.playerTurn === 'playerOneTurn' ? (
            <GameFieldPlacement
              headerMessage="?????????????????????? ???????????? ??????????"
              shipCount={this.state.shipCount}
              gameField={this.state.gameFieldOne}
              onConfirm={this.handlePlayerTwoPlace}
            />
          ) : (
            <GameFieldPlacement
              headerMessage="?????????????????????? ???????????? ??????????"
              shipCount={this.state.shipCount}
              gameField={this.state.gameFieldTwo}
              onConfirm={this.handleTurnPlayerOne}
            />
          )
        ) : this.state.gameState === 'battle' ? (
          this.state.playerTurn === 'playerOneTurn' ? (
            <GameFieldsBattle
              headerMessage="?????? ?????????????? ????????????"
              gameFieldOwn={this.state.gameFieldOne}
              gameFieldEnemy={this.state.gameFieldTwo}
              onNextStep={this.handleTurnPlayerTwo}
              onWin={this.handleWin}
            />
          ) : (
            <GameFieldsBattle
              headerMessage="?????? ?????????????? ????????????"
              gameFieldOwn={this.state.gameFieldTwo}
              gameFieldEnemy={this.state.gameFieldOne}
              onNextStep={this.handleTurnPlayerOne}
              onWin={this.handleWin}
            />
          )
        ) : (
          this.state.gameState === 'result' && (
            <GameFieldsEnding
              headerMessage={
                this.state.playerTurn === 'playerOneTurn'
                  ? EOverlayMessages.resultWinOne
                  : EOverlayMessages.resultWinTwo
              }
              gameFieldOne={this.state.gameFieldOne}
              gameFieldTwo={this.state.gameFieldTwo}
            />
          )
        )}
      </div>
    )
  }
}

export default Game
