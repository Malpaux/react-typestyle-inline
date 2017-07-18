import { shallow } from 'enzyme';
import * as React from 'react';

import withStyles, { StyledStatelessComponent } from './hoc';

describe('withStyles higher-order component', () => {
  const BaseComponent = (() => <div />) as StyledStatelessComponent<any>;

  beforeEach(() => {
    delete BaseComponent.styles;
  });

  it('should pass in an empty styles map for a component w/o styles field', () => {
    const WrappedComponent = withStyles({
      shouldStylesUpdate: () => true,
    })(BaseComponent);

    const styles = shallow(<WrappedComponent />).prop('styles');
    expect(styles).toEqual({});
  });

  it('should render static styles', () => {
    BaseComponent.styles = {
      div: {
        position: 'relative',
      },
      root: {
        background: '#000',
        color: '#fff',
      },
    };

    const WrappedComponent = withStyles({
      shouldStylesUpdate: () => true,
    })(BaseComponent);

    const component = shallow(<WrappedComponent />);
    const styles = component.prop('styles');
    expect(styles).toEqual({
      div: {
        position: 'relative',
      },
      root: {
        background: '#000',
        color: '#fff',
      },
    });

    expect(component.unmount());
  });

  it('should render dynamic styles', () => {
    interface Props {
      color: string;
      pos: {
        x: number,
        y: number,
      };
    }

    BaseComponent.styles = {
      div: ({ color, pos }: Props) => ({
        color,
        position: 'absolute',
        transform: pos && `translate(${pos.x}px,${pos.y}px)`,
      }),
      root: {
        background: '#000',
      },
    };

    const WrappedComponent = withStyles({
      shouldStylesUpdate: () => true,
    })(BaseComponent);

    const component = shallow(<WrappedComponent />);
    const styles = component.prop('styles');
    expect(styles).toEqual({
      div: {
        position: 'absolute',
      },
      root: {
        background: '#000',
      },
    });

    const styles2 = component.setProps({
      color: '#ff0000', pos: { x: 128, y: 0 },
    }).prop('styles');
    expect(styles2).toEqual({
      div: {
        color: '#ff0000',
        position: 'absolute',
        transform: 'translate(128px,0px)',
      },
      root: {
        background: '#000',
      },
    });
  });

  // TODO: Test custom renderer setups

  // TODO: Test custom shouldStylesUpdate functions

  // TODO: Test custom plugins

  // TODO: Test styles overwrite
});
