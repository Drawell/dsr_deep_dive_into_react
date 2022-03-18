import React from 'react'
import { ICat } from './ICat'
import { ICatsViewCallbacks } from './ICatsView'

interface ICatListItemProps extends ICatsViewCallbacks {
  cat: ICat
}

interface ICatListItemState {
  cat: ICat
  fullTimeout: number
  hungryTimeout: number
}

class CatListItem extends React.Component<
  ICatListItemProps,
  ICatListItemState
> {
  constructor(props: ICatListItemProps) {
    super(props)
    this.state = {
      cat: this.props.cat,
      fullTimeout: 3000,
      hungryTimeout: 5000,
    }

    this.handleFeed = this.handleFeed.bind(this)
    this.handleTeme = this.handleTeme.bind(this)
  }

  handleFeed() {
    this.props.onFeed(this.props.cat.id)
  }

  handleTeme() {
    if (this.props.onTame) this.props.onTame(this.props.cat.id)
  }

  render() {
    return (
      <li className="cat-container">
        <span>{this.props.cat.id}</span>
        <span>Кличка: {this.props.cat.name}</span>
        <span>Годиков: {this.props.cat.age}</span>
        <span>{this.props.cat.hasCollar ? 'с ошейником' : 'без ошейника'}</span>
        <span>
          {!this.props.cat.isTamed && !this.props.cat.hasCollar && (
            <button onClick={this.handleTeme}>Приручить</button>
          )}
        </span>
        <span>
          {this.props.cat.isHungry ? (
            <button onClick={this.handleFeed}>Покормить</button>
          ) : (
            'Сыт'
          )}
        </span>
      </li>
    )
  }
}

export default CatListItem
