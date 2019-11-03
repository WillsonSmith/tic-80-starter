import typescript from 'rollup-plugin-typescript2';
import banner from 'rollup-plugin-banner';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: './src/game.ts',
  output: {
    file: './build/game.js',
    format: 'esm',
  },
  treeshake: false,
  plugins: [
    typescript(),
    minify(),
    banner(`// title: Hello world
// author: Willson Smith
// desc: A hello world game
// script: js`,)
  ]
}
