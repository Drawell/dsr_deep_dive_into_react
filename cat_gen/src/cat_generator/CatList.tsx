import React from 'react'
import CatListItem from './CatListItem'
import { ICat } from './ICat'
import './CatList.css'
import { ICatsViewCallbacks } from './ICatsView'

interface ICatListProps extends ICatsViewCallbacks {
  cats: Array<ICat>
}

const CatList: React.FC<ICatListProps> = ({ cats, ...others }) => {
  return (
    <ul className="cat-list">
      {cats.map((cat) => {
        return <CatListItem key={cat.id} cat={cat} {...others} />
      })}
    </ul>
  )
}

export default CatList
