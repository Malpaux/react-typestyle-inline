/**
 * @file The main entry point
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

/**
 * Higher-order component implementing React-Typestyle API for inline styles
 * @module react-typestyle-inline
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import * as React from 'react';
export { React as _react };

import { dynamicExtend, shallowCompare } from 'react-typestyle/internal/utils';
export { dynamicExtend as extend, shallowCompare };

// Reexport for type declarations
import { DynamicSheet } from 'react-typestyle/types';
export { DynamicSheet };

import * as types from './types';
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
