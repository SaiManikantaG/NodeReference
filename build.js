const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals')

module.exports = {
          mode: 'development',
          context: path.resolve(__dirname),
          entry:  '../src/app.ts',
          output: {
              path: path.join(__dirname, '../dist'),
              filename: 'server.js',
              libraryTarget: 'commonjs'
          },
          watch: true,
          module: {
              rules: [
                  {
                      test: /\.js$/,
                      use: [
                          {
                              loader: 'babel-loader',
                              options: {
                                  presets: [['@babel/env', {targets: {node: '8.10'}}]],
                                  plugins: [],
                                  compact: false,
                                  babelrc: false
                              }
                          }
                      ]
                  },
                  {
                      test: /\.ts(x?)$/,
                      use: [
                          {
                              loader: 'babel-loader',
                              options: {
                                  presets: [['@babel/env', {targets: {node: '8.10'}}]],
                                  plugins: [],
                                  compact: false,
                                  babelrc: false
                              }
                          },
                          'ts-loader'
                      ]
                  },
                  {
                      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                      use: [
                          'file-loader'
                      ]
                  }
              ]
          },
          resolve: {
              extensions: ['.ts', '.tsx', '.js']
          },
          optimization: {
              minimize: false,
              namedModules: true
          },
          plugins: [            
              new CopyWebpackPlugin([
                  '../.env'
                ]),                        
          ],  
          externals: [nodeExternals()],              
          target: 'node',          
          node: {
              // Allow these globals.
              __filename: false,
              __dirname: false
          },
          stats: 'errors-only',
          bail: truea
};
