import { Draggable } from './Draggable'

export abstract class NodeBase extends Draggable {
  protected readonly namespace = 'http://www.w3.org/2000/svg'
  protected _node: SVGElement
  protected x: number
  protected y: number

  get node(): SVGElement {
    return this._node
  }

  protected abstract createSVGNode(): SVGElement

  abstract moveTo(x: number, y: number): void
}
