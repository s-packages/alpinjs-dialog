import gsap from "gsap";
import "./dialog.scss";
export default function (Alpine, globalConfig) {
  const CLASSLIST = {
    MAIN: "alpinjs-dialog",
    CONTAINER: "alpinjs-dialog-container",
    WRAPPER: "alpinjs-dialog-wrapper",
    OVERLAY: "alpinjs-dialog-overlay",
  };
  let dialogs = Alpine.reactive({});
  Alpine.directive(
    "dialog",
    (el, { expression, value, modifiers }, { effect, evaluateLater }) => {
      if (!value) {
        let dialog = dialogs[expression];
        let clone = el.content.cloneNode(true);

        let container = document.createElement("div");
        container.classList.add(CLASSLIST.CONTAINER);
        container.appendChild(clone);

        let content = document.createElement("div");
        content.classList.add(CLASSLIST.WRAPPER);
        content.appendChild(container);

        let main = document.createElement("div");
        main.classList.add(CLASSLIST.MAIN);
        main.appendChild(content);

        if (!dialog) {
          dialog = dialogs[expression] = {
            show: false,
            mainElement: main,
            el: main.cloneNode(true),
            data: null,
            addClass: getConfig(el, "addClass"),
            addOverlayClass: getConfig(el, "addOverlayClass"),
            config: {
              width: getConfig(el, "width"),
              height: getConfig(el, "height"),
              position: getConfig(el, "position"),
              backdrop: getConfig(el, "backdrop"),
              blur: getConfig(el, "blur"),
              animate: {
                enter: getConfig(el, "animateEnter"),
                leave: getConfig(el, "animateLeave"),
              },
            },
            name: expression,
            props: {},
            validClose: undefined,
            afterOpen: () => {},
            beforeClose: () => {},
            afterClose: () => {},
          };
        }
        el.remove();
        return;
      }

      effect(() => {
        if (dialogs[expression].show) {
          // dialog changes
        }
      });
    }
  );

  Alpine.magic("dialog", (el) => (name) => {
    if (typeof name == "function") {
      setTimeout(() => {
        name();
      }, 500);
      return;
    }
    const dialog = dialogs[name];
    if (!dialog) throw new Error(`Dialog ${name} not found`);
    return {
      target: dialog?.el,
      open(config = {}) {
        dialog["afterOpen"] = config.afterOpen ?? dialog.afterOpen;
        dialog["afterClose"] = config.afterClose ?? dialog.afterClose;
        dialog["beforeClose"] = config.beforeClose ?? dialog.beforeClose;
        dialog["config"] = {
          ...dialog.config,
          ...config.config,
        };
        dialog.data = config.data ?? null;
        dialog["addClass"] = config.addClass ?? dialog.addClass;
        dialog["addOverlayClass"] =
          config.addOverlayClass ?? dialog.addOverlayClass;
        dialog["props"] = config.props ?? {};
        dialog.show = true;
        onDialogOpen(dialog);
      },
      close(data) {
        onDialogClose(dialog, data);
      },
      get data() {
        return dialog?.data;
      },
      props: dialog?.props,
      /**
       * @param {Function} fn
       */
      validClose(fn) {
        fn && (dialog.validClose = fn);
      },
    };
  });

  //bind event to dialog
  const EVENT = {
    onReady: function (dialog) {
      return new CustomEvent("dialogReady", {
        detail: dialog,
      });
    },
    onClose: function (dialog) {
      return new CustomEvent("dialogClose", {
        detail: dialog,
      });
    },
  };

  function onDialogOpen(dialog) {
    clickAway(dialog.el, () => {
      if (dialog.config.backdrop) {
        onDialogClose(dialog);
      }
    });
    const overlay = document.createElement("div");
    overlay.classList.add(CLASSLIST.OVERLAY, ...dialog?.addOverlayClass);
    overlay.style.zIndex = getLastIndex();
    overlay.setAttribute("dialog-name", dialog.name);
    document.body.appendChild(overlay);
    addClass(dialog.el, dialog?.addClass);
    overlayBlur(dialog.el, dialog?.config?.blur);
    dialog.el.setAttribute("x-dialog:show", dialog.name);
    dialog.el.setAttribute("dialog-position", dialog.config.position);
    dialog.el.style.zIndex = getLastIndex();
    const container = dialog.el.querySelector(`.${CLASSLIST.CONTAINER}`);
    container.style.width = dialog.config.width;
    container.style.height = dialog.config.height;
    document.body.appendChild(dialog.el);
    animate(dialog.config.position, dialog?.config?.animate, dialog).enter(
      dialog.el,
      () => {
        dialog.afterOpen(dialog);
        dialog.el.dispatchEvent(EVENT.onReady(dialog));
      }
    );
  }

  function onDialogClose(dialog, data) {
    dialog.beforeClose(dialog);
    if (typeof dialog?.validClose === "function") {
      if (!dialog.validClose()) return;
    }
    const overlay = document.querySelector(
      `.${CLASSLIST.OVERLAY}[dialog-name=${dialog.name}]`
    );
    animate(dialog.config.position, dialog?.config?.animate, dialog).leave(
      dialog.el,
      () => {
        dialog.show = false;
        overlay.remove();
        dialog.el.remove();
        dialog.el = dialog.mainElement.cloneNode(true);
        dialog.afterClose(data);
        dialog.el.dispatchEvent(EVENT.onClose(dialog));
      }
    );
  }

  function addClass(el, _class = []) {
    if (Array.isArray(_class)) {
      _class.forEach((c) => {
        el.classList.add(c);
      });
    }
  }

  function clickAway(el, callback) {
    const container = el.querySelector(`.${CLASSLIST.CONTAINER}`);
    const clickHandler = (e) => {
      if (!matchParent(container, e.target)) {
        callback();
      }
    };
    el.addEventListener("click", clickHandler);
    return () => {
      el.removeEventListener("click", clickHandler);
    };
  }

  function matchParent(parent, target) {
    return parent === target || parent.contains(target);
  }

  function overlayBlur(element, value = 0) {
    element.style.backdropFilter = `blur(${value}px)`;
  }

  function animate(position, option = {}, dialog) {
    const overlay = document.querySelector(
      `.${CLASSLIST.OVERLAY}[dialog-name=${dialog.name}]`
    );
    let typeFn = (type) => {
      const { clientWidth, clientHeight } = dialog.el.querySelector(
        `.${CLASSLIST.CONTAINER}`
      );
      const width = `${clientWidth}px`;
      const height = `${clientHeight}px`;
      switch (type) {
        case "right":
          return {
            from: { x: width },
            to: { x: "0%" },
          };
        case "left":
          return {
            from: { x: `-${width}` },
            to: { x: "0%" },
          };
        case "top":
          return {
            from: { y: `-${height}` },
            to: { y: "0%" },
          };
        case "bottom":
          return {
            from: { y: height },
            to: { y: "0%" },
          };
        default:
          return {
            from: { scale: 0.8, autoAlpha: 0 },
            to: { scale: 1, autoAlpha: 1 },
          };
      }
    };
    return {
      enter: (target, fn) => {
        gsap.to(overlay, {
          autoAlpha: 1,
          duration: option?.enter ?? 0.2,
        });
        gsap
          .fromTo(
            target.querySelector(`.${CLASSLIST.CONTAINER}`),
            { ...typeFn(position).from },
            {
              ...typeFn(position).to,
              duration: option?.enter ?? 0.2,
            }
          )
          .eventCallback("onComplete", () => {
            fn ? fn(target) : null;
          });
      },
      leave: (target, fn) => {
        gsap
          .to(target.querySelector(`.${CLASSLIST.CONTAINER}`), {
            ...typeFn(position).from,
            duration: option?.leave ?? 0.2,
          })
          .eventCallback("onComplete", () => {
            fn ? fn(target) : null;
          });
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: option?.leave ?? 0.2,
        });
      },
    };
  }

  function getLastIndex() {
    return (
      Math.max(
        ...Array.from(document.querySelectorAll("*"), (el) =>
          parseFloat(window.getComputedStyle(el).zIndex)
        ).filter((zIndex) => !Number.isNaN(zIndex)),
        0
      ) + 1
    );
  }

  function getConfig(el, name) {
    let config = {
      width: el.getAttribute(`width`) ?? globalConfig?.width,
      height: el.getAttribute(`height`) ?? globalConfig?.height,
      position:
        el.getAttribute(`position`) ?? globalConfig?.position ?? "center",
      backdrop:
        el.getAttribute(`backdrop`) != "false" ??
        globalConfig?.backdrop ??
        true,
      blur: el.getAttribute(`blur`) ?? globalConfig?.blur ?? 0,
      animateEnter:
        el.getAttribute(`animate-enter`) ?? globalConfig?.animate?.enter ?? 0.2,
      animateLeave:
        el.getAttribute(`animate-leave`) ?? globalConfig?.animate?.leave ?? 0.2,
      addClass:
        el.getAttribute(`add-class`)?.split(" ") ??
        globalConfig?.addClass ??
        [],
      addOverlayClass:
        el.getAttribute(`add-overlay-class`)?.split(" ") ??
        globalConfig?.addOverlayClass ??
        [],
    };
    return config[name];
  }
}
