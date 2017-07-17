/**
 * The react-typestyle-inline higher-order component
 * @file The main entry point
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import React from 'react';

import {
  ComponentOptions,
  InputSheet,
  StyledStatelessComponent,
} from 'react-typestyle/internal/hoc';
import * as types from 'react-typestyle/types';

import Cache from './cache';

export { ComponentOptions, InputSheet, StyledStatelessComponent };

export interface InjectedProps {
  styles: types.InlineStyles;
}

export interface Options {
  plugins?: types.Plugin[];
  shouldStylesUpdate<P>(props: P, nextProps: P): boolean;
}

/** Higher-order component */
const hoc = ({ plugins, shouldStylesUpdate }: Options) =>
  <OriginalProps extends {}>(
    Component: ((React.ComponentClass<OriginalProps & InjectedProps>
      | React.StatelessComponent<OriginalProps & InjectedProps>)
    & { styles?: InputSheet<Readonly<OriginalProps>> }),
    componentOptions: ComponentOptions<Readonly<OriginalProps>> = {},
  ) => {
    type ResultProps = Readonly<OriginalProps>;

    // Get sheet
    const sheet: InputSheet<ResultProps> | undefined = componentOptions.styles || Component.styles;

    return class extends React.Component<ResultProps> {
      public static defaultProps = Component.defaultProps;
      public static propTypes = Component.propTypes;

      public registry = new Cache<ResultProps>({ plugins }).register(sheet);
      public styles: types.InlineStyles;

      /** Handle style sheet attach */
      public componentWillMount() {
        this.updateStyles(this.props);
      }

      /** Handle style sheet updates */
      public componentWillReceiveProps(nextProps: ResultProps) {
        if (shouldStylesUpdate(this.props, nextProps)) this.updateStyles(nextProps);
      }

      /** React render */
      public render() {
        return <Component styles={this.styles} {...this.props} />;
      }

      /** Update styles */
      public updateStyles(props: ResultProps) {
        this.styles = this.registry.render(props);
      }
    };
  };

export default hoc;