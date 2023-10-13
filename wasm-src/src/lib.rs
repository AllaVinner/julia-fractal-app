mod utils;

use wasm_bindgen::prelude::*;

mod julia_fractal;
type Real = julia_fractal::Real;
type Coordinate = julia_fractal::Coordinate;


#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-src!");
}


#[wasm_bindgen]
pub fn generate_julia_fractal(
    real_seed: Real,
    imag_seed: Real,
    minReal: Real,
    minImag: Real,
    maxReal: Real,
    maxImag: Real, 
    imWidth: u32, 
    imHeight: u32,
    max_iteration: usize
) -> Vec<u8>  {
    julia_fractal::calculate_new_julia(
        real_seed,
        imag_seed,
        minReal,
        minImag,
        maxReal,
        maxImag,
        imWidth,
        imHeight,
        max_iteration
    ) 
}

/*
#[wasm_bindgen]
pub fn generate_julia_fractal(
    real_seed: Real,
    imag_seed: Real,
    real_min: Real,
    real_max: Real,
    imag_min: Real,
    imag_max: Real,
    image_width: Coordinate,
    image_height: Coordinate,
    max_iterations: usize
) -> Vec<u8>  {
    julia_fractal::calculate_new_julia(
        real_seed,
        imag_seed,
        real_min,
        real_max,
        imag_min,
        imag_max,
        image_width,
        image_height,
        max_iterations   
    ) 
}
*/

