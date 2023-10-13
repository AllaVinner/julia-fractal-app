import { useEffect, useState } from 'react'
import * as wasm from "../wasm-src/pkg/wasm_src.js";



function JuliaFractal({            
    seedReal, 
    seedImag,
    imageHeight,
    imageWidth, 
    maxIteration,
    minReal,
    minImag,
    maxReal,
    maxImag
}) {
  
  const [imageObj, setImageObj] = useState(null)
  useEffect(() => {
    createImage(
        seedReal,
        seedImag,
        imageWidth,
        imageHeight,
        maxIteration,
        minReal,
        minImag,
        maxReal,
        maxImag
    )
  }, [
    seedReal,
    seedImag,
    imageWidth,
    imageHeight,
    maxIteration,
    minReal,
    minImag,
    maxReal,
    maxImag
  ])

  function createImage(
    seedReal,
    seedImag,
    imageWidth,
    imageHeight,
    maxIteration,
    minReal,
    minImag,
    maxReal,
    maxImag
  ) {
    let ret = wasm.generate_julia_fractal(
        seedReal,
        seedImag,
        minReal,
        maxReal,
        minImag,
        maxImag,
        imageWidth,
        imageHeight,
        maxIteration
    )
    // create an offscreen canvas
    var canvas=document.createElement("canvas");
    var ctx=canvas.getContext("2d");

    // size the canvas to your desired image
    canvas.width=imageWidth;
    canvas.height=imageHeight;

    // get the imageData and pixel array from the canvas
    var imgData=ctx.getImageData(0,0,imageWidth,imageHeight);
    
    var data=imgData.data;
    let numPixels = imageWidth*imageHeight
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


  return (
    <>
        <img src={imageObj} />
    </>
  )
}

export default JuliaFractal
