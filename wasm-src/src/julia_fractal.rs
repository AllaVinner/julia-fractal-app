use image;
use num_complex::Complex;
use std::string::String;

pub type Real = f64;
pub type Coordinate = u32;

struct GridConfig {
    x_min: Real,
    x_max: Real,
    y_min: Real,
    y_max: Real,
}

struct ImageConfig {
    width: Coordinate,
    height: Coordinate
}

struct PixelCoordinate {
    width: Coordinate,
    height: Coordinate,    
}

struct GridCoordinate {
    x: Real,
    y: Real,
}

fn pixel_to_grid_coordinate(pixel: &PixelCoordinate, image_config: &ImageConfig, grid_config: &GridConfig) -> GridCoordinate {
    GridCoordinate { 
        x: (pixel.width as Real) * (grid_config.x_max - grid_config.x_min) / (image_config.width as Real) + grid_config.x_min,
        y: (pixel.height as Real) * (grid_config.y_min - grid_config.y_max)/ (image_config.height as Real) + grid_config.y_max,
    }
}

pub fn calculate_new_julia(
    real_seed: Real,
    imag_seed: Real,
    real_min: Real,
    real_max: Real,
    imag_min: Real,
    imag_max: Real,
    image_width: Coordinate,
    image_height: Coordinate,
    max_iterations: usize

) -> Vec<u8>{
    let grid_config = GridConfig { x_min: real_min, x_max: real_max, y_min: imag_min, y_max: imag_max};
    let image_config = ImageConfig { width: image_width, height: image_height};
    let constant_z = Complex::<Real>::new(real_seed, imag_seed);
    calculate(
        constant_z,
        image_config,
        grid_config,
        max_iterations
    )
}

fn iter_to_u8(i: usize, max_iterations: usize) -> u8 {
    let p = 2.;
    ((1.0 -(1.-(i as f32 / max_iterations as f32)).powf(p)).powf(1./p)*255.5) as u8
}

fn julia_iterations(initial_z: Complex<Real>, constant_z: Complex<Real>, max_iterations: usize) -> usize {
    let mut i: usize = 0;
    let mut z = initial_z;
    let c = constant_z;

    while i < max_iterations && z.norm() <= 2.0 {
        z = z * z + c;
        i += 1;
    }
    i
}


fn calculate(
    constant_z: Complex<Real>,
    image_config: ImageConfig,
    grid_config: GridConfig,
    max_iterations: usize

) -> Vec<u8> {
    
    let img = image::ImageBuffer::from_fn(image_config.width as u32, image_config.height as u32, |w, h| {
        let grid_coordinate = pixel_to_grid_coordinate(&PixelCoordinate { width: w, height: h}, &image_config, &grid_config);
        let initial_z = Complex::<Real>::new( grid_coordinate.x, grid_coordinate.y);
        let value = julia_iterations(initial_z, constant_z, max_iterations);
        let g = iter_to_u8(value, max_iterations);
        let r = (w as f32 / image_config.width as f32 * 255.5) as u8;
        let b = (h as f32 / image_config.height as f32 * 255.5) as u8;
        image::Rgb([r, g, b])
    });
    img.into_raw()
}

