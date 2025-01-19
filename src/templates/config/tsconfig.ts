export const tsConfig = {
  compilerOptions: {
    target: 'es2020',
    module: 'commonjs',
    outDir: './dist',
    rootDir: './src',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    resolveJsonModule: true,
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist', 'tests'],
}
