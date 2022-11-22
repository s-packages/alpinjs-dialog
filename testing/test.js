import Alpine from "alpinejs";
import dialog from "../index";
Alpine.plugin(dialog);
window.Alpine = Alpine;

Alpine.data("demo", () => ({
  openDialog() {
    this.$dialog("dialogName").open({
      addClass: ["custom-class-1", "custom-class-2"], //class as array
      data: {
        show: true,
      }, // pass data into dialog
      config: {
        width: "700px",
        height: "100vh",
        position: "right", // center , left, right
        backdrop: true, //set true click away to close
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
}));

Alpine.start();
