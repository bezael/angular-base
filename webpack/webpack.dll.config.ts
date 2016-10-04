import * as path from 'path';
import * as base from '../.base';
import env from '../src/base/shared/Env';
import * as common from './webpack.common.config';
import environment, { isTesting } from '../server/environment';

const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

export const cache = common.cache;
export const entry = common.entry;
export const module = common.module;
export const output = common.output;
export const resolve = common.resolve;
export const context = common.context;
export const devtool = 'cheap-module-source-map';

export const plugins = [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
  new webpack.DllPlugin({
    path: path.join(common.dllPath, "[name]-manifest.json"),
    name: '[name]',
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    common.mainPath
  ),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({compressor: { warnings: false }, output: {comments: false}}),
  common.compileError
]
.concat(common.plugins);