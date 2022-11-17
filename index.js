import gsap from "gsap";
export default function (Alpine) {
    let dialogs = Alpine.reactive({});
    Alpine.directive(
        "dialog",
        (el, { expression, value, modifiers }, { effect, evaluateLater }) => {
            if (!value) {
                let dialog = dialogs[expression];
                let clone = el.content.cloneNode(true);

                let container = document.createElement("div");
                container.classList.add("dialog-container");
                container.appendChild(clone);

                let content = document.createElement("div");
                content.classList.add("dialog-content");
                content.appendChild(container);

                let main = document.createElement("div");
                main.classList.add("dialog");
                main.appendChild(content);

                if (!dialog) {
                    dialog = dialogs[expression] = {
                        show: false,
                        el: main,
                        data: null,
                        config: {
                            width: "80vw",
                            position: "center",
                            backdrop: true,
                        },
                        name: expression,
                        afterOpen: () => {},
                        beforeClose: () => {},
                        afterClose: () => {},
                    };
                }
                el.remove();
                return;
            }

            effect(() => {
                // dialog changes
            });
        }
    );

    Alpine.magic("dialog", (el) => (name) => {
        const dialog = dialogs[name];
        return {
            open(config = {}) {
                dialog["afterOpen"] = config.afterOpen ?? dialog.afterOpen;
                dialog["afterClose"] = config.afterClose ?? dialog.afterClose;
                dialog["beforeClose"] =
                    config.beforeClose ?? dialog.beforeClose;
                dialog["config"] = {
                    ...dialog.config,
                    ...config.config,
                };
                dialog.data = config.data ?? null;
                dialog.show = true;
                onDialogOpen(dialog);
            },
            close(data) {
                onDialogClose(dialog, data);
            },
            data() {
                return dialog.data;
            }
        };
    });
}

function onDialogOpen(dialog) {
    clickAway(dialog.el, () => {
        if (dialog.config.backdrop) onDialogClose(dialog);
    });
    dialog.el.setAttribute("x-dialog:show", dialog.name);
    dialog.el.setAttribute("dialog-position", dialog.config.position);
    dialog.el.style.zIndex = getLastIndex();
    const container = dialog.el.querySelector(".dialog-container");
    container.style.width = dialog.config.width;
    container.style.height = dialog.config.height;
    document.body.appendChild(dialog.el);
    animate().enter(dialog.el, () => {
        dialog.afterOpen(dialog);
    });
}

function onDialogClose(dialog, data) {
    dialog.beforeClose(dialog);
    animate().leave(dialog.el, () => {  
        dialog.show = false;
        dialog.el.remove();
        dialog.afterClose(data);
    });
}

function clickAway(el, callback) {
    const container = el.querySelector(".dialog-container");
    const clickHandler = (e) => {
        console.log();
        if (!container.contains(e.target)) {
            callback();
        }
    };
    el.addEventListener("click", clickHandler);
    return () => {
        el.removeEventListener("click", clickHandler);
    };
}

function animate() {
    return {
        enter: (target, fn) => {
            gsap.to(target, {
                autoAlpha: 1,
                duration: 0.2,
            });
            gsap.fromTo(
                target.querySelector(".dialog-container"),
                { scale: 0.8, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.2 }
            ).eventCallback("onComplete", () => {
                fn ? fn(target) : null;
            });
        },
        leave: (target, fn) => {
            gsap.to(target.querySelector(".dialog-container"), {
                scale: 0.8,
                autoAlpha: 0,
                duration: 0.2,
            }).eventCallback("onComplete", () => {
                fn ? fn(target) : null;
            });
            gsap.to(target, {
                autoAlpha: 0,
                duration: 0.2,
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
