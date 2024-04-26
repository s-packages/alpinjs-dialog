# alpinjs-dialog@1.0.8

Dialog component for Alpine.js

## Authors

- [@tasvet](https://www.npmjs.com/~tasvet)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Demo

Demo link : [Click here](https://codesandbox.io/s/alpinejs-dialog-demo-grd751)

## Git Repo

Github : [Click here](https://github.com/s-packages/alpinjs-dialog)

## Installation

Install alpinjs-dialog with npm

```bash
  npm install alpinejs gsap alpinjs-dialog
  or
  yarn add alpinejs gsap alpinjs-dialog
```

## Usage/Examples

import :

```
  import Alpine from 'alpinejs';
  import dialog from "alpinjs-dialog";

  Alpine.plugin(dialog);
  Alpine.start();
```

## USAGE

```
  <template x-dialog="dialogName">
    <h1>Hello Dialog</h1>
    <p>Dialog is working!</p>
  </template>
  ...
  <button @click="$dialog('dialogName').open()">Show Dialog</button>
  // or
  this.$dialog("dialogName").open({
      addClass: ["custom-class-1", "custom-class-2"], //class as array
      data: null, // pass data into dialog
      config: {
        width: "500px", // dialog width
        height: "200px", // dialog height
        position: "center", // center , left, right, top, bottom
        backdrop: true //set true click away to close
        blur: 13, //set true to blur overlay,
        animate: {
          enter: 0.2, // seconds
          leave: 0.2, // seconds
        },
      },
      props: {
        click: this.counter.bind(this), // dialog props
      },
      afterOpen: (dialog) => {
        // callback after dialog open
        console.log("after dialog opened", dialog);
      },
      beforeClose: (dialog) => {
        // callback before dialog close
        console.log("before dialog close", dialog);
      },
      afterClose: (dialog) => {
        // callback after dialog close
        console.log("after dialog closed", dialog);
      }
    });

    // get data from dialog v1.0.54 or higher
    let data = this.$dialog("dialogName").data;

    // get data from dialog v1.0.53 or lower
    let data = this.$dialog("dialogName").data();

    // close dialog
    this.$dialog("dialogName").close(/* return something after close here */);

    // close dialog with validation
    this.$dialog("dialogName").validClose(() => {
      // return true to close dialog
      return true;
    });

    //event listener
    this.$dialog("dialogName")
      .target
      .addEventListener("dialogReady", (e) => {
          // dialog is ready
          console.log("dialogReady", e.detail);
        }
      );

     this.$dialog("dialogName")
      .target
      .addEventListener("dialogClose", (e) => {
          // dialog is closed
          console.log("dialogClosed", e.detail);
        }
      );

    // props
    this.$dialog("dialogName").props.click(1);

    // static config
    <template
        x-dialog="dialogName"
        width="1000px"
        height="500px"
        position="center"
        blur="3"
        animate-enter="0.5"
        animate-leave="0.2"
      >
      ....
    </template>
```

## API

| Property | Type | Description | Value |
|-----------|------|--------------|-------|
| show | `boolean` | Dialog active status | `true`,`false` |
| persist | `boolean` | Persist the dialog content | `true`,`false` |
| data | `any` | Data to be passed to the dialog |  |
| addClass | `string[]` | Additional CSS classes to add to the dialog |  |
| addOverlayClass | `string[]` | Additional CSS classes to add to the overlay |  |
| drawer | `string` | Drawer element class |  |
| config | `object` | Configuration options for the dialog |  |
| config.width | `string` | Width of the dialog |  |
| config.height | `string` | Height of the dialog |  |
| config.position | `string` | Position of the dialog | `center`,`right`,`left`,`top`,`bottom` |
| config.backdrop | `boolean` | Show backdrop or not | `true`,`false` |
| config.blur | `number` | Blur the background or not |  |
| config.animate.enter | `number` | Animation duration for enter transition |  |
| config.animate.leave | `number` | Animation duration for leave transition |  |
| props | `object` | Additional props to be passed to the dialog |  |
| processing | `boolean` | Indicates if the dialog is processing or not | `true`,`false` |
| afterOpen | `function` | Callback function after the dialog is opened |  |
| beforeClose | `function` | Callback function before the dialog is closed |  |
| afterClose | `function` | Callback function after the dialog is closed |  |
| target | HTML element reference | The dialog element |  |
| open(config = {}) | `function` | Function to open the dialog with configuration options |  |
| close(data) | `function` | Function to close the dialog and pass data |  |
| data | `any` | Get the dialog data |  |
| rawData | `any` | Get a clone of the dialog data |  |
| validClose(fn) | `function` | Set the function to validate if the dialog can be closed or not |  |
