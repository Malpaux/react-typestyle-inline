/**
 * The react-typestyle-inline styles cache
 * @module react-typestyle/internal/renderer
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import { Options } from 'react-typestyle/internal/registry';
import { processPlugins, processSheet, splitSheet } from 'react-typestyle/internal/utils';
import { DynamicSheet, InlineStyles, Plugin, SheetGenerator } from 'react-typestyle/types';

/** The react-typestyle styles cache */
class Cache<P> {
  /** Registered dynamic sheets */
  protected dynamicSheets?: SheetGenerator<P>[];
  /** Registered dynamic styles */
  protected dynamicStyles: DynamicSheet<P> = {};
  /** Plugins */
  protected plugins?: Plugin[];
  /** Registered static styles */
  protected staticStyles: DynamicSheet<P> = {};

  constructor(options: Options) {
    this.plugins = options.plugins;
  }

  /** Clear all styles in the current cache */
  public clear() {
    // Clear registered dynamic sheets & styles
    this.dynamicSheets = undefined;
    this.dynamicStyles = {};

    return this;
  }

  /** Register a dynamic style sheet */
  public register(sheet?: DynamicSheet<P> | SheetGenerator<P>): Cache<P> {
    if (sheet) {
      if (typeof sheet === 'function') {
        if (!this.dynamicSheets) this.dynamicSheets = [];
        this.dynamicSheets.push(sheet);
      } else {
        // Split dynamic/static styles
        const result = splitSheet(sheet);

        // Add dynamic styles
        Object.assign(this.dynamicStyles, result.dynamic);

        // Add static styles
        Object.assign(this.staticStyles, processPlugins(this.plugins, result.static));
      }
    }

    return this;
  }

  /** Render dynamic styles & get all class names */
  public render(props: P): InlineStyles {
    // Build dynamic sheet
    const dynamicSheet = this.dynamicSheets ?
      Object.assign(
        {},
        // Evaluate sheet generators
        ...(this.dynamicSheets.map((sheet) => sheet(props))),
        // Merge dynamic styles
        this.dynamicStyles,
      )
    : this.dynamicStyles;

    // Evaluate dynamic styles & generate inline styles
    const styles: InlineStyles = processSheet(
      processPlugins.bind(null, this.plugins),
      dynamicSheet,
      props,
      { ...this.staticStyles },
    );

    // Update styles;
    return styles;
  }
}

export default Cache;
