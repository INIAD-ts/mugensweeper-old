/* eslint-disable max-lines */
/* eslint-disable max-depth */
import type Konva from 'konva'
import React, { useEffect } from 'react'
import { Layer, Rect, Stage } from 'react-konva'
const WIDTH = 50
const HEIGHT = 50

const grid = [
  ['gray', 'white'],
  ['green', 'blue'],
]
interface coordinates {
  x: number
  y: number
}

const DemoGrid = () => {
  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 })
  const [stageScale, setStageScale] = React.useState(1.0)

  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isZooming, setIsZooming] = React.useState(false)
  const [gridComponents, setGridComponents] = React.useState<Array<React.ReactNode>>([])

  const startX = Math.floor((-stagePos.x - windowSize.width / stageScale) / WIDTH) * WIDTH
  const endX = Math.floor((-stagePos.x + (windowSize.width / stageScale) * 2) / WIDTH) * WIDTH
  const startY = Math.floor((-stagePos.y - windowSize.height / stageScale) / HEIGHT) * HEIGHT
  const endY = Math.floor((-stagePos.y + (windowSize.height / stageScale) * 2) / HEIGHT) * HEIGHT

  //座標間の距離を求める
  function getDistance(p1: coordinates, p2: coordinates) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  //2点間の中点を求める
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
      setStageScale(scale)
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
  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage()

    if (isZooming) {
      stage?.stopDrag()
    }

    console.log(stage?.isDragging())
  }
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    console.log(stagePos)
  })
  useEffect(() => {
    const newGridComponents: Array<React.ReactNode> = []

    let i = 0
    for (let x = startX; x < endX; x += WIDTH) {
      for (let y = startY; y < endY; y += HEIGHT) {
        if (i === 4) {
          i = 0
        }

        const indexX = Math.abs(x / WIDTH) % grid.length
        const indexY = Math.abs(y / HEIGHT) % grid[0].length
        console.log(indexX, indexY)

        newGridComponents.push(
          <Rect
            key={`${x / WIDTH}-${y / HEIGHT}`}
            x={x}
            y={y}
            width={WIDTH}
            height={HEIGHT}
            fill={grid[indexX][indexY]}
            stroke="black"
            onClick={() => {
              console.log(x / WIDTH, y / HEIGHT)
            }}
          />
        )
      }
    }

    setGridComponents(newGridComponents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageScale])
  return (
    <>
      <p>{stageScale}</p>
      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={windowSize.width}
        height={windowSize.height}
        scaleX={stageScale}
        scaleY={stageScale}
        onTouchMove={handleMultiTouch}
        onTouchEnd={multiTouchEnd}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => {
          const { x, y } = e.currentTarget.position()
          setStagePos({ x: x * stageScale, y: y * stageScale })
        }}
      >
        <Layer buffered throttle={50}>
          {gridComponents}
        </Layer>
      </Stage>
    </>
  )
}

export default DemoGrid
