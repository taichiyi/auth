import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/auth.umd.js',
      format: 'umd',
      name: 'auth',
      sourcemap: true
    },
    {
      file: 'dist/auth.js',
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [
    typescript(),
  ],
};
