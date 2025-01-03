import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodeExternals from 'rollup-plugin-node-externals';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    nodeExternals({
      deps: false,
      devDeps: false,
      peerDeps: false,
      optDeps: false
    }),
    nodeResolve({
      preferBuiltins: true,
      browser: false
    }),
    commonjs(),
    typescript(),
  ],
};

export default config;
