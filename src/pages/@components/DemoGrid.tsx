/* eslint-disable max-depth */
import React, { useEffect } from 'react'
import { Layer, Rect, Stage } from 'react-konva'

const WIDTH = 50
const HEIGHT = 50

const grid = [
  ['gray', 'white'],
  ['green', 'blue'],
]

export const DemoGrid = () => {
  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 })
  const [scale, setScale] = React.useState(1.2)
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const startX = Math.floor((-stagePos.x - windowSize.width / scale) / WIDTH) * WIDTH
  const endX = Math.floor((-stagePos.x + (windowSize.width / scale) * 2) / WIDTH) * WIDTH
  const startY = Math.floor((-stagePos.y - windowSize.height / scale) / HEIGHT) * HEIGHT
  const endY = Math.floor((-stagePos.y + (windowSize.height / scale) * 2) / HEIGHT) * HEIGHT

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
  const gridComponents = grid.flatMap((row, rowIndex) =>
    row.map((cell, columnIndex) => (
      <Rect
        key={`${rowIndex}-${columnIndex}`}
        x={startX + columnIndex * WIDTH}
        y={startY + rowIndex * HEIGHT}
        width={WIDTH}
        height={HEIGHT}
        fill={cell}
        stroke="black"
        onClick={() => {
          console.log(rowIndex, columnIndex)
        }}
      />
    ))
  )
  return (
    <>
      <p>{scale}</p>
      <button
        onClick={() => {
          if (scale < 1.0) {
            setScale(scale + 0.1)
          }
        }}
      >
        拡大する
      </button>

      <button
        onClick={() => {
          if (scale > 0.1) {
            setScale(scale - 0.1)
          }
        }}
      >
        縮小する
      </button>

      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={windowSize.width}
        height={windowSize.height}
        scale={{ x: scale, y: scale }}
        draggable
        onDragEnd={(e) => {
          const { x, y } = e.currentTarget.position()
          setStagePos({ x: x * scale, y: y * scale })
        }}
      >
        <Layer>{gridComponents}</Layer>
      </Stage>
    </>
  )
}
