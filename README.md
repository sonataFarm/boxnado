# cubes_in_space
Welcome to __Cubes in Space__, an interactive digital art project which uses Three.js for in-browser 3D rendering and HTML5 Canvas for performant pixel control.

<a href="https://cubes-in-space.herokuapp.com/" target="_blank">View Live Demo</a>

## Technologies

Cubes in Space uses the <a href="https://threejs.org/" target="_blank">__Three.js__</a> library to render and animate a 3D world, along with __HTML5 Canvas__ for 2D rendering. The decision to integrate the two libraries was motivated by the desire to keep each operation as computationally simple as possible so that the app can render a large number of entities without overloading the browser's engine. 

Since the functionality of the project is quite limited, all files are served by __Rack__, an ultra-lightweight server written in Ruby.

## Highlights

### OO design
Three.js objects are extended via classes like _Box_ and _BackgroundPattern_ to keep code DRY and modular.
