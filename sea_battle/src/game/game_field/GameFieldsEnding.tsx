import React from 'react'
import { IGameField } from '../IGameField'
import GameFieldGrid from './GameFieldGrid'

interface IGameFieldsEndingProps {
  gameFieldOne: IGameField
  gameFieldTwo: IGameField
  headerMessage: string
}

interface IGameFieldsEndingState {}

class GameFieldsEnding extends React.Component<
  IGameFieldsEndingProps,
  IGameFieldsEndingState
> {
  constructor(props: IGameFieldsEndingProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>{this.props.headerMessage}</h3>

        <div className="d-flex">
          <GameFieldGrid gameField={this.props.gameFieldOne} hidden={false} />

          <GameFieldGrid gameField={this.props.gameFieldTwo} hidden={false} />
        </div>
      </div>
    )
  }
}

export default GameFieldsEnding
