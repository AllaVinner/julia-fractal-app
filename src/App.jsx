import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as wasm from "../wasm-src/pkg/wasm_src.js";

function App() {
  const [count, setCount] = useState(0)

  function generate() {
    let ret = wasm.generate_julia_fractal()
    console.log(ret)
  }

  function greet() {
    let ret = wasm.greet()
    console.log(ret)
  }

  return (
    <>
      <div>
        Hello
        <button onClick={generate} />
        <button onClick={greet} />
      </div>
    </>
  )
}

export default App
