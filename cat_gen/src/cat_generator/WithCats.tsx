import React, { useCallback, useEffect, useState } from 'react'
import { getCatGenerator } from './GenerationUtil'
import { generationTimeout } from './Constants'
import { ICat } from './ICat'
import { ICatsViewProps } from './ICatsView'

interface IAllCats {
  wild: Array<ICat>
  tamed: Array<ICat>
}

interface IWithCatsProps {}

const withCats =
  <P extends object>(
    CatViewComponent: React.ComponentType<P & ICatsViewProps>
  ): React.FC<P & IWithCatsProps> =>
  ({ ...props }: IWithCatsProps) => {
    const [generateCatFunc, setGenerateCatFunc] = useState(getCatGenerator)
    const [cats, setCats] = useState<IAllCats>({ wild: [], tamed: [] })
    const [wildCats, setWildCats] = useState<Array<ICat>>([])
    const [tamedCats, setTamedCats] = useState<Array<ICat>>([])

    const handleGenerateCat = useCallback(() => {
      const newCat = generateCatFunc()
      if (newCat.hasCollar) {
        cats.tamed.push(newCat)
        setTamedCats([...cats.tamed])
      } else {
        cats.wild.push(newCat)
        setWildCats([...cats.wild])
      }
    }, [generateCatFunc, cats])

    useEffect(() => {
      setInterval(handleGenerateCat, generationTimeout)
    }, [handleGenerateCat])

    const handleTameCat = useCallback(
      (cat: ICat) => {
        cat.isTamed = true
        cats.wild = cats.wild.filter((cat_) => cat_.id !== cat.id)
        cats.tamed.push(cat)

        setWildCats([...cats.wild])
        setTamedCats([...cats.tamed])
      },
      [cats]
    )

    const handleCatLeave = useCallback(
      (cat: ICat) => {
        if (cat.hasCollar || cat.isTamed) {
          cats.tamed = cats.tamed.filter((cat_) => cat_.id !== cat.id)
          setTamedCats(cats.tamed)
        } else {
          cats.wild = cats.wild.filter((cat_) => cat_.id !== cat.id)
          setWildCats(cats.wild)
        }
      },
      [cats]
    )

    return (
      <CatViewComponent
        wildCats={wildCats}
        tamedCats={tamedCats}
        onTame={handleTameCat}
        onLeave={handleCatLeave}
        {...(props as P)}
      />
    )
  }

export default withCats
