import { ICat } from './ICat'

const catNames = ['Billy', 'Denny', 'Van', 'Ricardo', 'Mark']
const catColors = ['Black', 'White', 'Red', 'Green', 'Blue']
const catMaxAge = 15

interface IIdSequence {
  currentId: number
  randomNumber: number
}

function generateCatWithId(id: number): ICat {
  let randomInt = Math.floor(Math.random() * (catNames.length - 1))
  const name = catNames[randomInt]

  randomInt = Math.floor(Math.random() * (catColors.length - 1))
  const color = catColors[randomInt]

  const age = Math.floor(Math.random() * catMaxAge)
  const collar = !!Math.floor(Math.random() * 2)

  return {
    id,
    name,
    color,
    age,
    hasCollar: collar,
    isHungry: false,
    isTamed: false,
  }
}

function generateCat(this: IIdSequence): ICat {
  const id = this.currentId
  this.currentId += 1
  console.log('create cat', id, this)
  return generateCatWithId(id)
}

function getCatGenerator(outparam: any): () => ICat {
  const rnd = Math.random()
  outparam.out = rnd
  console.log('get generator, bind with random number: ', rnd)
  const generateCatFunc = generateCat.bind({
    currentId: 1,
    randomNumber: rnd,
  })

  return generateCatFunc
}

export { getCatGenerator, generateCatWithId }
