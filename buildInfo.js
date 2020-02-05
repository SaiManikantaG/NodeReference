// Webpack Config
/* eslint-disable func-names */
const fs = require('fs');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = function (env) {
  // const lambdaFunctionDir = __dirname;
  // const functionsToBuild = env && env.fxn ? env.fxn.split(",") :
  // fs.readdirSync(lambdaFunctionDir).filter(item => fs.lstatSync(path.join(lambdaFunctionDir, item)).isDirectory() && !item.match(/^\./));
  // console.log(`Building ${functionsToBuild.join(", ")}`);
  return [
    {
      mode: 'production',
      context: path.resolve(__dirname),
      entry: './index.js',
      output: {
        // path: path.join(__dirname, 'dist', fxn),
        filename: 'index.js',
        libraryTarget: 'commonjs'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/env', { targets: { node: '12.14' } }]],
                  plugins: [],
                  compact: false,
                  babelrc: false
                }
              }
            ]
          },
        ]
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      optimization: {
        minimize: true,
        namedModules: true
      },
      plugins: [
        new ZipPlugin({
          path: path.join(__dirname, '../dist'),
          pathPrefix: '',
          filename: `projectRepo.zip`
        })
      ],
      target: 'node',
      node: {
        // Allow these globals.
        __filename: false,
        __dirname: false
      },
      stats: 'errors-only',
      bail: true
    }
  ]
};

// ------------------------------------------------------
// Es lint rc .json
/**
{
  "extends": "airbnb-base",
  "overrides": [
    {
      "files": [
        "*test.js",
        "*.json",
        "*.spec.js",
        "*.opts"
      ],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ],
  "rules": {
    "no-console": "off",
    "indent": "off",
    "max-len": [
      "error",
      {
        "code": 200
      }
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/newline-after-import": "off",
    "import/order": "off",
    "no-tabs": 0,
    "linebreak-style": 0,
    "no-underscore-dangle": 0
  },
  "globals": {
    "logger": true
  }
}
 **/
 
 // _-----------------------------------------------------
 // .babelrc
 
 /**
 {
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    [
      "@babel/plugin-transform-spread",
      {
        "loose": true
      }
    ]
  ],
  "env": {
    "test": {
      "plugins": [
        "istanbul"
      ],
    }
  }
}
**/
 
