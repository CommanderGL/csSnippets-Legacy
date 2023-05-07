export interface CancelType {
    children: () => void,
    props: () => void,
    classes: () => void,
    all: () => void
}

export interface ScarOptions {
    tag: string | any,
    root?: HTMLElement | Scar,
    props?: Object,
    children?: Scar[] | ScarOptions[],
    text?: any
    html?: any,
    classes?: string[]
}

const isClass = (c: any) => {
    return typeof c === "function" && Object.getOwnPropertyDescriptor(c, "prototype")?.writable === false;
}

export default class Scar {
    element: HTMLElement = document.createElement("div");
    children: Scar[] = [];
    #root: HTMLElement = document.body;
    component: any;

    constructor(options: ScarOptions) {
        let cancelChildren = false;
        let cancelProps = false;
        let cancelClasses = false;

        if (options.root != null) {
            if (options.root instanceof Scar) {
                this.#root = options.root.element;
            } else {
                this.#root = options.root;
            }
        } else {
            console.warn("You did not provide a root element for your Scar! Will be using body (may conflict with extensions.) -> " + options.tag);
        }

        if (typeof options.tag == "function") {
            if (isClass(options.tag)) {
                this.component = new options.tag(options, <CancelType>{
                    children: () => { cancelChildren = true },
                    props: () => { cancelProps = true },
                    classes: () => { cancelClasses = true },
                    all: () => {
                        cancelChildren = true;
                        cancelProps = true;
                        cancelClasses = true;
                    }
                });
            } else {
                this.component = options.tag(options, <CancelType>{
                    children: () => { cancelChildren = true },
                    props: () => { cancelProps = true },
                    classes: () => { cancelClasses = true },
                    all: () => {
                        cancelChildren = true;
                        cancelProps = true;
                        cancelClasses = true;
                    }
                });
            }

            this.element = this.component.element;
        } else {
            this.element = document.createElement(options.tag);
        }

        if (options.props != null && !cancelProps) {
            (<any>Object).entries(options.props).forEach(([key, value]: string[]) => {
                this.element.setAttribute(key, value);
            });
        }

        if (options.children != null && !cancelChildren) {
            this.addChildren(options.children);
        }

        if (options.text != null && !(typeof options.tag == "function")) this.text = options.text;

        if (options.html != null && !(typeof options.tag == "function")) this.html = options.html;

        if (options.classes != null && !cancelClasses) {
            options.classes.forEach(className => {
                this.element.classList.add(className);
            });
        }

        this.#root.appendChild(this.element);
    }

    get root() {
        return this.#root;
    }

    set root(v: HTMLElement | Scar) {
        this.element.remove();
        if (v instanceof Scar) {
            this.#root = v.element;
        } else {
            this.#root = v;
        }
    
        this.#root.appendChild(this.element);
    }

    set text(v: any) {
        if (v == null) {
            this.element.textContent = "";
            return;
        }
        this.element.textContent = String(v);
    }

    get text(): string | null {
        return this.element.textContent;
    }

    set html(v: any) {
        if (v == null) {
            this.element.innerHTML = "";
            return;
        }
        this.element.innerHTML = String(v);
    }

    get html(): string | null {
        return this.element.innerHTML;
    }

    addEvent(event: string, cb: (e?: Event) => any) {
        this.element.addEventListener(event, cb);
    }

    addChild(child: ScarOptions | Scar) {
        if (child instanceof Scar) {
            child.#root = this.element;
            this.children.push(child);
            this.element.appendChild(child.element);
        } else {
            let tmpScar = new Scar(child);
            tmpScar.#root = this.element;
            this.children.push(tmpScar);
            this.element.appendChild(tmpScar.element);
        }
    }

    addChildren(children: ScarOptions[] | Scar[]) {
        children.forEach(child => {
            this.addChild(child);
        });
    }

    setProp(key: string, value: string) {
        this.element.setAttribute(key, value);
    }

    setProps(props: Object) {
        (<any>Object).entries(props).forEach(([key, value]: string[]) => this.setProp(key, value));
    }

    setChildren(children: ScarOptions[] | Scar[]) {
        this.html = null;
        this.addChildren(children);
    }
}