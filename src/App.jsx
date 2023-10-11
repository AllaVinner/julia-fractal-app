import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as wasm from "../wasm-src/pkg/wasm_src.js";



function App() {
  const [imageObj, setImageObj] = useState(null)
  const [imageWidth, setImageWidth] = useState(300)
  const [imageHeight, setImageHeight] = useState(300)
  const [imagConst, setImagConst] = useState(0.1)
  
  function generate() {
    let ret = wasm.generate_julia_fractal()
    console.log(ret)
  }

  function greet() {
    let ret = wasm.generate_julia_fractal()
    // create an offscreen canvas
    var canvas=document.createElement("canvas");
    var ctx=canvas.getContext("2d");

    // size the canvas to your desired image
    canvas.width=1000;
    canvas.height=1000;

    // get the imageData and pixel array from the canvas
    var imgData=ctx.getImageData(0,0,1000,1000);
    
    var data=imgData.data;
    console.log('len ret')
    console.log(ret.length)
    console.log(data.length)
    let numPixels = 1000*1000
    // manipulate some pixel elements
    for(var i=0;i<numPixels;i+=1){
        data[4*i]=ret[3*i];
    }
    for(var i=0;i<numPixels;i+=1){
      data[4*i+1]=ret[3*i+1];
  }
  for(var i=0;i<numPixels;i+=1){
    data[4*i+2]=ret[3*i+2];
  }
    /*
    for(var i=0;i<numPixels;i+=1){
      data[1*numPixels+i]=ret[3*i+1];
    }
    for(var i=0;i<numPixels;i+=1){
      data[2*numPixels+i]=ret[3*i+2];
    }
    
    */
    for(var i=0;i<numPixels;i+=1){
      data[4*i+3]=255;
    }

    // put the modified pixels back on the canvas
    ctx.putImageData(imgData,0,0);

    // create a new img object
    var image=new Image();

    // set the img.src to the canvas data url
    image.src=canvas.toDataURL();

    // append the new img object to the page
    //document.body.appendChild(image);  
    console.log(image)
    setImageObj(image.src)
  }

  function createImage(imagConst, imWidth, imHeight) {
    let ret = wasm.generate_julia_fractal2(imagConst, imWidth, imHeight)
    // create an offscreen canvas
    var canvas=document.createElement("canvas");
    var ctx=canvas.getContext("2d");

    // size the canvas to your desired image
    canvas.width=imWidth;
    canvas.height=imHeight;

    // get the imageData and pixel array from the canvas
    var imgData=ctx.getImageData(0,0,imWidth,imHeight);
    
    var data=imgData.data;
    console.log('len ret')
    console.log(ret.length)
    console.log(data.length)
    let numPixels = imWidth*imHeight
    // manipulate some pixel elements
    for(var i=0;i<numPixels;i+=1){
        data[4*i]=ret[3*i];
    }
    for(var i=0;i<numPixels;i+=1){
      data[4*i+1]=ret[3*i+1];
  }
  for(var i=0;i<numPixels;i+=1){
    data[4*i+2]=ret[3*i+2];
  }
    /*
    for(var i=0;i<numPixels;i+=1){
      data[1*numPixels+i]=ret[3*i+1];
    }
    for(var i=0;i<numPixels;i+=1){
      data[2*numPixels+i]=ret[3*i+2];
    }
    
    */
    for(var i=0;i<numPixels;i+=1){
      data[4*i+3]=255;
    }

    // put the modified pixels back on the canvas
    ctx.putImageData(imgData,0,0);

    // create a new img object
    var image=new Image();

    // set the img.src to the canvas data url
    image.src=canvas.toDataURL();

    // append the new img object to the page
    //document.body.appendChild(image);  
    setImageObj(image.src)
  }

  function handleImageWidthChange(e) {
    let nextImageWidth = parseInt(e.target.value)
    setImageWidth(nextImageWidth)
    createImage(imagConst, nextImageWidth, imageHeight)
  }
  
  function handleImageHeightChange(e) {
    let nextImageHeight = parseInt(e.target.value)
    setImageWidth(nextImageHeight)
    createImage(imagConst, imageWidth, nextImageHeight)
  }
  
  function handleImagConstChange(e) {
    let nextImagConst = parseFloat(e.target.value)
    setImagConst(nextImagConst)
    createImage(nextImagConst, imageWidth, imageHeight)
  }

  return (
    <>
      <div>
        Hello
        <div className="slidecontainer">
            <input type="range" min="100" max="2000" className="slider" id="myRange" step="50" defaultValue="300" onChange={(e) => handleImageWidthChange(e)}/>
            <label>{imageWidth}</label>
        </div>
        <div className="slidecontainer">
            <input type="range" min="100" max="2000" className="slider" id="myRange" step="50" defaultValue="300" onChange={(e) => handleImageHeightChange(e)}/>
            <label>{imageHeight}</label>
        </div>
        
        <div className="slidecontainer">
            <input type="range" min="-1.0" max="1.0" className="slider" id="myRange" step="0.02" defaultValue="0.2" onChange={(e) => handleImagConstChange(e)}/>
            <label>{imagConst}</label>
        </div>
        <button onClick={generate} style={{width: "50%"}}/>
        <button onClick={greet} />
        <img src={imageObj} />
      </div>
      <div>
      </div>
    </>
  )
}

export default App
