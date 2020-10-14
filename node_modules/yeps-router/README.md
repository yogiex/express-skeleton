# YEPS Router


YEPS promise based router

[![NPM](https://nodei.co/npm/yeps-router.png)](https://npmjs.org/package/yeps-router)

[![npm version](https://badge.fury.io/js/yeps-router.svg)](https://badge.fury.io/js/yeps-router)
[![Build Status](https://travis-ci.org/evheniy/yeps-router.svg?branch=master)](https://travis-ci.org/evheniy/yeps-router)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-router/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-router?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-router/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-router/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-router)

[![Dependency Status](https://david-dm.org/evheniy/yeps-router.svg)](https://david-dm.org/evheniy/yeps-router)
[![devDependency Status](https://david-dm.org/evheniy/yeps-router/dev-status.svg)](https://david-dm.org/evheniy/yeps-router#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-router)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-router/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-router.svg)](https://github.com/evheniy/yeps-router/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-router.svg)](https://github.com/evheniy/yeps-router/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-router.svg)](https://github.com/evheniy/yeps-router/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-router.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


## How to install

    npm i -S yeps-router
  
## How to use

    const App = require('yeps');    
    const Router = require('yeps-router');
    
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    const server = require('yeps-server');
    
    const bodyParser = require('yeps-bodyparser');
    const methodOverride = require('yeps-method-override');
    
    const app = new App();
    
    app.all([
        error(),
        logger(),
        bodyParser(),
        methodOverride()
    ]);
    
    const router = new Router();
    
    router.get('/').then(async (ctx) => {
       ctx.res.statusCode = 200;
       ctx.res.end('homepage');     
    });
    
    app.then(router.resolve());
    
    server.createHttpServer(app);
    
## Methods

* all(url)
* head(url)
* options(url)
* get(url)
* post(url)
* patch(url)
* post(url)
* delete(url) or del(url)

All methods are wrappers for catch() method:

**catch({ method: 'GET', url: '/' })**

    router.catch().then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end('homepage');     
    });
    
    router.catch({ method: 'POST' }).then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end('homepage');     
    });
    
    router.catch({ url: '/data' }).then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end('homepage');     
    });
    
    router.catch({ method: 'POST', url: '/data' }).then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end('homepage');     
    });

## Chain

You can use chain of methods:

    router.get('/').then(async (ctx) => {
       ctx.res.statusCode = 200;
       ctx.res.end('homepage');     
    }).post('/data').then(async (ctx) => {
        ctx.res.statusCode = 200;
        ctx.res.end('homepage');
    });
    
## Request parameters

### Query

**url**: */?data=test*

    router.get('/').then(async (ctx) => {
        ctx.request.query.data === 'test'
    });
    
### Parameters

**url**: */test/125*
    
    router.get('/test/:id').then(async (ctx) => {
        ctx.request.params.id === '125'
    });


#### [YEPS documentation](http://yeps.info/)
