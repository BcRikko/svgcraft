import { SVGScreen } from './SVGScreen'
import { ItemNode } from './ItemNode'

const app = document.querySelector<HTMLElement>('#app')

const screen = new SVGScreen(app)

const limit = 50
for (let i = 0; i < limit; i++) {
  for (let j = 0; j < limit; j++) {
    const title = (i * 10 + j).toString()
    screen.add(
      new ItemNode({
        title,
        x: i * 100,
        y: j * 100
      })
    )
  }
}

screen.render()
