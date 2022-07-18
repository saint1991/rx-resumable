import * as webpack from 'webpack';
import * as path from 'path';

const isProduction: boolean = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/', path.resolve(__dirname, 'webpack.config.ts')],
      },
    ],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: isProduction,
  },
  mode: isProduction ? 'production' : 'development',
};

export default config;
