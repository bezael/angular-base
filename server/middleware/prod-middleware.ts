
import { RequestHandler } from 'express';
const base  = require ('../../.base');
const webpack = require('webpack');

export default function():RequestHandler[] {
   
    const config = require('../../webpack');

    const bundleTimer = base.timer('bundleStart');
    const compiler = webpack(config);

    compiler.plugin('done', function() {
      base.console.success(`Bundled project in ${bundleTimer()} ms!`);
    });

    const middlewares:RequestHandler[] = [];

    return middlewares;
}
