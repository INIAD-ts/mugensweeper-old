/* eslint-disable max-depth */
import React, { useEffect } from 'react'
import { Layer, Rect, Stage } from 'react-konva'
const WIDTH = 30
const HEIGHT = 30

const grid = [
  ['gray', 'white'],
  ['green', 'blue'],
]

export const DemoGrid = () => {
  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 })
  const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH
  const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH

  const startY = Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT
  const endY = Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT
  const [scale, setScale] = React.useState(1.0)
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

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

  const gridComponents = []
  let i = 0
  for (let x = startX; x < endX; x += WIDTH) {
    for (let y = startY; y < endY; y += HEIGHT) {
      if (i === 4) {
        i = 0
      }

      const indexX = Math.abs(x / WIDTH) % grid.length
      const indexY = Math.abs(y / HEIGHT) % grid[0].length

      gridComponents.push(
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
  return (
    <>
      <button onClick={() => setScale(scale * 1.2)}>拡大する</button>
      <button onClick={() => setScale(scale / 1.2)}>縮小する</button>
      <p>{scale}</p>
      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={windowSize.width}
        height={windowSize.height}
        scale={{ x: scale, y: scale }}
        draggable
        onDragEnd={(e) => {
          setStagePos(e.currentTarget.position())
        }}
      >
        <Layer>{gridComponents}</Layer>
      </Stage>
    </>
  )
}
