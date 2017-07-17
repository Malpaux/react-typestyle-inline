# React inline styles implementation of React-TypeStyle

[![wercker status](https://app.wercker.com/status/25454c4abb7b724e18e2ef99312d058b/s/master "wercker status")](https://app.wercker.com/project/byKey/25454c4abb7b724e18e2ef99312d058b)

React-TypeStyle-Inline provides a higher-order component to use the [React-TypeStyle](https://www.npmjs.com/package/react-typestyle) API to style your React components using 100% React inline styles.


## Install

using [yarn](https://yarnpkg.com/en/)
```shell
yarn add react-typestyle-inline
```

or npm
```shell
npm install --save react-typestyle-inline
```

## Usage
Just add a static ```styles``` field to your React component and wrap it in the ```withStyles``` higher-order component. You can now access generated inline styles via ```props.styles```.

### Example
#### TypeScript
```typescript
import withStyles, { InputSheet } from 'react-typestyle-inline';

interface Props {
  name: string;
  pos: { x: number, y: number };
  theme: { color: string };
}

class Component extends React.PureComponent<Props & InjectedProps> {
  public static styles: InputSheet<Props> = {
    button: {
      background: 'transparent',
      border: 'none',
    },
    root: (props) => ({
      color: props.theme.color,
      position: 'absolute',
      transform: `translate(${props.pos.x}px,${props.pos.y}px)`,
    }),
  };

  public render() {
    const { styles, name } = this.props;
    return (
      <div style={styles.root}>
        <button style={styles.button}>{name}</button>
      </div>
    );
  }
}

export default withStyles()<Props>(Component);
```

#### JavaScript
```javascript
import withStyles from 'react-typestyle-inline';

class Component extends React.PureComponent {
  static styles = {
    button: {
      background: 'transparent',
      border: 'none',
    },
    root: (props) => ({
      color: props.theme.color,
      position: 'absolute',
      transform: `translate(${props.pos.x}px,${props.pos.y}px)`,
    }),
  };

  render() {
    const { styles, name } = this.props;
    return (
      <div style={styles.root}>
        <button style={styles.button}>{name}</button>
      </div>
    );
  }
}

export default withStyles()(Component);
```

### Options
You can pass in general options and options specific to the wrapped component.

```javascript
withStyles(options)(Component, componentOptions)
```

#### ```options```
- ```plugins?: Array<(style: { [property: string]: any }, type: string, renderer: any, props?: { [key: string]: any }) => { [property: string]: any }>```  
Plugins for further style transformations. The plugin API is compatible with most [Fela](http://fela.js.org/#) plugins, e.g. [```fela-plugin-prefixer```](https://github.com/rofrischmann/fela/tree/master/packages/fela-plugin-prefixer)

- ```renderer: Registry```  
A registry instance the component's styles will be mounted to. Defaults to a global ```Renderer``` instance

- ```shouldStylesUpdate: <Props>(props: Props, nextProps: Props) => boolean```  
Used to check whether styles should to be rerendered. Defaults to a shallow comparison of next and current props

#### ```componentOptions```
- ```styles: InputSheet<Props>```  
Alternative style sheet, overwrites ```styles``` field of wrapped component

## Developing

This is what you do after you have cloned the repository:

```shell
yarn / npm install
npm run build
```

(Install dependencies & build the project.)

### Linting

Execute TSLint

```shell
npm run lint
```

Try to automatically fix linting errors
```shell
npm run lint:fix
```

### Testing

Execute Jest unit tests using

```shell
npm test
```

Tests are defined in the same directory the module lives in. They are specified in '[module].test.js' files.

### Building

To build the project, execute

```shell
npm run build
```

This saves the production ready code into 'dist/'.
