[![Version](https://img.shields.io/npm/v/material-react-js.svg)](https://www.npmjs.com/package/material-react-js)
![Status](https://github.com/restus-inc/material-react-js/workflows/CI/badge.svg)

# material-react-js

Material React is an implementation of [Material Components for the web](https://github.com/material-components/material-components-web) using React.

It works in React 16.8 and above, and uses Material Components for the web 7.0.

It suports following components:

* [MDCButton component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button#readme)
* [MDCCheckbox component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox#readme)
* [MDCDataTable component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-data-table#readme)
* [MDCDialog component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog#readme)
* [MDCRadio component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio#readme)
* [MDCSelect component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select#readme)
* [MDCSnackbar component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar#readme)
* [MDCTab component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab#readme)
* [MDCTabBar component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar#readme)
* [MDCTextField component](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#readme)

## Basic Usage

### Installation

```
npm install react react-dom material-react-js
```

You must also install the appropriate MDC components for the component you are using.
For example, to use the Button component, MDCButton must also be installed as follows:

```
npm install @material/button
```

### Styles

The style is the same as that of the MDC-web.

```scss
@use "@material/button/mdc-button";
```

See [documents of MDC-web](https://github.com/material-components/material-components-web#readme) for details.

### React Components

Components are used as follows:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, TextField } from 'material-react-js';

function MyForm(props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    function onNameChange(event) {
        setName(event.target.value);
    }
    function onAddressChange(event) {
        setAddress(event.target.value);
    }
    function onSubmit() {
        ...
    }
    return (
        <form onSubmit={onSubmit}>
            <TextField label="name" required={true} onChange={onNameChange}/><br/>
            <TextField label="address" onChange={onAddressChange}/><br/>
            <Button label="submit"/>
        </form>
    );
}

ReactDom.render(<MyForm/>, document.getElementById('container'));
```
