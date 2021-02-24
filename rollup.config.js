import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/taichiyi-auth.umd.js',
      format: 'umd',
      name: 'taichiyiAuth',
      sourcemap: true
    },
    {
      file: 'dist/taichiyi-auth.js',
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [
    typescript(),
  ],
};
