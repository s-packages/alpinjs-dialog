import Alpine from "alpinejs";
import dialog from "../index";
//global config
dialog(Alpine, {
  animate: {
    enter: 0.3,
    leave: 0.2,
  },
});
window.Alpine = Alpine;

Alpine.data("demo", () => ({
  count: 0,
  init() {
    this.$dialog(() => {
      // wait for dialog created
      this.$dialog("dialogName").target.addEventListener("dialogClose", (e) => {
        // dialog is closed
        console.log("dialogClose", e.detail);
      });
    });
  },
  openDialog() {
    // this.$dialog("dialogName01").open({
    //   addClass: ["custom-class-1", "custom-class-2"], //class as array
    //   props: {
    //     click: this.counter.bind(this),
    //   },
    //   afterOpen: (dialog) => {
    //     console.log("after dialog opened", dialog);
    //   },
    //   beforeClose: (dialog) => {
    //     console.log("before dialog close", dialog);
    //   },
    //   afterClose: (dialog) => {
    //     console.log("after dialog closed", dialog);
    //   },
    // });
    this.$dialog("dialogName").open({
      addClass: ["custom-class-1", "custom-class-2"], //class as array
      data: {
        show: true,
      }, // pass data into dialog
      // config: {
      //   width: "700px",
      //   height: "100vh",
      //   position: "right", // center , left, right
      //   backdrop: true, //set true click away to close
      //   blur: 0, //set true to blur overlay,
      //   animate: {
      //     enter: 0.2, // seconds
      //     leave: 0.2, // seconds
      //   },
      // },
      props: {
        click: this.counter.bind(this),
      },
      afterOpen: (dialog) => {
        console.log("after dialog opened", dialog);
      },
      beforeClose: (dialog) => {
        console.log("before dialog close", dialog);
      },
      afterClose: (dialog) => {
        console.log("after dialog closed", dialog);
      },
    });
  },
  counter(value) {
    this.count += value;
  },
}));

Alpine.start();
