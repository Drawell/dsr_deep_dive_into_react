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
      <li className="cat-li">
        <div className="cat-view-container">
          <div>
            <span className="attribute-name">Кличка: </span>
            <span>{this.props.cat.name}</span>
          </div>
          <div>
            <span className="attribute-name">Годиков: </span>
            <span>{this.props.cat.age}</span>
          </div>
          <div>
            <span className="attribute-name">Ошейник: </span>
            {this.props.cat.hasCollar ? 'на месте' : 'отсутствует'}
          </div>
          <div>
            <span className="attribute-name">Cтатус: </span>
            {this.props.cat.isHungry ? (
              <>
                <span>Голоден </span>
                <button onClick={this.handleFeed}>Покормить</button>
              </>
            ) : (
              'Сыт'
            )}
          </div>
          <div>
            {!this.props.cat.isTamed && !this.props.cat.hasCollar && (
              <button onClick={this.handleTeme}>Приручить</button>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default CatListItem
