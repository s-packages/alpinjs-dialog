require("./index.css");
var $c5L0i$gsap = require("gsap");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $43d7963e56408b24$export$2e2bcd8739ae039);


function $43d7963e56408b24$export$2e2bcd8739ae039(Alpine) {
    let dialogs = Alpine.reactive({});
    Alpine.directive("dialog", (el, { expression: expression , value: value , modifiers: modifiers  }, { effect: effect , evaluateLater: evaluateLater  })=>{
        if (!value) {
            let dialog = dialogs[expression];
            let clone = el.content.cloneNode(true);
            let container = document.createElement("div");
            container.classList.add("dialog-container");
            container.appendChild(clone);
            let content = document.createElement("div");
            content.classList.add("dialog-wrapper");
            content.appendChild(container);
            let main = document.createElement("div");
            main.classList.add("dialog");
            main.appendChild(content);
            if (!dialog) dialog = dialogs[expression] = {
                show: false,
                mainElement: main,
                el: main.cloneNode(true),
                data: null,
                config: {
                    width: $43d7963e56408b24$var$getConfig(el, "width"),
                    height: $43d7963e56408b24$var$getConfig(el, "height"),
                    position: $43d7963e56408b24$var$getConfig(el, "position"),
                    backdrop: $43d7963e56408b24$var$getConfig(el, "backdrop"),
                    blur: $43d7963e56408b24$var$getConfig(el, "blur"),
                    animate: {
                        enter: $43d7963e56408b24$var$getConfig(el, "animateEnter"),
                        leave: $43d7963e56408b24$var$getConfig(el, "animateLeave")
                    }
                },
                name: expression,
                props: {},
                afterOpen: ()=>{},
                beforeClose: ()=>{},
                afterClose: ()=>{}
            };
            el.remove();
            return;
        }
        effect(()=>{
            dialogs[expression].show;
        });
    });
    Alpine.magic("dialog", (el)=>(name)=>{
            if (typeof name == "function") {
                setTimeout(()=>{
                    name();
                }, 500);
                return;
            }
            const dialog = dialogs[name];
            if (!dialog) throw new Error(`Dialog ${name} not found`);
            return {
                target: dialog?.el,
                open (config = {}) {
                    dialog["afterOpen"] = config.afterOpen ?? dialog.afterOpen;
                    dialog["afterClose"] = config.afterClose ?? dialog.afterClose;
                    dialog["beforeClose"] = config.beforeClose ?? dialog.beforeClose;
                    dialog["config"] = {
                        ...dialog.config,
                        ...config.config
                    };
                    dialog.data = config.data ?? null;
                    dialog["addClass"] = config.addClass ?? null;
                    dialog["props"] = config.props ?? {};
                    dialog.show = true;
                    $43d7963e56408b24$var$onDialogOpen(dialog);
                },
                close (data) {
                    $43d7963e56408b24$var$onDialogClose(dialog, data);
                },
                data () {
                    return dialog?.data;
                },
                props: dialog?.props
            };
        });
}
//bind event to dialog
const $43d7963e56408b24$var$EVENT = {
    onReady: function(dialog) {
        return new CustomEvent("dialogReady", {
            detail: dialog
        });
    },
    onClose: function(dialog) {
        return new CustomEvent("dialogClose", {
            detail: dialog
        });
    }
};
function $43d7963e56408b24$var$onDialogOpen(dialog) {
    $43d7963e56408b24$var$clickAway(dialog.el, ()=>{
        if (dialog.config.backdrop) $43d7963e56408b24$var$onDialogClose(dialog);
    });
    $43d7963e56408b24$var$addClass(dialog.el, dialog?.addClass);
    $43d7963e56408b24$var$overlayBlur(dialog.el, dialog?.config?.blur);
    dialog.el.setAttribute("x-dialog:show", dialog.name);
    dialog.el.setAttribute("dialog-position", dialog.config.position);
    dialog.el.style.zIndex = $43d7963e56408b24$var$getLastIndex();
    const container = dialog.el.querySelector(".dialog-container");
    container.style.width = dialog.config.width;
    container.style.height = dialog.config.height;
    document.body.appendChild(dialog.el);
    $43d7963e56408b24$var$animate(dialog.config.position, dialog?.config?.animate).enter(dialog.el, ()=>{
        dialog.afterOpen(dialog);
        dialog.el.dispatchEvent($43d7963e56408b24$var$EVENT.onReady(dialog));
    });
}
function $43d7963e56408b24$var$onDialogClose(dialog, data) {
    dialog.beforeClose(dialog);
    $43d7963e56408b24$var$animate(dialog.config.position, dialog?.config?.animate).leave(dialog.el, ()=>{
        dialog.show = false;
        dialog.el.remove();
        dialog.el = dialog.mainElement.cloneNode(true);
        dialog.afterClose(data);
        dialog.el.dispatchEvent($43d7963e56408b24$var$EVENT.onClose(dialog));
    });
}
function $43d7963e56408b24$var$addClass(el, _class = []) {
    if (Array.isArray(_class)) _class.forEach((c)=>{
        el.classList.add(c);
    });
}
function $43d7963e56408b24$var$clickAway(el, callback) {
    const container = el.querySelector(".dialog-container");
    const clickHandler = (e)=>{
        if (!container.contains(e.target)) callback();
    };
    el.addEventListener("click", clickHandler);
    return ()=>{
        el.removeEventListener("click", clickHandler);
    };
}
function $43d7963e56408b24$var$overlayBlur(element, value = 0) {
    element.style.backdropFilter = `blur(${value}px)`;
}
function $43d7963e56408b24$var$animate(position, option = {}) {
    let typeFn = (type)=>{
        switch(type){
            case "right":
                return {
                    from: {
                        x: "100%"
                    },
                    to: {
                        x: "0%"
                    }
                };
            case "left":
                return {
                    from: {
                        x: "-100%"
                    },
                    to: {
                        x: "0%"
                    }
                };
            case "top":
                return {
                    from: {
                        y: "-100%"
                    },
                    to: {
                        y: "0%"
                    }
                };
            case "bottom":
                return {
                    from: {
                        y: "100%"
                    },
                    to: {
                        y: "0%"
                    }
                };
            default:
                return {
                    from: {
                        scale: 0.8
                    },
                    to: {
                        scale: 1
                    }
                };
        }
    };
    return {
        enter: (target, fn)=>{
            (0, ($parcel$interopDefault($c5L0i$gsap))).to(target, {
                autoAlpha: 1,
                duration: option?.enter ?? 0.2
            });
            (0, ($parcel$interopDefault($c5L0i$gsap))).fromTo(target.querySelector(".dialog-container"), {
                ...typeFn(position).from,
                autoAlpha: 0
            }, {
                ...typeFn(position).to,
                autoAlpha: 1,
                duration: option?.enter ?? 0.2
            }).eventCallback("onComplete", ()=>{
                fn && fn(target);
            });
        },
        leave: (target, fn)=>{
            (0, ($parcel$interopDefault($c5L0i$gsap))).to(target.querySelector(".dialog-container"), {
                ...typeFn(position).from,
                autoAlpha: 0,
                duration: option?.leave ?? 0.2
            }).eventCallback("onComplete", ()=>{
                fn && fn(target);
            });
            (0, ($parcel$interopDefault($c5L0i$gsap))).to(target, {
                autoAlpha: 0,
                duration: option?.leave ?? 0.2
            });
        }
    };
}
function $43d7963e56408b24$var$getLastIndex() {
    return Math.max(...Array.from(document.querySelectorAll("*"), (el)=>parseFloat(window.getComputedStyle(el).zIndex)).filter((zIndex)=>!Number.isNaN(zIndex)), 0) + 1;
}
function $43d7963e56408b24$var$getConfig(el, name) {
    let config = {
        width: el.getAttribute(`width`),
        height: el.getAttribute(`height`),
        position: el.getAttribute(`position`) ?? "center",
        backdrop: el.getAttribute(`backdrop`) ?? true,
        blur: el.getAttribute(`blur`) ?? 0,
        animateEnter: el.getAttribute(`animate-enter`) ?? 0.2,
        animateLeave: el.getAttribute(`animate-leave`) ?? 0.2
    };
    return config[name];
}


//# sourceMappingURL=index.js.map
