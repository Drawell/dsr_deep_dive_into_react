import React from 'react'
import CatList from './CatList'
import { generateCatWithId, getCatGenerator } from './GenerationUtil'
import { ICat } from './ICat'
import './CatPanel.css'

interface ICatsPanelState {
  generationTime: number
  allCats: Array<ICat>
  neighborGirlsCats: Array<ICat>
  generateCat: () => ICat
  lastCatId: number
  out: any
}

class CatsPanel extends React.Component<any, ICatsPanelState> {
  constructor(props: any) {
    super(props)
    let out = { out: 1 }
    let generateCat = getCatGenerator(out)
    this.state = {
      generationTime: 5000,
      allCats: [],
      neighborGirlsCats: [],
      generateCat: generateCat,
      lastCatId: 1,
      out,
    }
    this.generateCatCallback = this.generateCatCallback.bind(this)
    this.handleCatLeave = this.handleCatLeave.bind(this)
  }

  componentDidMount() {
    //setInterval(this.generateCatCallback, this.state.generationTime)
    setTimeout(this.generateCatCallback, this.state.generationTime)
  }

  generateCatCallback() {
    //console.log('call', this.state)
    //const newCat = this.state.generateCat()
    //console.log('Generated', newCat)

    const newCat = generateCatWithId(this.state.lastCatId)
    this.state.allCats.push(newCat)

    if (newCat.hasCollar) {
      this.state.neighborGirlsCats.push(newCat)
    }

    this.setState({
      allCats: this.state.allCats,
      neighborGirlsCats: this.state.neighborGirlsCats,
      lastCatId: this.state.lastCatId + 1,
    })
  }

  handleCatGetHungry(catId: number) {}

  handleCatLeave(catId: number) {
    const allCatsAfterRemoving = this.state.allCats.filter(
      (cat) => cat.id !== catId
    )

    const neighborCatsAfterRemoving = this.state.allCats.filter(
      (cat) => cat.id !== catId
    )
    this.setState({
      allCats: allCatsAfterRemoving,
      neighborGirlsCats: neighborCatsAfterRemoving,
    })
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Все коты</th>
            <th>Коты соседки</th>
          </tr>
          <tr>
            <td>
              {/* <CatList
                cats={this.state.allCats}
                onLeave={this.handleCatLeave}
              /> */}
            </td>
            <td>
              {/* <CatList
                cats={this.state.neighborGirlsCats}
                onLeave={this.handleCatLeave}
              /> */}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default CatsPanel
