import React from 'react'
import CatList from './CatList'
import './CatPanel.css'
import { ICatsViewProps } from './ICatsView'
import withCats from './WithCats'

const CatsPanel: React.FC<ICatsViewProps> = ({
  wildCats,
  tamedCats,
  ...others
}) => {
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
            <CatList cats={tamedCats} {...others} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default withCats(CatsPanel)
