import React from 'react'
import CatListItem from './CatListItem'
import { ICat } from './ICat'
import './CatList.css'
import { ICatsViewCallbacks } from './ICatsView'

interface ICatListProps extends ICatsViewCallbacks {
  cats: Array<ICat>
}

interface ICatListState {}

class CatList extends React.Component<ICatListProps, ICatListState> {
  constructor(props: ICatListProps) {
    super(props)
  }

  render() {
    return (
      <ul>
        {this.props.cats.map((cat) => {
          return <CatListItem key={cat.id} cat={cat} {...this.props} />
        })}
      </ul>
    )
  }
}

export default CatList
