module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@helpers': './src/helpers',
          '@testUtils': './src/testUtils',
          '@middleware': './src/middleware/',
          '@models': './src/database/models',
          '@controllers': './src/controllers',
          '@routes': './src/routes',
          '@dbConfig': './src/database/dbConfig',
          '@constants': './src/constants',
          '@database': './src/database',
        },
      },
    ],
  ],
};
