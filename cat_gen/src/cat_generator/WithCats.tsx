import React, { useCallback, useEffect, useReducer } from 'react'
import { getCatGenerator } from './GenerationUtil'
import { generationTimeout } from './Constants'
import { ICat } from './ICat'
import { ICatsViewProps } from './ICatsView'
import { catManagementReuser } from './CatManagmentReducer'

interface IWithCatsProps {}

const withCats =
  <P extends object>(
    CatViewComponent: React.ComponentType<P & ICatsViewProps>
  ): React.FC<P & IWithCatsProps> =>
  ({ ...props }: IWithCatsProps) => {
    const [cats, dispatchCats] = useReducer(catManagementReuser, {
      wildCats: [],
      tamedCats: [],
    })

    const handleGenerateCat = useCallback((newCat: ICat) => {
      if (newCat.hasCollar) {
        dispatchCats({ type: 'ADD_TAMED', cat: newCat })
      } else {
        dispatchCats({ type: 'ADD_WILD', cat: newCat })
      }
    }, [])

    useEffect(() => {
      const generateCatFunc = getCatGenerator()
      setInterval(() => {
        const newCat = generateCatFunc()
        handleGenerateCat(newCat)
      }, generationTimeout)
    }, [handleGenerateCat])

    const handleTameCat = useCallback((cat: ICat) => {
      dispatchCats({ type: 'TAME', cat })
    }, [])

    const handleCatLeave = useCallback((cat: ICat) => {
      if (cat.hasCollar || cat.isTamed) {
        dispatchCats({ type: 'REMOVE_TAMED', cat })
      } else {
        dispatchCats({ type: 'REMOVE_WILD', cat })
      }
    }, [])

    return (
      <CatViewComponent
        wildCats={cats.wildCats}
        tamedCats={cats.tamedCats}
        onTame={handleTameCat}
        onLeave={handleCatLeave}
        {...(props as P)}
      />
    )
  }

export default withCats
