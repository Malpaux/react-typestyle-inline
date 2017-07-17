/**
 * @file The main entry point
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import { dynamicExtend, shallowCompare } from 'react-typestyle/internal/utils';
export { dynamicExtend, shallowCompare };

import * as types from 'react-typestyle/types';
export { types };

import Cache from './internal/cache';
export { Cache };

import hoc, { ComponentOptions, InjectedProps, InputSheet, Options } from './internal/hoc';
export { ComponentOptions, InjectedProps, InputSheet, Options };

/** Higher-order component */
const withStyles = ({
  plugins,
  shouldStylesUpdate = shallowCompare,
}: Partial<Options> = {
  shouldStylesUpdate: shallowCompare,
}) =>
  hoc({ plugins, shouldStylesUpdate });

export default withStyles;
