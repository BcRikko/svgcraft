type Position = {
  x: number
  y: number
}

export abstract class Draggable {
  protected isDragging = false
  protected startPos: Position = { x: 0, y: 0 }
  protected diffPos: Position = { x: 0, y: 0 }
  protected endPos: Position = { x: 0, y: 0 }

  protected dragStart(ev: MouseEvent): void {
    ev.stopPropagation()
    this.isDragging = true
    this.startPos = {
      x: ev.clientX,
      y: ev.clientY
    }
  }

  protected dragging(ev: MouseEvent): void {
    ev.stopPropagation()
    if (this.isDragging) {
      this.diffPos = {
        x: ev.clientX - this.startPos.x + this.endPos.x,
        y: ev.clientY - this.startPos.y + this.endPos.y
      }

      this.moveTo(this.diffPos.x, this.diffPos.y)
    }
  }

  protected dragFinish(ev: MouseEvent): void {
    ev.stopPropagation()
    this.isDragging = false
    this.endPos = {
      x: this.diffPos.x,
      y: this.diffPos.y
    }
  }

  abstract moveTo(x: number, y: number): void
}
