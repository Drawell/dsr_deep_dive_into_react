import React from 'react'
import { generateCatWithId, getCatGenerator } from './GenerationUtil'
import { ICat } from './ICat'
import { ICatsView } from './ICatsView'

interface ICatGeneratorProps {
  renderCats: (props: ICatsView) => any
}

interface ICatGeneratorState {
  generationTimeout: number
  getHungryTimout: number
  leaveTimout: number
  cats: Array<ICat>
  generateCat: () => ICat
  lastCatId: number
}

class CatGenerator extends React.Component<
  ICatGeneratorProps,
  ICatGeneratorState
> {
  constructor(props: any) {
    super(props)
    let out = { out: 1 }
    this.state = {
      generationTimeout: 5000,
      getHungryTimout: 10000,
      leaveTimout: 5000,
      cats: [],
      generateCat: getCatGenerator(out),
      lastCatId: 1,
    }
    this.handleGenerateCat = this.handleGenerateCat.bind(this)
    this.handleCatGetHungry = this.handleCatGetHungry.bind(this)
    this.handleFeedCat = this.handleFeedCat.bind(this)
    this.handleCatLeave = this.handleCatLeave.bind(this)
    this.handleTameCat = this.handleTameCat.bind(this)
  }

  componentDidMount() {
    setInterval(this.handleGenerateCat, this.state.generationTimeout)
    //setTimeout(this.handleGenerateCat, this.state.generationTimeout)
  }

  handleGenerateCat() {
    //console.log('call', this.state)
    //const newCat = this.state.generateCat()
    //console.log('Generated', newCat)

    const newCat = generateCatWithId(this.state.lastCatId)
    this.state.cats.push(newCat)

    setTimeout(() => {
      this.handleCatGetHungry(newCat.id)
    }, this.state.getHungryTimout)

    this.setState({
      cats: this.state.cats,
      lastCatId: this.state.lastCatId + 1,
    })
  }

  handleCatGetHungry(catId: number) {
    const cat = this.state.cats.find((cat) => cat.id === catId)

    if (cat) {
      cat.isHungry = true
      setTimeout(() => this.handleCatLeave(cat.id), this.state.leaveTimout)
    }

    this.setState({ cats: this.state.cats })
  }

  handleFeedCat(catId: number) {
    const cat = this.state.cats.find((cat) => cat.id === catId)

    if (cat) {
      cat.isHungry = false
      setTimeout(
        () => this.handleCatGetHungry(cat.id),
        this.state.getHungryTimout
      )
    }

    this.setState({ cats: this.state.cats })
  }

  handleCatLeave(catId: number) {
    const cats = this.state.cats.filter(
      (cat) => !(cat.id === catId && cat.isHungry)
    )
    this.setState({ cats })
  }

  handleTameCat(catId: number) {
    console.log('tame')

    const cat = this.state.cats.find((cat) => cat.id === catId)

    if (cat) {
      cat.isTamed = true
    }

    this.setState({ cats: this.state.cats })
  }

  render() {
    return (
      <>
        {this.props.renderCats({
          cats: this.state.cats,
          onFeed: this.handleFeedCat,
          onTame: this.handleTameCat,
        })}
      </>
    )
  }
}

export default CatGenerator
