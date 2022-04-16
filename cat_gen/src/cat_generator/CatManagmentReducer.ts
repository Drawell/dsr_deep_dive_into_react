import { ICat } from './ICat'

type TActionType = 'ADD_WILD' | 'ADD_TAMED' | 'REMOVE_WILD' | 'REMOVE_TAMED' | 'TAME'

interface ICatManagementAction {
  type: TActionType
  cat: ICat
}

interface ICatManagementState {
  wildCats: Array<ICat>
  tamedCats: Array<ICat>
}

function catManagementReuser(state: ICatManagementState, action: ICatManagementAction) {
  let wildCats: Array<ICat>
  let tamedCats: Array<ICat>

  switch (action.type) {
    case 'ADD_WILD':
      wildCats = [...state.wildCats]
      wildCats.push(action.cat)
      return { ...state, wildCats }
    case 'ADD_TAMED':
      tamedCats = [...state.tamedCats]
      tamedCats.push(action.cat)
      return { ...state, tamedCats }
    case 'REMOVE_WILD':
      wildCats = state.wildCats.filter((cat_) => cat_.id !== action.cat.id)
      return { ...state, wildCats }
    case 'REMOVE_TAMED':
      tamedCats = state.tamedCats.filter((cat_) => cat_.id !== action.cat.id)
      return { ...state, tamedCats }
    case 'TAME':
      action.cat.isTamed = true
      wildCats = state.wildCats.filter((cat_) => cat_.id !== action.cat.id)
      tamedCats = [...state.tamedCats]
      tamedCats.push(action.cat)
      return { ...state, wildCats, tamedCats }
    default:
      throw new Error()
  }
}

export { catManagementReuser }
