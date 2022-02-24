import React from 'react'
import { TCellState } from '../IGameField'
import './GameField.css'

interface IFieldCellProps {
  cellType: TCellState
  hidden: boolean
  x: number
  y: number
  onClick: (x: number, y: number, prevState: TCellState) => void
}

interface IFieldCellState {}

class FieldCell extends React.Component<IFieldCellProps, IFieldCellState> {
  constructor(props: IFieldCellProps) {
    super(props)
    this.renderSymbol = this.renderSymbol.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.x, this.props.y, this.props.cellType)
  }

  renderSymbol(cellType: TCellState) {
    switch (cellType) {
      case 'empty':
        return '~'
      case 'ship':
        if (this.props.hidden) {
          return '~'
        } else {
          return 'O'
        }
      case 'damaged_ship':
        return 'Ø'
      case 'missing_shot':
        return '•'
      default:
        return '~'
    }
  }

  swithcSymbolColor(cellType: TCellState) {
    switch (cellType) {
      case 'ship':
        if (this.props.hidden) {
          return ''
        } else {
          return 'ship'
        }
      case 'damaged_ship':
        return 'damaged_ship'
      case 'missing_shot':
        return 'missing_shot'
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="cell">
        <input
          value={this.renderSymbol(this.props.cellType)}
          type="button"
          onClick={this.handleClick}
          className={this.swithcSymbolColor(this.props.cellType)}
        />
      </div>
    )
  }
}

export default FieldCell
