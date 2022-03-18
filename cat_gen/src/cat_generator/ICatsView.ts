import { ICat } from './ICat'

interface ICatsViewCallbacks {
  onFeed: (catId: number) => void
  onTame?: (catId: number) => void
}

interface ICatsView extends ICatsViewCallbacks {
  cats: Array<ICat>
}

export type { ICatsViewCallbacks, ICatsView }
