# alpinjs-dialog

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
        position: "center", // center , left, right
        backdrop: true //set true click away to close
        blur: 13, //set true to blur overlay,
        animate: {
          enter: 0.2, // seconds
          leave: 0.2, // seconds
        },
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

    // get data from dialog
    let data = this.$dialog("dialogName").data();

    // close dialog
    this.$dialog("dialogName").close(/* return something after close here */);

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
```
