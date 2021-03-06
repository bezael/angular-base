import { RequestHandler } from 'express';
import * as base from '../../src/base';
const compression = require('compression');

const webpack = require('webpack');

export default function(): RequestHandler[] {

  const config = require('../../webpack').default;

  const compiler = webpack(config);

  compiler.plugin('done', function() {
    base.console.success(`Bundled project in  ms!`);
  });

  const middlewares: RequestHandler[] = [
    compression()
  ];

  return middlewares;
}