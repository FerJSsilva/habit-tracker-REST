# Node.js Project Using esbuild

This project demonstrates the setup of a Node.js application using `esbuild` for bundling JavaScript files that include both ES modules and CommonJS modules. It features development setup with auto-reloading using `nodemon`.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system. You can download and install them from [Node.js official website](https://nodejs.org/).

## Installation

To set up this project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FerJSsilva/node-esbuild-template
   cd your-project-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

To start developing with live reloading:

1. **Run the development server**:
   ```bash
   npm run dev
   ```

This command uses `concurrently` to run `esbuild` in watch mode and `nodemon` to restart the server when the bundle file is updated. This setup allows you to see changes in real time without manually restarting the server.

## Building for Production

To build the application for production:

1. **Build the project**:
   ```bash
   npm run build
   ```

This will bundle all JavaScript files into a single output file in the `dist` directory, optimized for production use.

## Advantages of Using esbuild

- **Speed**: `esbuild` is significantly faster than other bundlers like Webpack and Parcel. It uses Go instead of JavaScript, allowing for much faster bundling times.
- **Simplicity**: `esbuild` has fewer configurations, making it easier to set up and use, especially for smaller projects or for developers new to bundling.
- **Efficiency**: It produces smaller output files and efficiently handles dependencies, which improves load times and performance.
- **Versatility**: Supports both CommonJS and ES module syntax out of the box, allowing you to integrate a wide range of JavaScript code and libraries.
- **Built-in Minification and Tree-shaking**: `esbuild` comes with built-in minification and tree-shaking capabilities, helping reduce the size of the output bundle by removing unused code.

## Scripts Explained

- `npm run dev`: Runs the development environment with live reloading.
- `npm run build`: Bundles the code for production.
- `npm run start`: Starts the server using the production bundle.

For more detailed documentation on `esbuild`, visit the [official esbuild GitHub page](https://github.com/evanw/esbuild).
