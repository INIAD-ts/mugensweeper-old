/* eslint-disable max-depth */
import { useState } from 'react'
import { Layer, Rect, Stage } from 'react-konva'

const GenericCanvas = () => {
  interface coordinates {
    x: number
    y: number
  }
  const [stageScale, setStageScale] = useState(1)
  const [stageX, setStageX] = useState(0)
  const [stageY, setStageY] = useState(0)
  const [isZooming, setIsZooming] = useState(false)

  function getDistance(p1: coordinates, p2: coordinates) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  function getCenter(p1: coordinates, p2: coordinates) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    }
  }

  let lastCenter: { x: number; y: number } | null = null
  let lastDist = 0

  const handleMultiTouch = (e: any) => {
    e.evt.preventDefault()

    const touch1 = e.evt.touches[0]
    const touch2 = e.evt.touches[1]
    const stage = e.target.getStage()

    if (touch1 && touch2) {
      setIsZooming(true)

      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      }
      const p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      }

      if (!lastCenter) {
        lastCenter = getCenter(p1, p2)
        return
      }
      const newCenter = getCenter(p1, p2)

      const dist = getDistance(p1, p2)

      if (!lastDist) {
        lastDist = dist
      }

      const pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      }

      const scale = stage.scaleX() * (dist / lastDist)

      stage.scaleX(scale)
      stage.scaleY(scale)

      const dx = newCenter.x - lastCenter.x
      const dy = newCenter.y - lastCenter.y

      const newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      }

      stage.position(newPos)
      stage.batchDraw()

      lastDist = dist
      lastCenter = newCenter
    }
  }

  const multiTouchEnd = () => {
    lastCenter = null
    lastDist = 0
    setIsZooming(false)
  }

  const handleDragStart = (e: any) => {
    const stage = e.target.getStage()

    if (isZooming) {
      stage.stopDrag()
    }

    console.log(stage.isDragging())
  }
  return (
    <Stage
      scaleX={stageScale}
      scaleY={stageScale}
      x={stageX}
      y={stageY}
      onTouchMove={handleMultiTouch}
      onTouchEnd={multiTouchEnd}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        <Rect fill="red" width={120} height={120} draggable={true} onDragStart={handleDragStart} />
      </Layer>
    </Stage>
  )
}

export default GenericCanvas
