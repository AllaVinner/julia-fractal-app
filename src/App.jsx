import './App.css'
import React, { useEffect, useState } from "react";
import Slider2d from './Slider2D'
import RangeSlider2d from './RangeSlider2D'
import JuliaFractal from './JuliaFractal';

function App() {
  let [seedReal, setSeedReal] = useState(0)
  let [seedImag, setSeedImag] = useState(0)

  let [minReal, setMinReal] = useState(-1.5)
  let [minImag, setMinImag] = useState(-1.5)

  let [maxReal, setMaxReal] = useState(0.5)
  let [maxImag, setMaxImag] = useState(1.5)
  
  let [imageHeight, setImageHeight] = useState(300)
  let [imageWidth, setImageWidth] = useState(600)

  let [maxIteration, setMaxIteration] = useState(15)

  useEffect(() => {
    let nextImageHeight = imageWidth*(maxImag-minImag)/(maxReal-minReal)
    setImageHeight(nextImageHeight)
  }, [imageWidth, maxImag, minImag, maxReal, minReal])

  function handleImageWidthChange(e) {
    if (parseInt(e.target.value)) {
      let nextImageWidth = parseInt(e.target.value)
      setImageWidth(nextImageWidth)
    }
  }
  
  function handleMaxIterationChange(e) {
    if (parseInt(e.target.value)) {
      let nextMaxIteration = parseInt(e.target.value)
      setMaxIteration(nextMaxIteration)
      console.log("Updated max iter", nextMaxIteration)
    }
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Julia Fractals With WASM</h1>
      </div>
      <nav className='config'>
        <h2> Configuration </h2>
        <hr />
        <div className='num-display'>
          <label>
            Seed:
          </label>
          <div>
            {seedReal.toFixed(2)} + {seedImag.toFixed(2)}i
          </div>
        </div>
        <Slider2d setPointX={setSeedReal} setPointY={setSeedImag} gridWidth={200} gridHeight={200} />
        <div className='num-display'>
          <label>
            Min Box Value:
          </label>
          <div>
            {minReal.toFixed(2)} + {minImag.toFixed(2)}i
          </div>
        </div>
        <div className='num-display'>
          <label>
            Max box Value:
          </label>
          <div>
            {maxReal.toFixed(2)} + {maxImag.toFixed(2)}i
          </div>
        </div>
        <RangeSlider2d setPoint1X={setMinReal} setPoint1Y={setMinImag} setPoint2X={setMaxReal} setPoint2Y={setMaxImag} gridWidth={200} gridHeight={200} />
        <div className='numeric-input'>
          <label>Image Width: </label>
          <input type='numeric' defaultValue={600} onChange={handleImageWidthChange}></input>
        </div>
        <div className='numeric-input'>
          <label>Max Iterations: </label>
          <input type='numeric' defaultValue={15} onChange={handleMaxIterationChange}></input>
        </div>
      </nav>
      <main className='main'>
        <JuliaFractal 
            seedReal={seedReal} 
            seedImag={seedImag}
            imageHeight={imageHeight} 
            imageWidth={imageWidth} 
            maxIteration={maxIteration}
            minReal={minReal}
            minImag={minImag}
            maxReal={maxReal}
            maxImag={maxReal}
          />
      </main>
      </div>
  )
}

export default App
