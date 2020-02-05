"scripts": {
    "start": "npm-run-all run:*",
    "run:process": "nodemon --exec  babel-node testHandler.js readFile",
    "lint": "eslint src/**",
    "lintFix": "eslint src/** --fix",
    "initData": "nodemon --exec babel-node ./migrate/index",
    "test": "./node_modules/.bin/mocha --require @babel/register --watch-extensions js \"{,!(node_modules)/**/}*.test.js\" --opts ./src/test/mocha.opts",
    "test-coverage-local": "nyc mocha --require @babel/register ./src/test/**/*.test.js --print  --opts ./src/test/mocha.opts",
    "test-coverage": "nyc --reporter=html mocha --require @babel/register ./src/test/**/*.test.js --print  --opts ./src/test/mocha.opts",
    "test:common": "mocha --require @babel/register ./src/test/common/**/*.test.js --print  --opts ./src/test/mocha.opts",
    "test:apis": "mocha --require @babel/register ./src/test/apis --print  --opts ./src/test/mocha.opts",
    "test:service": "mocha --require @babel/register ./src/test/service --print  --opts ./src/test/mocha.opts",
    "build": "npm-run-all build:install build:final build:zip",
    "build:install": "npm install",
    "build:final": "webpack --config webpack.config.js",
    "build:zip": "mv ../dist/testRepo.zip ./testRepo.zip",
    "serve": "node dist/index.js"
  }
