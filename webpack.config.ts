import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader', 
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'], 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'app2', 
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteComponent': './src/RemoteComponent.tsx',
      },
      shared: {
        'react': { singleton: true, eager: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};

const devServerConfig = {
  static: {
    directory: path.resolve(__dirname, 'public'),
  },
  port: 3001,
  hot: true,
  historyApiFallback: true,
  watchFiles: ['../app2/dist/**/*'],
  liveReload: true,
  client: {
    overlay: true,
  },

};

export default { ...config, devServer: devServerConfig };
