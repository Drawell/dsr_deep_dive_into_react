import React, { useCallback, useEffect, useState } from 'react'
import { getHungryTimout, leaveTimout } from './Constants'
import { ICat } from './ICat'
import { ICatsViewCallbacks } from './ICatsView'

interface ICatListItemProps extends ICatsViewCallbacks {
  cat: ICat
}

const CatListItem: React.FC<ICatListItemProps> = ({ cat, onTame, onLeave }) => {
  const [actualCat, setActualCat] = useState(cat)
  const [leaveTimerId, setLeaveTimerId] = useState<NodeJS.Timeout | null>(null)

  const handleTeme = useCallback(() => {
    cat.isHungry = false
    if (leaveTimerId) clearTimeout(leaveTimerId)
    if (onTame) onTame(cat)
  }, [cat, leaveTimerId, onTame])

  const handleFeed = () => {
    if (leaveTimerId) {
      cat.isHungry = false
      setActualCat({ ...cat })
      clearTimeout(leaveTimerId)
    }
  }

  const handleCatGetHungry = useCallback(() => {
    cat.isHungry = true
    setActualCat({ ...cat })
    const timerId_ = setTimeout(() => onLeave(cat), leaveTimout)
    setLeaveTimerId(timerId_)
  }, [cat, onLeave])

  useEffect(() => {
    const timerId_ = setTimeout(handleCatGetHungry, getHungryTimout)
    return () => {
      clearTimeout(timerId_)
    }
  }, [cat, handleCatGetHungry])

  return (
    <li className="cat-li">
      <div className="cat-view-container">
        <div>
          <span className="attribute-name">Кличка: </span>
          <span>{cat.name}</span>
        </div>
        <div>
          <span className="attribute-name">Годиков: </span>
          <span>{cat.age}</span>
        </div>
        <div>
          <span className="attribute-name">Ошейник: </span>
          {cat.hasCollar ? 'на месте' : 'отсутствует'}
        </div>
        <div>
          <span className="attribute-name">Cтатус: </span>
          {actualCat.isHungry ? (
            <>
              <span>Голоден </span>
              <button onClick={handleFeed}>Покормить</button>
            </>
          ) : (
            'Сыт'
          )}
        </div>
        <div>
          {!cat.isTamed && !cat.hasCollar && (
            <button onClick={handleTeme}>Приручить</button>
          )}
        </div>
      </div>
    </li>
  )
}

export default CatListItem
