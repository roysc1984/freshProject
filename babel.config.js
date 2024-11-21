module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          actions: './src/actions',
          screens: './src/screens',
          components: './src/components',
          utils: './src/utils',
          reducers: './src/reducers',
        },
      },
    ],
  ],
};
