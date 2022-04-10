import { ICat } from './ICat'

interface ICatsViewCallbacks {
  onTame: (cat: ICat) => void
  onLeave: (cat: ICat) => void
}

interface ICatsViewProps extends ICatsViewCallbacks {
  wildCats: Array<ICat>
  tamedCats: Array<ICat>
}

export type { ICatsViewCallbacks, ICatsViewProps }
