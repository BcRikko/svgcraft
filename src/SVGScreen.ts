import { NodeBase } from './NodeBase'
import { Draggable } from './Draggable'

type ViewBox = {
  x: number
  y: number
  width: number
  height: number
}

export class SVGScreen extends Draggable {
  private readonly svg: SVGElement
  private viewBox: ViewBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  private nodes: NodeBase[] = []

  constructor(el: HTMLElement) {
    super()
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.viewBox.width = window.screen.availWidth
    this.viewBox.height = window.screen.availHeight
    this.svg.setAttribute('width', this.viewBox.width.toString())
    this.svg.setAttribute('height', this.viewBox.height.toString())
    el.appendChild(this.svg)

    document.addEventListener('mousedown', this.dragStart.bind(this))
    document.addEventListener('mousemove', this.dragging.bind(this))
    document.addEventListener('mouseup', this.dragFinish.bind(this))
  }

  add(node: NodeBase): void {
    this.nodes.push(node)
  }

  render(): void {
    this.nodes.forEach(a => {
      this.svg.appendChild(a.node)
    })
  }

  moveTo(x: number, y: number): void {
    this.viewBox.x = x
    this.viewBox.y = y
    this.svg.setAttribute('viewBox', `${-x} ${-y} ${this.viewBox.width} ${this.viewBox.height}`)
  }
}
