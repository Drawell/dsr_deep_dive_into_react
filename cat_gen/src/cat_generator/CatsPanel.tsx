import React from 'react'
import CatList from './CatList'
import './CatPanel.css'
import CatGenerator from './CatGenerator'
import { ICatsView, ICatsViewCallbacks } from './ICatsView'

const RenderCatsPanel = (props: ICatsView) => {
  let cats
  let others: ICatsViewCallbacks
  ;({ cats, ...others } = { ...props })

  const wildCats = props.cats.filter((cat) => !cat.hasCollar && !cat.isTamed)
  const neighborCats = props.cats.filter((cat) => cat.hasCollar || cat.isTamed)

  return (
    <table>
      <tbody>
        <tr>
          <th>Дикие коты</th>
          <th>Коты соседки</th>
        </tr>
        <tr>
          <td>
            <CatList cats={wildCats} {...others} />
          </td>
          <td>
            <CatList cats={neighborCats} {...others} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

class CatsPanel extends React.Component<any, any> {
  render() {
    return <CatGenerator renderCats={RenderCatsPanel} />
  }
}

export default CatsPanel
