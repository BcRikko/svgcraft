import { NodeBase } from './NodeBase'

interface Parameter {
  title: string
  x: number
  y: number
}

export class ItemNode extends NodeBase {
  private readonly title: string

  constructor(param: Parameter) {
    super()
    this.title = param.title
    this.x = param.x
    this.y = param.y
    this._node = this.createSVGNode()

    this._node.addEventListener('mousedown', this.dragStart.bind(this))
    this._node.addEventListener('mousemove', this.dragging.bind(this))
    this._node.addEventListener('mouseup', this.dragFinish.bind(this))
  }

  createSVGNode(): SVGElement {
    const group = document.createElementNS(this.namespace, 'g')

    // NOTE: IEはSVGのinnerHTMLをサポートしていないため
    const rect = document.createElementNS(this.namespace, 'rect')
    rect.setAttribute('x', this.x.toString())
    rect.setAttribute('y', this.y.toString())
    rect.setAttribute('width', '80')
    rect.setAttribute('height', '80')
    rect.setAttribute('fill', '#eee')

    const forienObject = document.createElementNS(this.namespace, 'foreignObject')
    forienObject.setAttribute('x', this.x.toString())
    forienObject.setAttribute('y', this.y.toString())
    forienObject.setAttribute('width', '80')
    forienObject.setAttribute('height', '80')

    const container = document.createElement('div')
    container.classList.add('item')
    forienObject.appendChild(container)
    const title = document.createElement('h1')
    title.innerHTML = this.title
    container.appendChild(title)

    group.appendChild(rect)
    group.appendChild(forienObject)

    return group
  }

  moveTo(x: number, y: number): void {
    this.x = x
    this.y = y
    this._node.setAttribute('transform', `translate(${x} ${y})`)
  }

  dragStart(ev: MouseEvent): void {
    this._node.classList.add('is-dragging')
    super.dragStart(ev)
  }
  dragFinish(ev: MouseEvent): void {
    this._node.classList.remove('is-dragging')
    super.dragFinish(ev)
  }
}
