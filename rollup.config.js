import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/auth.umd.js',
      format: 'umd',
      name: 'auth',
      sourcemap: true,
      plugins:[terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
};
