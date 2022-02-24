import React from 'react'
import { TCellState } from '../IGameField'
import FieldCell, { IFieldCellProps } from './FieldCell'
import './GameField.css'

class SelectedFieldCell extends React.Component<IFieldCellProps, any> {
  constructor(props: IFieldCellProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <FieldCell {...this.props} />
      </div>
    )
  }
}

export default SelectedFieldCell
